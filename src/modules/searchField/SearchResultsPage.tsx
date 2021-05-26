import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import CollectionItem from "../../components/collectionItem/CollectionItem";

import "./searchResultsPage.css";


const SearchResultsPage: React.FC = ({}): JSX.Element => {

    const data = useSelector((state: Store) => state.searchResultsReducer.results);

    useEffect(() => {

        // smth to add here

    }, []);

    return (
        <div>
            {
                data.length === 0 ? <h1>No results</h1> : <h1>Search results</h1>
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
                        />
                    )
                }
            </div>
        </div>
    )
};


export default withRouter(SearchResultsPage);
