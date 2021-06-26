import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserFavorites, initUserFavoritesState} from "./store/actions";
import EmptyUserProfileTab from "../../../components/emptyUserProfileTab/EmptyUserProfileTab";

import "./favoritesTab.css"

export const FavoritesTab: React.FC = () => {

    const dispatch = useDispatch();
    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);
    const userFavorites  = useSelector((state: Store) => state.userReducer.userFavoritesReducer.userFavorites);
    const isFetching = useSelector((state: Store) => state.userReducer.userFavoritesReducer.isFetching);

    useEffect(() => {
        initUserFavoritesState()
        if (!!userId && !!token) dispatch(fetchUserFavorites(userId, token))
    }, [dispatch, userId, token]);

    useEffect(() => console.log('userFavorites',userFavorites), [userFavorites])

    if (isFetching || userFavorites.length < 1)
        return (<div className="card">
            <EmptyUserProfileTab
                text="Your favorites is empty"
                iconName='favorite_border'
            />
        </div>)

    return (
        <div className="card">
            <div className="card-content">
                {
                    userFavorites.map(
                        (item:any, index:number) =>
                            <div key={index} className="favorites-item">
                                <div className="favorites-item-image-container">
                                    <img alt={item.title} src={item.url}/>
                                </div>
                                <div className="favorites-item-data">
                                    <h5>{item.title}</h5>
                                </div>
                                <div className="favorites-item-data">
                                    <h5>${item.price}</h5>
                                </div>
                                <div className="favorites-item-data">
                                    <i className="material-icons small">favorite</i>
                                </div>
                            </div>
                    )
                }
            </div>
        </div>
    )
}
