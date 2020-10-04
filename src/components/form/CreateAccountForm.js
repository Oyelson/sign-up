import React from 'react';
import { useFormik } from 'formik';

import './Form.style.scss';

import Agreement from './Agreement';

import { NAME } from '../VALUES/strings';
import { COLORS } from '../VALUES/colors';
import { validate } from './validateCredentials';
import { FormGroup,  } from './FormGroup';

import {
    postAllFields,
} from './postData';


export function CreateAccountForm() {
    const emptyFields = {
        [NAME.firstName]: "",
        [NAME.lastName]: "",
        [NAME.email]: "",
        [NAME.password]: "",
        [NAME.confirmPassword]: "",
        passwordStrength: "",
    };

    const formik = useFormik({
        initialValues: {
            ...emptyFields,
            serverFeedback: "",
        },
        validate,
        onSubmit: (values, { errors, setSubmitting }) => {
            setTimeout(() => {
                if(errors[NAME.email]){
                    setSubmitting(false);
                } else {
                    postAllFields(values);
                }
            }, 5000);
        },
    });

    let submitDisabled = !formik.isValid || formik.isValidating || formik.isSubmitting;

    const feedbackStyle = { style: {}, className: "" };
    feedbackStyle.className = (formik.values.serverFeedback === NAME.BAD) ? 
            "sign-up-error" : 
        (formik.values.serverFeedback === NAME.OK) ? 
            "sign-up-valid" : "";
    feedbackStyle.style.backgroundColor = (formik.values.serverFeedback === NAME.BAD) ? 
            COLORS.fail : 
        (formik.values.serverFeedback === NAME.OK) ? 
            COLORS.pass : "";

    return (
        <form
            className="form flex-col"
            action=""
            method=""
            id="create-account-form"
            onSubmit={formik.handleSubmit}>
                {/* Out feedback to user from server */}
                {
                    !formik.values.serverFeedback ? null:
                        <div className={`server-feedback-cont ${feedbackStyle.className}`}>
                            <div 
                                className={`server-feedback ${feedbackStyle.className}`}
                                style={feedbackStyle.style}>
                                <span>
                                    {formik.values.serverFeedback}
                                </span>
                            </div>
                        </div>
                }

                <header>Create a {NAME.app} Account</header>

                <FormGroup
                    type="text"
                    name={NAME.firstName}
                    id={NAME.firstName}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values[NAME.firstName]}
                    errorText={formik.errors[NAME.firstName]}
                    // info={formik.info[NAME.firstName]}
                    touched={formik.touched[NAME.firstName]}
                    isSubmitting={formik.isSubmitting}
                    onFocus={formik.handleFocus}
                />
                <FormGroup
                    type="text"
                    name={NAME.lastName}
                    id={NAME.lastName}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values[NAME.lastName]}
                    errorText={formik.errors[NAME.lastName]}
                    // info={formik.info[NAME.lastName]}
                    touched={formik.touched[NAME.lastName]}
                    isSubmitting={formik.isSubmitting}
                />
                <FormGroup 
                    type="text"
                    name={NAME.email}
                    id={NAME.email}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values[NAME.email]}
                    errorText={formik.errors[NAME.email]}
                    // info={formik.info[NAME.email]}
                    touched={formik.touched[NAME.email]}
                    isSubmitting={formik.isSubmitting}
                />
                <FormGroup
                    type="password"
                    name={NAME.password}
                    id={NAME.password}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values[NAME.password]}
                    errorText={formik.errors[NAME.password]}
                    // info={formik.info[NAME.password]}
                    touched={formik.touched[NAME.password]}
                    isSubmitting={formik.isSubmitting}
                />
                <FormGroup
                    type="password"
                    name={NAME.confirmPassword}
                    id={NAME.confirmPassword}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values[NAME.confirmPassword]}
                    errorText={formik.errors[NAME.confirmPassword]}
                    // info={formik.info[NAME.confirmPassword]}
                    touched={formik.touched[NAME.confirmPassword]}
                    isSubmitting={formik.isSubmitting}
                />

                <Agreement />
                
                <input
                    type="submit"
                    value={formik.isSubmitting ? "Creating..." : "Create Account"}
                    className={submitDisabled ? "disable" : ""}
                    disabled={submitDisabled}
                />
        </form>
    );
}