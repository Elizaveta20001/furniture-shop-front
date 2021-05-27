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
        dispatch(fetchSearchItems(uriForSearch, 'POST', form, {}));
        resetInputField();
        history.push(`/search-results?${form.field}`);
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
                        value={form.field}
                        onChange={e => setForm({field: e.target.value})}
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
            <button
                className="search-button waves-effect waves-light btn-small custom-button"
                onClick={handleSubmit}
            >
                find
            </button>
        </>
    )
}
