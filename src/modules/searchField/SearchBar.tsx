import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { uriForSearch } from './constants';
import { fetchSearchItems } from './store/actions';

import './searchField.css';

export const SearchBar: React.FC = () => {
    const [form, setForm] = useState({
        field: ''
    });

    const dispatch = useDispatch();
    const history = useHistory();

    const resetInputField = () => {
        setForm({field: ''})
    }

    const handleSubmit = () => {
        history.push("/search-results");
        dispatch(fetchSearchItems(uriForSearch, 'POST', form, {}));
    }

    const request = () => {
        dispatch(fetchSearchItems(uriForSearch, 'POST', form, {}))
        resetInputField();
    }

    return (
        <>
            <form className="search-field" onSubmit={handleSubmit}>
                <div className="input-field">
                    <input
                        id="search"
                        placeholder="search"
                        type="search"
                        value={form.field}
                        onChange={e => setForm({field: e.target.value})}
                        onBlur={resetInputField}
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
        </>
    )
}
