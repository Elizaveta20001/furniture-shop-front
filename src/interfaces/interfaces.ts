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

export interface CollectionItemCardInterface extends CatalogItem{
    rating: Rating[]
}

export interface CatalogItemPage extends CatalogItem{
    comments: Comment[]
}

export interface Comment{
    email: string,
    text: string,
    createdAt: Date,
    id: string
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
    password?: string
}

export interface PersonalDataCardProps {
    defaultValues?: PersonalUserData,
    values: PersonalUserData,
    toggledChange: boolean,
    changeHandler: (event: any) => void,
    fileSelectorHandler: (event: any) => void,
    imagePreview: string,
    cancelHandler?: (event: any) => void
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
        catalogReducer: CatalogState;
        userDataReducer: UserDataState;
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

export interface UserDataState {
    userData: any,
    isFetching: boolean,
    isUpdating: boolean,
    userError: string
}

declare global {
    interface Store {
        loginReducer: LoginState;
        catalogReducer: CatalogState;
        cartReducer: CartState;
        searchResultsReducer: SearchResultsState;
        userDataReducer: UserDataState;
    }
}
