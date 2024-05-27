import pytest
from fastui import components
from fastui.components import display
from pydantic import BaseModel, Field, computed_field


class User(BaseModel):
    id: int
    name: str = Field(title='Name')

    @computed_field(title='Representation')
    @property
    def representation(self) -> str:
        return f'{self.id}: {self.name}'


users = [User(id=1, name='john'), User(id=2, name='jack')]


def test_table_no_columns():
    table = components.Table(data=users)

    # insert_assert(table.model_dump(by_alias=True, exclude_none=True))
    assert table.model_dump(by_alias=True, exclude_none=True) == {
        'data': [
            {'id': 1, 'name': 'john', 'representation': '1: john'},
            {'id': 2, 'name': 'jack', 'representation': '2: jack'},
        ],
        'columns': [
            {'field': 'id'},
            {'field': 'name', 'title': 'Name'},
            {'field': 'representation', 'title': 'Representation'},
        ],
        'type': 'Table',
    }


def test_table_columns():
    table = components.Table(
        data=users,
        columns=[
            display.DisplayLookup(field='id', title='ID'),
            display.DisplayLookup(field='name'),
            display.DisplayLookup(field='representation'),
        ],
    )

    # insert_assert(table.model_dump(by_alias=True, exclude_none=True))
    assert table.model_dump(by_alias=True, exclude_none=True) == {
        'data': [
            {'id': 1, 'name': 'john', 'representation': '1: john'},
            {'id': 2, 'name': 'jack', 'representation': '2: jack'},
        ],
        'columns': [
            {'title': 'ID', 'field': 'id'},
            {'title': 'Name', 'field': 'name'},
            {'title': 'Representation', 'field': 'representation'},
        ],
        'type': 'Table',
    }


def test_table_empty_no_data_model():
    with pytest.raises(ValueError, match='Value error, Cannot infer model from empty data'):
        components.Table(data=[])


def test_table_empty_data_model():
    table = components.Table(data=[], data_model=User)

    # insert_assert(table.model_dump(by_alias=True, exclude_none=True))
    assert table.model_dump(by_alias=True, exclude_none=True) == {
        'data': [],
        'columns': [
            {'field': 'id'},
            {'title': 'Name', 'field': 'name'},
            {'title': 'Representation', 'field': 'representation'},
        ],
        'type': 'Table',
    }


def test_display_no_fields():
    d = components.Details(data=users[0])

    # insert_assert(d.model_dump(by_alias=True, exclude_none=True))
    assert d.model_dump(by_alias=True, exclude_none=True) == {
        'data': {'id': 1, 'name': 'john', 'representation': '1: john'},
        'fields': [{'field': 'id'}, {'title': 'Name', 'field': 'name'}],
        'type': 'Details',
    }


def test_display_fields():
    d = components.Details(
        data=users[0], fields=[display.DisplayLookup(field='id', title='ID'), display.DisplayLookup(field='name')]
    )

    # insert_assert(d.model_dump(by_alias=True, exclude_none=True))
    assert d.model_dump(by_alias=True, exclude_none=True) == {
        'data': {'id': 1, 'name': 'john', 'representation': '1: john'},
        'fields': [{'title': 'ID', 'field': 'id'}, {'title': 'Name', 'field': 'name'}],
        'type': 'Details',
    }
