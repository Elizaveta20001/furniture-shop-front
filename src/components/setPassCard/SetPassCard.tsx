import {SetPassCardProps} from "../../interfaces/interfaces";
import React, {useRef} from "react";
import {TextInputField} from "../textInputField/TextInputField";

export const SetPassCard: React.FC<SetPassCardProps> = (
    {
        values,
        changeHandler,
        registerField
    }
): JSX.Element => {

    const signUpPassRef = useRef(null);
    const repeatSignUpPassRef = useRef(null);

    const inputRefs = Array.from([signUpPassRef, repeatSignUpPassRef]);

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
                                    toggledChange={true}
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
