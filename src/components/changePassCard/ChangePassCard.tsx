import React, {forwardRef, useRef} from "react";

import {ChangePassCardProps} from "../../interfaces/interfaces";

import "./changePassCard.css";
import {TextInputField} from "../textInputField/TextInputField";


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



// export const ChangePassCard: React.FC<ChangePassCardProps> = forwardRef(
//     ({
//          values,
//          toggledChange,
//          changeHandler,
//          registerField
//      }, refs:any) => {
//
//         const oldPassRef = useRef(null);
//         const newPassRef = useRef(null);
//         const repeatNewPassRef = useRef(null);
//
//         const inputRefs = Array.from([oldPassRef, newPassRef, repeatNewPassRef]);
//
//         return(
//             <div className="row">
//                 <div className="col s6 offset-s3">
//                     <div className="card-content">
//                         <div className="form-container">
//                             <div>
//                                 {Object.entries(values).map(([key, value], index) => (
//                                     <TextInputField
//                                         id={key}
//                                         value={value}
//                                         toggledChange={toggledChange}
//                                         changeHandler={changeHandler}
//                                         registerField={registerField}
//                                         ref={inputRefs[index]}
//                                     />
//                                 ))}
//                             </div>
//
//
//
//
//
//
//
//
//                             {/*<div className="input-field with-name change-pass">*/}
//                             {/*    Old password:*/}
//                             {/*    <input*/}
//                             {/*        ref={refs}*/}
//                             {/*        placeholder={"enter old password"}*/}
//                             {/*        id="oldPassword"*/}
//                             {/*        name="oldPassword"*/}
//                             {/*        type="password"*/}
//                             {/*        className="validate"*/}
//                             {/*        style={inputStyle}*/}
//                             {/*        value={values.oldPassword}*/}
//                             {/*        onChange={changeHandler}*/}
//                             {/*        disabled={!toggledChange}*/}
//                             {/*        required*/}
//                             {/*    />*/}
//                             {/*</div>*/}
//
//                             {/*<div className="input-field with-name change-pass">*/}
//                             {/*    New password:*/}
//                             {/*    <input*/}
//                             {/*        ref={refs}*/}
//                             {/*        placeholder={"enter new password"}*/}
//                             {/*        id="newPassword"*/}
//                             {/*        name="newPassword"*/}
//                             {/*        type="password"*/}
//                             {/*        className="validate"*/}
//                             {/*        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"*/}
//                             {/*        style={inputStyle}*/}
//                             {/*        value={values.newPassword}*/}
//                             {/*        onChange={changeHandler}*/}
//                             {/*        disabled={!toggledChange}*/}
//                             {/*        required*/}
//                             {/*    />*/}
//                             {/*</div>*/}
//
//                             {/*<div className="input-field with-name change-pass">*/}
//                             {/*    Repeat new password:*/}
//                             {/*    <input*/}
//                             {/*        ref={refs.current.repeatNewPassRef}*/}
//                             {/*        placeholder={"enter new password again"}*/}
//                             {/*        id="repeatNewPassword"*/}
//                             {/*        name="repeatNewPassword"*/}
//                             {/*        type="password"*/}
//                             {/*        className="validate"*/}
//                             {/*        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"*/}
//                             {/*        style={inputStyle}*/}
//                             {/*        value={values.repeatNewPassword}*/}
//                             {/*        onChange={changeHandler}*/}
//                             {/*        disabled={!toggledChange}*/}
//                             {/*        required*/}
//                             {/*    />*/}
//                             {/*</div>*/}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
// })

// export const ChangePassCard: React.FC<ChangePassCardProps> = (
//     {
//         values,
//         toggledChange,
//         changeHandler
//     }
// ): JSX.Element => {
//
//
//     const inputStyle = toggledChange ? {} : {
//         borderBottom: "1px dotted #939393",
//         boxShadow: "none",
//     }
//
//     return(
//             <div className="row">
//                 <div className="col s6 offset-s3">
//                     <div className="card-content">
//                         <div className="form-container">
//                             <div className="input-field with-name change-pass">
//                                 Old password:
//                                 <input
//                                     placeholder={"enter old password"}
//                                     id="oldPassword"
//                                     name="oldPassword"
//                                     type="password"
//                                     className="validate"
//                                     style={inputStyle}
//                                     value={values.oldPassword}
//                                     onChange={changeHandler}
//                                     disabled={!toggledChange}
//                                     required
//                                 />
//                             </div>
//
//                             <div className="input-field with-name change-pass">
//                                 New password:
//                                 <input
//                                     placeholder={"enter new password"}
//                                     id="newPassword"
//                                     name="newPassword"
//                                     type="password"
//                                     className="validate"
//                                     pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
//                                     style={inputStyle}
//                                     value={values.newPassword}
//                                     onChange={changeHandler}
//                                     disabled={!toggledChange}
//                                     required
//                                 />
//                             </div>
//
//                             <div className="input-field with-name change-pass">
//                                 Repeat new password:
//                                 <input
//                                     placeholder={"enter new password again"}
//                                     id="repeatNewPassword"
//                                     name="repeatNewPassword"
//                                     type="password"
//                                     className="validate"
//                                     pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
//                                     style={inputStyle}
//                                     value={values.repeatNewPassword}
//                                     onChange={changeHandler}
//                                     disabled={!toggledChange}
//                                     required
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//     )
// }
