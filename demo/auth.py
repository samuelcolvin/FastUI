from __future__ import annotations as _annotations

import secrets
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Annotated

from fastapi import APIRouter, Depends, Header
from fastui import AnyComponent, FastUI
from fastui import components as c
from fastui.events import AuthEvent, GoToEvent, PageEvent
from fastui.forms import fastui_form
from pydantic import BaseModel, EmailStr, Field, SecretStr, TypeAdapter

from .shared import demo_page

router = APIRouter()


@dataclass
class User:
    email: str
    token: str = field(default_factory=secrets.token_hex)
    last_active: datetime = field(default_factory=datetime.now)


async def get_user(authorization: Annotated[str, Header()] = '') -> User | None:
    try:
        token = authorization.split(' ', 1)[1]
    except IndexError:
        return None
    else:
        return await user_db.get_user(token)


@router.get('/login', response_model=FastUI, response_model_exclude_none=True)
def auth_login(user: Annotated[str | None, Depends(get_user)]) -> list[AnyComponent]:
    if user is None:
        return demo_page(
            c.Paragraph(
                text=(
                    'This is a very simple demo of authentication, '
                    'here you can "login" with any email address and password.'
                )
            ),
            c.Heading(text='Login'),
            c.ModelForm[LoginForm](submit_url='/api/auth/login'),
            title='Authentication',
        )
    else:
        return [c.FireEvent(event=GoToEvent(url='/auth/profile'))]


class LoginForm(BaseModel):
    email: EmailStr = Field(title='Email Address', description='Enter whatever value you like')
    password: SecretStr = Field(
        title='Password',
        description='Enter whatever value you like, password is not checked',
        json_schema_extra={'autocomplete': 'current-password'},
    )


@router.post('/login', response_model=FastUI, response_model_exclude_none=True)
async def login_form_post(form: Annotated[LoginForm, fastui_form(LoginForm)]) -> list[AnyComponent]:
    user = User(email=form.email)
    await user_db.save_user(user)
    return [c.FireEvent(event=AuthEvent(token=user.token, url='/auth/profile'))]


@router.get('/profile', response_model=FastUI, response_model_exclude_none=True)
def profile(user: Annotated[User | None, Depends(get_user)]) -> list[AnyComponent]:
    if user is None:
        return [c.FireEvent(event=GoToEvent(url='/auth/login'))]
    else:
        return demo_page(
            c.Paragraph(text=f'You are logged in as "{user.email}".'),
            c.Button(text='Logout', on_click=PageEvent(name='submit-form')),
            c.Form(
                submit_url='/api/auth/logout',
                form_fields=[c.FormFieldInput(name='test', title='', initial='data', html_type='hidden')],
                footer=[],
                submit_trigger=PageEvent(name='submit-form'),
            ),
            title='Authentication',
        )


@router.post('/logout', response_model=FastUI, response_model_exclude_none=True)
async def logout_form_post(user: Annotated[User | None, Depends(get_user)]) -> list[AnyComponent]:
    if user is not None:
        await user_db.save_user(user)
    return [c.FireEvent(event=AuthEvent(token=False, url='/auth/login'))]


class UserDatabase:
    """
    This is a very sophisticated, high-performance database with many complex features.

    You definitely shouldn't look into how it works!
    """

    def __init__(self):
        self._file = Path('users.json')
        self._ta = TypeAdapter(list[User])
        if self._file.is_file():
            users = self._ta.validate_json(self._file.read_bytes())
            self._users = {u.token: u for u in users}
        else:
            self._users: dict[str, User] = {}

    async def get_user(self, token: str) -> User | None:
        self._sync()
        op_user = self._users.get(token)
        if op_user is not None:
            op_user.last_active = datetime.now()
        return op_user

    async def save_user(self, user: User) -> None:
        self._users[user.token] = user
        self._sync()

    async def delete_user(self, user: User) -> None:
        self._users.pop(user.token)
        self._sync()

    def _sync(self) -> None:
        # keep only the most recently active 1000 users
        if len(self._users) > 1000:
            users = sorted(self._users.values(), key=lambda u: u.last_active, reverse=True)[:1000]
            self._users = {u.token: u for u in users}

        # save
        self._file.write_bytes(self._ta.dump_json(list(self._users.values()), indent=2))


user_db = UserDatabase()