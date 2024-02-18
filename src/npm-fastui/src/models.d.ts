/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify python types, then run
 * `fastui generate <python-object> <typescript-output-file>`.
 */

export type FastProps =
  | Text
  | Paragraph
  | PageTitle
  | Div
  | Page
  | Heading
  | Markdown
  | Code
  | Json
  | Button
  | Link
  | LinkList
  | Navbar
  | Footer
  | Modal
  | ServerLoad
  | Image
  | Iframe
  | Video
  | FireEvent
  | Error
  | Spinner
  | Custom
  | Table
  | Pagination
  | Display
  | Details
  | Form
  | FormFieldInput
  | FormFieldTextarea
  | FormFieldBoolean
  | FormFieldFile
  | FormFieldSelect
  | FormFieldSelectSearch
  | ModelForm
  | RechartsLineChart
export type ClassName =
  | string
  | ClassName[]
  | {
      [k: string]: boolean
    }
export type JsonData =
  | string
  | number
  | boolean
  | null
  | JsonData[]
  | {
      [k: string]: JsonData
    }
export type AnyEvent = PageEvent | GoToEvent | BackEvent | AuthEvent
export type NamedStyle = 'primary' | 'secondary' | 'warning'
export type DisplayMode =
  | 'auto'
  | 'plain'
  | 'datetime'
  | 'date'
  | 'duration'
  | 'as_title'
  | 'markdown'
  | 'json'
  | 'inline_code'
export type SelectOptions = SelectOption[] | SelectGroup[]

export interface Text {
  text: string
  type: 'Text'
}
export interface Paragraph {
  text: string
  className?: ClassName
  type: 'Paragraph'
}
/**
 * This sets the title of the HTML page via the `document.title` property.
 */
export interface PageTitle {
  text: string
  type: 'PageTitle'
}
export interface Div {
  components: FastProps[]
  className?: ClassName
  type: 'Div'
}
/**
 * Similar to `container` in many UI frameworks, this should be a reasonable root component for most pages.
 */
export interface Page {
  components: FastProps[]
  className?: ClassName
  type: 'Page'
}
export interface Heading {
  text: string
  level: 1 | 2 | 3 | 4 | 5 | 6
  htmlId?: string
  className?: ClassName
  type: 'Heading'
}
export interface Markdown {
  text: string
  codeStyle?: string
  className?: ClassName
  type: 'Markdown'
}
export interface Code {
  text: string
  language?: string
  codeStyle?: string
  className?: ClassName
  type: 'Code'
}
export interface Json {
  value: JsonData
  className?: ClassName
  type: 'JSON'
}
export interface Button {
  text: string
  onClick?: AnyEvent
  htmlType?: 'button' | 'reset' | 'submit'
  namedStyle?: NamedStyle
  className?: ClassName
  type: 'Button'
}
export interface PageEvent {
  name: string
  pushPath?: string
  context?: ContextType
  clear?: boolean
  nextEvent?: PageEvent | GoToEvent | BackEvent | AuthEvent
  type: 'page'
}
export interface ContextType {
  [k: string]: string | number
}
export interface GoToEvent {
  url?: string
  query?: {
    [k: string]: string | number
  }
  target?: '_blank'
  type: 'go-to'
}
export interface BackEvent {
  type: 'back'
}
export interface AuthEvent {
  token: string | false
  url?: string
  type: 'auth'
}
export interface Link {
  components: FastProps[]
  onClick?: PageEvent | GoToEvent | BackEvent | AuthEvent
  mode?: 'navbar' | 'footer' | 'tabs' | 'vertical' | 'pagination'
  active?: string | boolean
  locked?: boolean
  className?: ClassName
  type: 'Link'
}
export interface LinkList {
  links: Link[]
  mode?: 'tabs' | 'vertical' | 'pagination'
  className?: ClassName
  type: 'LinkList'
}
export interface Navbar {
  title?: string
  titleEvent?: PageEvent | GoToEvent | BackEvent | AuthEvent
  startLinks: Link[]
  endLinks: Link[]
  className?: ClassName
  type: 'Navbar'
}
export interface Footer {
  links: Link[]
  extraText?: string
  className?: ClassName
  type: 'Footer'
}
export interface Modal {
  title: string
  body: FastProps[]
  footer?: FastProps[]
  openTrigger?: PageEvent
  openContext?: ContextType
  className?: ClassName
  type: 'Modal'
}
/**
 * A component that will be replaced by the server with the component returned by the given URL.
 */
export interface ServerLoad {
  path: string
  loadTrigger?: PageEvent
  components?: FastProps[]
  sse?: boolean
  sseRetry?: number
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  type: 'ServerLoad'
}
export interface Image {
  src: string
  alt?: string
  width?: string | number
  height?: string | number
  referrerPolicy?:
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
  loading?: 'eager' | 'lazy'
  onClick?: AnyEvent
  className?: ClassName
  type: 'Image'
}
export interface Iframe {
  src: string
  title?: string
  width?: string | number
  height?: string | number
  className?: ClassName
  srcdoc?: string
  sandbox?: string
  type: 'Iframe'
}
export interface Video {
  sources: string[]
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
  poster?: string
  width?: string | number
  height?: string | number
  type: 'Video'
  className?: ClassName
}
export interface FireEvent {
  event: AnyEvent
  message?: string
  type: 'FireEvent'
}
export interface Error {
  title: string
  description: string
  statusCode?: number
  className?: ClassName
  type: 'Error'
  children?: ReactNode
}
export interface Spinner {
  text?: string
  className?: ClassName
  type: 'Spinner'
}
export interface Custom {
  data: JsonData
  subType: string
  library?: string
  className?: ClassName
  type: 'Custom'
}
export interface Table {
  data: DataModel[]
  columns: DisplayLookup[]
  noDataMessage?: string
  className?: ClassName
  type: 'Table'
}
export interface DataModel {
  [k: string]: JsonData
}
/**
 * Description of how to display a value looked up from data, either in a table or detail view.
 */
