import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation, withRouter} from 'react-router-dom';

import {Loader} from "../../components/loader/Loader";
import CollectionItem from "../../components/collectionItem/CollectionItem";

import "./searchResultsPage.css";
import {useEffect} from "react";
import {useMessage} from "../../hooks/message.hook";
import {clearSearchResultsError} from "./store/actions";

const SearchResultsPage: React.FC = (): JSX.Element => {

    const data = useSelector((state: Store) => state.searchResultsReducer.results);
    const isFetching = useSelector((state: Store) => state.searchResultsReducer.isFetching);
    const searchResultsNotification = useSelector((state: Store) => state.searchResultsReducer.error);
    const dispatch = useDispatch();
    const message = useMessage();
    const history = useHistory();
    const location = useLocation();
    const searchCategory = location.search ? location.search.slice(1) : "";

    useEffect(() => {
        message(searchResultsNotification);
        return () => {
            dispatch(clearSearchResultsError());
        }
    }, [dispatch, searchResultsNotification, message]);

    return (
        <div>
            {
                isFetching ? <Loader/> : (
                        <div>
                            {data.length === 0 ? <h1>No results</h1> :
                                (
                                    searchCategory ?
                                        <h1>Search results for {searchCategory}</h1> :
                                        <h1>Search results for all categories</h1>
                                )
                            }
                            <div className="search-results-container">
                                {
                                    data.map(element =>
                                        <CollectionItem
                                            title={element.title}
                                            id={element.id}
                                            url={element.url}
                                            price={element.price}
                                            description={element.description}
                                            key={element.id}
                                            collectionName={element.collectionName}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    )
            }
        </div>
    )
};


export default withRouter(SearchResultsPage);
