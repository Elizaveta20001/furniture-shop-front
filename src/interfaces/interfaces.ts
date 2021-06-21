import {RouteComponentProps} from "react-router-dom";

export interface RouterProps {
    path: string
}


export interface CollectionProps extends RouteComponentProps<RouterProps> {
}

export interface CommentFormProps {
    url: string
}


export interface CollectionItemProps extends RouteComponentProps<RouterProps> {
    price: number,
    title: string,
    url: string,
    description: string,
    id: number,
    collectionName?: string
}

export interface CatalogInterface {
    items: CatalogItem[],
    title: string,
    error: string
}


export interface CatalogItem {
    price: number,
    title: string,
    url: string,
    description: string,
    id: number
}

export interface Order {
    items: OrderItem[]
}

export interface OrderItem {
    id: number,
    quantity: number
}

export interface saveOrderParams {
    form: Order,
    userId: string,
    token: string
}

export interface CollectionItemCardInterface extends CatalogItem{
    rating: Rating[]
}

export interface CatalogItemPage extends CatalogItem{
    comments: Comment[]
}

export interface Comment{
    email: string,
    firstName: string,
    lastName: string,
    image: string,
    text: string,
    createdAt: Date,
    id: string
}
export interface userComment{
    text: string,
    createdAt: Date,
    id: string
}


export interface UserComments{
    comments: userComment[],
    rating: Rating[],
    description: string,
    price: number,
    title: string,
    url: string,
    id: number
}

export interface Rating{
    userId: string,
    value: number
}

export interface PersonalUserData  {
    email: string,
    firstName: string,
    lastName: string,
    image: any,
}

export interface UserPassData  {
    password: string,
    repeatPassword: string,
}

export interface PersonalDataCardProps {
    defaultValues?: PersonalUserData,
    values: PersonalUserData,
    toggledChange: boolean,
    changeHandler: (event: any) => void,
    fileSelectorHandler: (event: any) => void,
    imagePreview: string,
    required: boolean
}

export interface ChangePassUserData  {
    oldPassword: string,
    newPassword: string,
    repeatNewPassword: string
}

export interface SetPassUserData  {
    password: string,
    repeatPassword: string
}

export interface TextInputFieldProps {
    id: string,
    value: string,
    toggledChange: boolean,
    changeHandler: (event: any) => void,
    registerField: (key:any, ref:any) => void,
    ref: any
}

export interface ChangePassCardProps {
    values: ChangePassUserData,
    toggledChange: boolean,
    changeHandler: (event: any) => void,
    registerField: (key:any, ref:any) => void
}

export interface SetPassCardProps {
    values: SetPassUserData,
    changeHandler: (event: any) => void,
    registerField: (key:any, ref:any) => void
}


export interface CartItemInterface extends CatalogItem{
    quantity: number
}


export interface CartState {
    items : CartItemInterface[]
}


export interface LoginState {
    token: string;
    userId: string;
    isEnter: boolean;
    message: string;
}

export interface ReginState {
    isUpToDate: boolean;
    message: string;
}

export interface CollectionState {
    items: CatalogItem[],
    title: string
}

export interface mainPageCatalogState {
    titles: string[],
    images: string[]
}

export interface CatalogState {
    collectionReducer: CollectionState,
    mainPageReducer: mainPageCatalogState,
}

declare global {
    interface Store {
        loginReducer: LoginState;
        reginReducer: ReginState;
        catalogReducer: CatalogState;
        userReducer: UserState;
    }
}


export interface CollectionItemState {
    price: number,
    url: string,
    description: string,
    title: string,
    error: string,
    comments: Comment[],
    rating: Rating[],
    isFetched: boolean
}

export interface CatalogState {
    collectionReducer: CollectionState,
    mainPageReducer: mainPageCatalogState,
    collectionItemReducer: CollectionItemState
}

export interface SearchResultsState {
    results: any[],
    isFetching: boolean,
    error: string
}

export interface UserState {
    userDataReducer: UserDataState,
    userCommentsReducer: UserCommentsState,
}

export interface UserDataState {
    userData: any,
    isFetching: boolean,
    isUpdating: boolean,
    userError: string,
    message: string,
}

export interface UserCommentsState {
    userComments: UserComments[],
    isFetching: boolean,
    message: string,
}

declare global {
    interface Store {
        loginReducer: LoginState;
        reginReducer: ReginState;
        catalogReducer: CatalogState;
        cartReducer: CartState;
        searchResultsReducer: SearchResultsState;
        userReducer: UserState;
    }
}
