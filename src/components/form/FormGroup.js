import React from 'react';
import './Form.style.scss';

import { COLORS } from '../VALUES/colors';
import { DIMENS } from '../VALUES/dimens';
import { NAME } from '../VALUES/strings';

// eslint-disable-next-line
const labelBlurStyleEmpty = {
    top: DIMENS.labelBlurTop,
    left: DIMENS.labelBlurLeft,
    // fontSize: DIMENS.labelBlurFontSize,
    fontSize: DIMENS.labelFocusFontSize,
    padding: DIMENS.labelBlurPadding,
    color: COLORS.labelColor,
    backgroundColor: COLORS.backgroundColor,
}

const labelFocusStyle = {
    top: DIMENS.labelFocusTop,
    left: DIMENS.labelFocusLeft,
    fontSize: DIMENS.labelFocusFontSize,
    padding: DIMENS.labelFocusPadding,
    color: COLORS.colorAccentDim,
}

const labelBlurStyleFull = {
    ...labelFocusStyle,
    backgroundColor: COLORS.labelBgColorFocus,
    backgroundImage: COLORS.labelBgImageFocus,
}

const inputStyles = {
    error: { border: `2px solid ${COLORS.fail}` },
    valid: { border: `2px solid ${COLORS.pass}` },
}

const toogleInputType = (id, type, setType) => {
    if(id === NAME.password || id === NAME.confirmPassword) {
        if(type === NAME.password) {
            setType(NAME.text);
        } else {
            setType(NAME.password);
        }
    }
}

const getClassname = (name) => {
    if(name === NAME.password || name === NAME.confirmPassword){
        return NAME.password;
    }
    return "";
}

const IncludePasswordIcon = (props) => {
    return (
        props.origType !== NAME.password ? null:
            <span 
                className="password-icon"
                onClick={() => toogleInputType(props.id, props.currType, props.setType)}>
                <i className={props.eyeIconClassname} />
            </span>
    )
}

const PlaceholderLabel = (props) => {
    return(
        <label
            htmlFor={props.name}
            style={
                props.value? 
                    !props.errorText && props.touched?
                        {...labelBlurStyleFull, color: COLORS.pass, fontWeight: "600"}
                        : labelBlurStyleFull
                    : {}
                }
            >
                {props.placeHolder}
        </label>
    )
}

const ErrorBox = (props) => {
    return(
        props.touched && props.errorText ?
            <div className="error-text-box">
                <i className="fa fa-exclamation-circle exclamation-circle"></i>
                <span>{props.errorText}</span>
            </div> : null
    )
}

const InfoBox = (props) => {
    return(
        !props.info ? null:
            <div style={{ fontSize: "11px", marginBottom: "10px", color: "#696969", }}>
                {props.info}
            </div>

    )
}


const FormGroup = (props) => {
    const placeHolder = props.name.split('_').join(' ');
    const className = getClassname(props.name);
    let disable = props.isSubmitting ? "disable" : "";
    // For password
    const [type, setType] = React.useState(props.type);
    const eyeIconClassname = type === NAME.password? "fa fa-eye" : "fa fa-eye-slash";
    // END password

    return (
        <div className="form-group-container">
            <div className="form-group">
                <input
                    type={type}
                    name={props.name}
                    id={props.id}
                    autoFocus={props.autoFocus}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.value}
                    className={`${className} ${disable}`}
                    style={ props.touched && props.errorText ?
                        inputStyles.error :
                         props.touched? inputStyles.valid: {} }
                />
                {/* Include a toogle password icon if it is a password type */}
                <IncludePasswordIcon 
                    origType={props.type}
                    eyeIconClassname={eyeIconClassname}
                    id={props.id}
                    currType={type}
                    setType={setType}

                />
                {/* Label to act as placeholder */}
                <PlaceholderLabel 
                    name={props.name}
                    value={props.value}
                    errorText={props.errorText}
                    touched={props.touched}
                    placeHolder={placeHolder}
                />
            </div>
            {/* Display error for input if any */}
            <ErrorBox 
                touched={props.touched}
                errorText={props.errorText}
            />
            {/* Display any other information that would guide the user if needed*/}
            <InfoBox info={props.info}/>
        </div>
    )
}


export{
    FormGroup,
} 

    