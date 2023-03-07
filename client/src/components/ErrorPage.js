import React from 'react';
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return(
        <div className='app'>
            <h3>
                Please provide the details in{" "}
                <Link to='/'>homepage</Link>.
            </h3>
        </div>
    )
}

export default ErrorPage;