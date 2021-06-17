import React, {useRef} from "react";

import {ChangePassCardProps} from "../../interfaces/interfaces";

import {TextInputField} from "../textInputField/TextInputField";

import "./changePassCard.css";

export const ChangePassCard: React.FC<ChangePassCardProps> = (
    {
        values,
        toggledChange,
        changeHandler,
        registerField
    }
): JSX.Element => {

    const oldPassRef = useRef(null);
    const newPassRef = useRef(null);
    const repeatNewPassRef = useRef(null);

    const inputRefs = Array.from([oldPassRef, newPassRef, repeatNewPassRef]);

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card-content">
                    <div className="form-container">
                            {Object.entries(values).map(([key, value], index) => (
                                <TextInputField
                                    key={key}
                                    id={key}
                                    value={value}
                                    toggledChange={toggledChange}
                                    changeHandler={changeHandler}
                                    registerField={registerField}
                                    ref={inputRefs[index]}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
