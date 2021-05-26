import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { uriForSearch } from './constants';
import { fetchSearchItems } from './store/actions';

import './searchField.css';


export const SearchBar: React.FC = () => {
    const [form, setForm] = useState({
        field: ''
    });
    const dispatch = useDispatch();

    const request = () => {
        dispatch(fetchSearchItems(uriForSearch, 'POST', form, {}))
        setForm({field: ''})
    }

    return (
        <>
            <form className="search-field">
                <div className="input-field">
                    <input 
                        id="search" 
                        type="search" 
                        value={form.field}
                        onChange={e => setForm({field: e.target.value})}
                        required
                    />
                    <label className="label-icon"><i className="material-icons">s</i></label>
                    
                    <i className="material-icons">x</i>
                </div>
            </form>
            <button
                className="search-button waves-effect waves-light btn-small custom-button"
                onClick={request}
            >find</button>
        </>
    )
};