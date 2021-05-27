import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {NavLink, useHistory} from "react-router-dom";

import { uriForSearch } from './constants';
import { fetchSearchItems } from './store/actions';

import './searchField.css';

export const SearchBar: React.FC = () => {
    const [form, setForm] = useState({
        field: ''
    });
    const [isToggled, setToggled] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const toggleButton = (toggled: boolean) => {
        setToggled(toggled);
    }

    const resetInputField = () => {
        setForm({field: ''});
        toggleButton(false);
    }

    const handleBlur = () => {
        !!form.field ? toggleButton(true) : toggleButton(false);
    }

    const handleChange = (event: any) => {
        setForm({field: event.target.value});
        !!form.field ? toggleButton(true) : toggleButton(false);
    }

    const handleFocus = () => {
        toggleButton(true)
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
