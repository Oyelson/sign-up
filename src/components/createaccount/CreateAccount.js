import React from 'react'

import { NAME, EXT_LINKS } from '../VALUES/strings';

import './CreateAccount.style.scss';
import Form from "../form";


export function CreateAccount() {
    document.title = `Sign Up Demo | ${NAME.app}`;
    return (
        <div className="create-account">
            <div className="current-form">
                <header>
                    Already have a {NAME.app} account?
                     <a
                        href={`${EXT_LINKS.login}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sign-in-link">
                            &nbsp;Log In&nbsp;
                    </a>
                </header>

                <Form formType={NAME.createAccount} />

            </div>
        </div>
    )
}
