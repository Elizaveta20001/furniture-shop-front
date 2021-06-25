import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from "react-router-dom";

import { uriForSearch } from './constants';
import { fetchSearchItems } from './store/actions';
import {fetchCatalog} from "../catalog/mainPage/store/actions";

import './searchField.css';

export const SearchBar: React.FC = () => {

    const userId = useSelector((state: Store) => state.loginReducer.userId);
    const token = useSelector((state: Store) => state.loginReducer.token);

    const [query, setQuery] = useState('');
    const [isToggled, setToggled] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const {titles} = useSelector((state: Store) => state.catalogReducer.mainPageReducer);

    useEffect(() => {
        titles.length === 0 && dispatch(fetchCatalog());
        !!query ? toggleButton(true) : toggleButton(false);
    }, [dispatch, titles, query]);

    const toggleButton = (toggled: boolean) => {
        setToggled(toggled);
    }

    const resetInputField = () => {
        setQuery('');
        toggleButton(false);
    }

    const handleBlur = () => {
        !!query ? toggleButton(true) : toggleButton(false);
    }

    const handleChange = (event: any) => {
        setQuery(event.target.value);
    }

    const handleFocus = () => {
        toggleButton(true)
    }

    const handleSubmit = () => {
        let collectionName = '';
        titles.forEach(title => {
                if (!collectionName) {
                    if (location.pathname.includes(title.toLowerCase())) collectionName = title;
                }
                return title;
            });
        dispatch(
            fetchSearchItems(
                uriForSearch,
                'GET',
                {field: query, collectionName},
                userId,
                token
            )
        );
        resetInputField();
        history.push(`/search-results?${collectionName.toLowerCase()}`);
    }

    return (
        <>
            <form className="search-field">
                <div className="input-field">
                    <input
                        className="input"
                        id="search"
                        placeholder="search"
                        type="search"
                        value={query}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                    <label className="label-icon" htmlFor="search">
                        <i className="material-icons">search</i>
                    </label>
                    <i
                        className="material-icons"
                        onClick={resetInputField}
                    >
                        close
                    </i>
                </div>
            </form>
            {isToggled &&
                <button
                    className="search-button waves-effect waves-light btn-small custom-button"
                    onClick={handleSubmit}
                >
                    find
                </button>
            }

        </>
    )
}
