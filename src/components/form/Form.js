import React from 'react'

import { CreateAccountForm } from './CreateAccountForm';
import { NAME } from '../VALUES/strings';

import './Form.style.scss'


export function Form(props) {
    let form = <></>
    switch (props.formType) {
        case NAME.createAccount:
            form = <CreateAccountForm />
            break;
        default:
            break;
    }

    return (
        <div className="form-container">
            {form}
        </div>
    );
}