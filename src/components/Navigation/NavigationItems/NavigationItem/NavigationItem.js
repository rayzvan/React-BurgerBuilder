import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            exact={props.exact} /* we use it because otherwise the / nothing will also be treated as active because is included in /orders */
            activeClassName={classes.active}>{/* This will be our active class name as our css modules transformations spits it out */}
            {/* we do not need the className with NavLink to determene if is active or not, it will automaticalli determine this */}
            {/*className={props.active ? classes.active : null} */}
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem