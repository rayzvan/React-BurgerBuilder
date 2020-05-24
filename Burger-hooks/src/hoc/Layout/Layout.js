import React, { Fragment, useState } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

const layout = (props) => {

    const [sideDrawerIsVisible, setSideDraweIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDraweIsVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDraweIsVisible(!sideDrawerIsVisible)
        // this.setState((prevState) => {
        //     return {showSideDrawer: !prevState.showSideDrawer}
        // })
    }

    return (
        <Fragment>
            <Toolbar
                isAuth={props.isAuthenticate}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={props.isAuthenticate}
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticate: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);