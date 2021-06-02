import {useSelector} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from './modules/authorization/AuthPage';
import {CartPage} from './modules/cart/CartPage';
import {ContactsPage} from './modules/contacts/ContactsPage';
import {HomePage} from './modules/home/HomePage';
import {CatalogPage} from './modules/catalog/mainPage/CatalogPage';
import CollectionPage from "./modules/catalog/collection/CollectionPage";
import CollectionItemPage from "./modules/catalog/collectionItemPage/CollectionItemPage";
import SearchResultsPage from "./modules/searchField/SearchResultsPage";
import PrivateRoute from "./components/privateRoute/PrivateRoute";


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
                <HomePage/>
            </Route>
            <Route exact path="/contacts">
                <ContactsPage/>
            </Route>
            <Route exact path="/catalog">
                <CatalogPage/>
            </Route>
            <Route exact path="/search-results">
                <SearchResultsPage/>
            </Route>
            <Route exact path="/:collectionName">
                <CollectionPage/>
            </Route>
            <Route path="/:collectionName/:id">
                <CollectionItemPage/>
            </Route>
            {/*{*/}
            {/*    isAuthenticated &&*/}
            {/*        <Route path="/cart">*/}
            {/*            <CartPage />*/}
            {/*        </Route>*/}
            {/*}*/}
            {
                !isAuthenticated && !isEnter ?
                    <Route path="/auth">
                        <AuthPage />
                    </Route> : null
            }

            <PrivateRoute
                component={CartPage}
                exact={true}
                path="/cart"
                isAuthenticated={isAuthenticated}
            />

            {/*<PrivateRoute*/}
            {/*    path="/auth"*/}
            {/*    Component={AuthPage}*/}
            {/*    isAuthenticated={!isAuthenticated}*/}
            {/*/>*/}


            <Redirect to="/home"/>
        </Switch>
    )
};
