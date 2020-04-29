import React, {Fragment} from 'react';

const Header = (props) => (         
    <Fragment>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
    </Fragment> 
);


export default Header;