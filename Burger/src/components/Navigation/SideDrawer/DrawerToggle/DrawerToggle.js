import React from 'react'
import classes from './DrawerToggle.css'

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        {/* These dives do not need any styling because they will be styled correctly because he is styling all 
        divs which are nested in a div or any element which has the DrawerToggle.css*/}
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;