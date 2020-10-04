import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.style.scss';

import { NAME, ROUTES } from '../VALUES/strings';


const errors = [
    "We cannot find the page you are looking for.",
    "It might have been removed, had its name changed, or is temporarily unavailable.",
    "Please check that the Web site address is spelled correctly.",
]

const errorList = errors.map((error, idx) => {
    return (
        <li key={idx}>{error}</li>
    );
})


export function PageNotFound() {
    document.title = `Page not found | ${NAME.app}`;
    return (
        <div className="error-page">
            <div className="error">
                <h1>{NAME.app} is Sorry!</h1>
                <h1>404 - The page cannot be found</h1>
            </div>
            <div className="error-list">
                <ul>
                    {errorList}
                    <li>
                        Or go to  
                        <Link to={`/${ROUTES.home}`} className="go-home">&nbsp;{NAME.home} page&nbsp;</Link>,
                    </li>
                </ul>
            </div>
        </div>
    );
}