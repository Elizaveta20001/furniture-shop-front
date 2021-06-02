import React from "react";
import {Redirect, Route} from "react-router-dom";

interface PrivateRouteInterface {
    component: React.FunctionComponent<any>,
    path: string,
    exact: boolean,
    isAuthenticated: boolean
}

const PrivateRoute: React.FC<PrivateRouteInterface> = ({
                                                           component: Component,
                                                           exact,
                                                           path,
                                                           isAuthenticated
                                                       }) => {
    return (
        <Route path={path} exact={exact} render={(props) => (
            isAuthenticated
            ? <Component {...props}/>
            : <Redirect to={"/home"}/>
        )}/>
    )
}


export default PrivateRoute;