import {PersonalDataCardProps} from "../../interfaces/interfaces";

import DefaultImage from "../../assets/default-profile.png";
import "./personalDataCard.css";

export const PersonalDataCard: React.FC<PersonalDataCardProps> = (
    {
        defaultValues,
        values,
        toggledChange,
        changeHandler,
        fileSelectorHandler,
        imagePreview,
        required
    }
): JSX.Element => {

    const inputStyle = toggledChange ? {} : {
        borderBottom: "1px dotted #939393",
        boxShadow: "none",
    }

    return(
            <div className="row image-column-container">
                <div className="col s12 m5">
                    <div className="card-content">
                        <div className="image-container" >
                            <div className="file-field input-field">
                                <div className="preview">
                                    <img className="circle z-depth-5" src={imagePreview || DefaultImage} alt="" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={fileSelectorHandler}
                                        disabled={!toggledChange}
                                    />
                                    <input
                                        className="file-path file-selector"
                                        type="text"
                                        placeholder="set profile image"
                                        disabled
                                    />
                                    <div className="helper-text" data-error="wrong" data-success="right">
                                        Max image size - 10MB
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col s12 m7">
                    <div className="card-content">
                        <div className="form-container">
                            <div className="input-field with-name">
                                First Name:
                                <input
                                    placeholder={defaultValues?.firstName || "enter first name"}
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    style={inputStyle}
                                    className="validate"
                                    pattern="[A-Za-z]{1,32}"
                                    value={values.firstName}
                                    onChange={changeHandler}
                                    disabled={!toggledChange}
                                    required={required}
                                />
                            </div>

                            <div className="input-field with-name">
                                Last name:
                                <input
                                    placeholder={defaultValues?.lastName || "enter last name"}
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    style={inputStyle}
                                    className="validate"
                                    pattern="[A-Za-z]{1,32}"
                                    value={values.lastName}
                                    onChange={changeHandler}
                                    disabled={!toggledChange}
                                    required={required}
                                />
                            </div>

                            <div className="input-field with-name">
                                E-mail:
                                <div>
                                    <input
                                        placeholder={defaultValues?.email || "enter email"}
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="validate"
                                        pattern="^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$"
                                        style={inputStyle}
                                        value={values.email}
                                        onChange={changeHandler}
                                        disabled={!toggledChange}
                                        required={required}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



    )
}
