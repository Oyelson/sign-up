import React from 'react';

import './Form.style.scss';

import { NAME, EXT_LINKS } from '../VALUES/strings';


const Agreement = () => {
    return(
        <div className="agreement-text">
            <p>
                By creating an account, you agree to the 
                <a 
                    href={`${EXT_LINKS.termsOfService}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    &nbsp;Terms of Service&nbsp; 
                </a>
                and you acknowledge that {NAME.app} and each Member process data in accordance
                with the 
                <a 
                    href={`${EXT_LINKS.privacyPolicy}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    &nbsp;Privacy Policy&nbsp;
                </a>
            </p>
        </div>
    )
}

export default Agreement;
