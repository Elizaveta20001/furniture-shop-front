import React, {Fragment, forwardRef, useRef} from "react";
import {useEffect} from "react";
import {TextInputFieldProps} from "../../interfaces/interfaces";

export const TextInputField: React.FC<TextInputFieldProps> = forwardRef(
    ({
         value,
         id,
         toggledChange,
         changeHandler,
         registerField
     }, ref:any): JSX.Element => {

        const inputStyle = toggledChange ? {} : {
            borderBottom: "1px dotted #939393",
            boxShadow: "none",
        }

        useEffect(() => {
            registerField(id, ref);
        }, [registerField, id, ref]);

        return(

            <Fragment>
                <input
                    ref={ref}
                    id={id}
                    name={id}
                    type="password"
                    className="validate"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                    style={inputStyle}
                    value={value}
                    onChange={changeHandler}
                    disabled={!toggledChange}
                    required
                />
            </Fragment>
        )
    })
