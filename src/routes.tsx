import { useSelector } from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import { AuthPage } from './modules/authorization/AuthPage';
import { CartPage } from './modules/cart/CartPage';
import { ContactsPage } from './modules/contacts/ContactsPage';
import { HomePage } from './modules/home/HomePage';
import { CatalogPage } from './modules/catalog/mainPage/CatalogPage';
import CollectionPage from "./modules/catalog/collection/CollectionPage";
import CollectionItemPage from "./modules/catalog/collectionItemPage/CollectionItemPage";


interface LoginState {
    token: String;
    userId: String;
    isEnter: Boolean;
}

interface Store {
    loginReducer: LoginState;
}

export const useRoutes = (isAuthenticated: boolean) => {
    const isEnter = useSelector((state: Store) => state.loginReducer.isEnter);

    return (
        <Switch>
            <Route exact path="/home">
                <HomePage />
            </Route>
            <Route exact path="/contacts">
                <ContactsPage />
            </Route>
            <Route exact path="/catalog">
                <CatalogPage />
            </Route>
            <Route exact path="/tables">
                <CollectionPage/>
            </Route>
            <Route path="/tables/:id">
                <CollectionItemPage/>
            </Route>
            <Route exact path="/beds">
                <CollectionPage/>
            </Route>
            <Route path="/beds/:id">
                <CollectionItemPage/>
            </Route>
            <Route exact path="/armchairs">
                <CollectionPage/>
            </Route>
            <Route path="/armchairs/:id">
                <CollectionItemPage/>
            </Route>
            <Route exact path="/sofas">
                <CollectionPage/>
            </Route>
            <Route path="/sofas/:id">
                <CollectionItemPage/>
            </Route>
            {
                isAuthenticated && 
                    <Route path="/basket">
                        <CartPage />
                    </Route>
            }
            {
                !isAuthenticated && !isEnter ? 
                    <Route path="/auth">
                        <AuthPage />
                    </Route> : null
            }
            <Redirect to="/home"/>
        </Switch>
    )
};