import React, { Fragment } from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}
                // THIS IS FOR CLOSING THE DRAWER. IT WILL CLOSE WHEN YOU PRESS ANYWHERE ON IT. YOU SHOULD DO IT SO IT WILL CLOSE ONLY WHEN TAPPING ON AN NAVIAGATION ITEM */
                onClick={props.closed}>
                {/*This is an approach. Another very good aproach is to use a property here and in the Toolbar and set with inline -style the percentage  */}
                <div className={classes.Logo}> {/* We have the .Logo class defined in 3 different .css files, but due to css MODULES, this is actually converted to three different css classes so that they do not interfere  */}
                    <Logo />
                </div>
                {/* You can outsorce the nac to the NvigationItems just make sure to change the stying because now it is done in toolbar */}
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Fragment>
    );
};

export default sideDrawer;