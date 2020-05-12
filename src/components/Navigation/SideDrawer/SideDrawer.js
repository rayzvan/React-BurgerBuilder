import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'

const sideDrawer = (props) => {

    return (
        <div className={classes.SideDrawer}>
            {/*This is an approach. Another very good aproach is to use a property here and in the Toolbar and set with inline -style the percentage  */}
            <div className={classes.Logo}> {/* We have the .Logo class defined in 3 different .css files, but due to css MODULES, this is actually converted to three different css classes so that they do not interfere  */}
                <Logo />
            </div>
            {/* You can outsorce the nac to the NvigationItems just make sure to change the stying because now it is done in toolbar */}
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default sideDrawer;