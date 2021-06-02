import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";


const PrivateRoute: React.FC<any> = ({component: Component, isAuthenticated, path, exact}): JSX.Element=> {
    return <Route path={path} exact={exact} render={(props) => (
            isAuthenticated
                ? <Component {...props}/>
                : <Redirect to="/home"/>
        )}/>

};


export default PrivateRoute;