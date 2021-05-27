import {useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {Loader} from "../../components/loader/Loader";
import SearchResultsItem from "../../components/searchResultsItem/SearchResultsItem";

import "./searchResultsPage.css";



const SearchResultsPage: React.FC = (): JSX.Element => {

    const data = useSelector((state: Store) => state.searchResultsReducer.results);
    const isFetching = useSelector((state: Store) => state.searchResultsReducer.isFetching);

    return (
        <div>
            {
                isFetching ? <Loader/> : (
                        <div>
                            {data.length === 0 ? <h1>No results</h1> : <h1>Search results</h1>}
                            <div className="search-results-container">
                                {
                                    data.map(element =>
                                        <SearchResultsItem
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
