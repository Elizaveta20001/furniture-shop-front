import {ChangePassCardProps} from "../../interfaces/interfaces";

import "./changePassCard.css";

export const ChangePassCard: React.FC<ChangePassCardProps> = (
    {
        values,
        toggledChange,
        changeHandler,
        cancelHandler
    }
): JSX.Element => {
    

    const inputStyle = toggledChange ? {} : {
        borderBottom: "1px dotted #939393",
        boxShadow: "none",
    }

    return(
        <form >
            <div className="row">
                <div className="col s6 offset-s3">
                    <div className="card-content">
                        <div className="form-container">
                            <div className="input-field with-name change-pass">
                                Old password:
                                <input
                                    placeholder={"enter old password"}
                                    id="oldPassword"
                                    name="oldPassword"
                                    type="password"
                                    className="validate"
                                    style={inputStyle}
                                    value={values.oldPassword}
                                    onChange={changeHandler}
                                    disabled={!toggledChange}
                                    required
                                />
                            </div>

                            <div className="input-field with-name change-pass">
                                New password:
                                <input
                                    placeholder={"enter new password"}
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    className="validate"
                                    style={inputStyle}
                                    value={values.newPassword}
                                    onChange={changeHandler}
                                    disabled={!toggledChange}
                                    required
                                />
                            </div>

                            <div className="input-field with-name change-pass">
                                Repeat new password:
                                <input
                                    placeholder={"enter new password again"}
                                    id="repeatNewPassword"
                                    name="repeatNewPassword"
                                    type="password"
                                    className="validate"
                                    style={inputStyle}
                                    value={values.repeatNewPassword}
                                    onChange={changeHandler}
                                    disabled={!toggledChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
