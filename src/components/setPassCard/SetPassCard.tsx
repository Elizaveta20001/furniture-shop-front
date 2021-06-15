import {SetPassCardProps} from "../../interfaces/interfaces";

export const SetPassCard: React.FC<SetPassCardProps> = (
    {
        values,
        changeHandler,
        blurHandler
    }
): JSX.Element => {

    return(
        <form>
            <div className="row">
                <div className="col s6 offset-s3">
                    <div className="card-content">
                        <div className="form-container">

                            <div className="input-field with-name change-pass">
                                Password:
                                <input
                                    placeholder={"enter password"}
                                    id="signUpPassword"
                                    name="signUpPassword"
                                    type="password"
                                    className="validate"
                                    value={values.signUpPassword}
                                    onChange={changeHandler}
                                    onBlur={blurHandler}
                                    required
                                />
                            </div>

                            <div className="input-field with-name change-pass">
                                Repeat password:
                                <input
                                    placeholder={"enter password again"}
                                    id="repeatSignUpPassword"
                                    name="repeatSignUpPassword"
                                    type="password"
                                    className="validate"
                                    value={values.repeatSignUpPassword}
                                    onChange={changeHandler}
                                    onBlur={blurHandler}
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
