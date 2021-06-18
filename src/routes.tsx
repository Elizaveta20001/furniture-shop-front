import {useSelector} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {SignInPage} from './modules/authorization/sign-in/SignInPage';
import {MainAuthPage} from "./modules/authorization/mainAuthPage/MainAuthPage";
import {SignUpPage} from "./modules/authorization/sign-up/SignUpPage";
import {MainUserProfilePage} from "./modules/user-profile/mainPage/MainUserProfilePage";
import {BasicInfoSubTab} from "./modules/user-profile/personalInfoTab/basicInformation/BasicInfoSubTab";
import {CartPage} from './modules/cart/CartPage';
import {ContactsPage} from './modules/contacts/ContactsPage';
import {HomePage} from './modules/home/HomePage';
import {CatalogPage} from './modules/catalog/mainPage/CatalogPage';
import CollectionPage from "./modules/catalog/collection/CollectionPage";
import CollectionItemPage from "./modules/catalog/collectionItemPage/CollectionItemPage";
import SearchResultsPage from "./modules/searchField/SearchResultsPage";
import PrivateRoute from "./components/privateRoutes/PrivateRoute";


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
            <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/user-profile/"
                exact={true}
                component={MainUserProfilePage}
            />
            <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/user-profile/personal-data"
                exact={true}
                component={BasicInfoSubTab}
            />
            <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/cart"
                exact={true}
                component={CartPage}
            />
            <PrivateRoute
                isAuthenticated={!isAuthenticated && !isEnter}
                exact={true}
                path="/auth"
                component={MainAuthPage}
            />
            <PrivateRoute
                isAuthenticated={!isAuthenticated && !isEnter}
                exact={true}
                path="/sign-in"
                component={SignInPage}
            />
            <PrivateRoute
                isAuthenticated={!isAuthenticated && !isEnter}
                exact={true}
                path="/sign-up"
                component={SignUpPage}
            />
            <Route exact path="/search-results">
                <SearchResultsPage/>
            </Route>
            <Route exact path="/:collectionName">
                <CollectionPage/>
            </Route>
            <Route path="/:collectionName/:id">
                <CollectionItemPage/>
            </Route>

            <Redirect to="/home"/>
        </Switch>
    )
};