export interface DisplayLookup {
  mode?: DisplayMode
  title?: string
  onClick?: PageEvent | GoToEvent | BackEvent | AuthEvent
  field: string
  tableWidthPercent?: number
}
export interface Pagination {
  page: number
  pageSize: number
  total: number
  className?: ClassName
  type: 'Pagination'
  pageCount: number
}
/**
 * Description of how to display a value, either in a table or detail view.
 */
export interface Display {
  mode?: DisplayMode
  title?: string
  onClick?: PageEvent | GoToEvent | BackEvent | AuthEvent
  value: JsonData
  type: 'Display'
}
export interface Details {
  data: DataModel
  fields: DisplayLookup[]
  className?: ClassName
  type: 'Details'
}
export interface Form {
  submitUrl: string
  initial?: {
    [k: string]: JsonData
  }
  method?: 'POST' | 'GOTO' | 'GET'
  displayMode?: 'default' | 'page' | 'inline'
  submitOnChange?: boolean
  submitTrigger?: PageEvent
  loading?: FastProps[]
  footer?: FastProps[]
  className?: ClassName
  formFields: (
    | FormFieldInput
    | FormFieldTextarea
    | FormFieldBoolean
    | FormFieldFile
    | FormFieldSelect
    | FormFieldSelectSearch
  )[]
  type: 'Form'
}
export interface FormFieldInput {
  name: string
  title: string[] | string
  required?: boolean
  error?: string
  locked?: boolean
  description?: string
  displayMode?: 'default' | 'inline'
  className?: ClassName
  htmlType?: 'text' | 'date' | 'datetime-local' | 'time' | 'email' | 'url' | 'number' | 'password' | 'hidden'
  initial?: string | number
  placeholder?: string
  autocomplete?: string
  type: 'FormFieldInput'
}
export interface FormFieldTextarea {
  name: string
  title: string[] | string
  required?: boolean
  error?: string
  locked?: boolean
  description?: string
  displayMode?: 'default' | 'inline'
  className?: ClassName
  rows?: number
  cols?: number
  initial?: string
  placeholder?: string
  autocomplete?: string
  type: 'FormFieldTextarea'
}
export interface FormFieldBoolean {
  name: string
  title: string[] | string
  required?: boolean
  error?: string
  locked?: boolean
  description?: string
  displayMode?: 'default' | 'inline'
  className?: ClassName
  initial?: boolean
  mode?: 'checkbox' | 'switch'
  type: 'FormFieldBoolean'
}
export interface FormFieldFile {
  name: string
  title: string[] | string
  required?: boolean
  error?: string
  locked?: boolean
  description?: string
  displayMode?: 'default' | 'inline'
  className?: ClassName
  multiple?: boolean
  accept?: string
  type: 'FormFieldFile'
}
export interface FormFieldSelect {
  name: string
  title: string[] | string
  required?: boolean
  error?: string
  locked?: boolean
  description?: string
  displayMode?: 'default' | 'inline'
  className?: ClassName
  options: SelectOptions
  multiple?: boolean
  initial?: string[] | string
  vanilla?: boolean
  placeholder?: string
  autocomplete?: string
  type: 'FormFieldSelect'
}
export interface SelectOption {
  value: string
  label: string
}
export interface SelectGroup {
  label: string
  options: SelectOption[]
}
export interface FormFieldSelectSearch {
  name: string
  title: string[] | string
  required?: boolean
  error?: string
  locked?: boolean
  description?: string
  displayMode?: 'default' | 'inline'
  className?: ClassName
  searchUrl: string
  multiple?: boolean
  initial?: SelectOption
  debounce?: number
  placeholder?: string
  type: 'FormFieldSelectSearch'
}
export interface ModelForm {
  submitUrl: string
  initial?: {
    [k: string]: JsonData
  }
  method?: 'POST' | 'GOTO' | 'GET'
  displayMode?: 'default' | 'page' | 'inline'
  submitOnChange?: boolean
  submitTrigger?: PageEvent
  loading?: FastProps[]
  footer?: FastProps[]
  className?: ClassName
  type: 'ModelForm'
  formFields: (
    | FormFieldInput
    | FormFieldTextarea
    | FormFieldBoolean
    | FormFieldFile
    | FormFieldSelect
    | FormFieldSelectSearch
  )[]
}
export interface RechartsLineChart {
  title: string
  width?: number | string
  height: number
  data: BaseModel[]
  className?: ClassName
  type: 'RechartsLineChart'
  xKey: string
  yKeys: string[]
  yKeysNames?: string[]
  colors: string[]
  tooltip?: boolean
}
