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

        const dividedLabelText = id.replace(/([a-z])([A-Z])/g, '$1 $2');

        useEffect(() => {
            registerField(id, ref);
        }, [registerField, id, ref]);

        return(

            <div className="input-field with-name change-pass">
                {dividedLabelText.charAt(0).toUpperCase() + dividedLabelText.slice(1)}:
                <input
                    ref={ref}
                    id={id}
                    name={id}
                    type="password"
                    style={inputStyle}
                    value={value}
                    onChange={changeHandler}
                    disabled={!toggledChange}
                />
            </div>
        )
    })
