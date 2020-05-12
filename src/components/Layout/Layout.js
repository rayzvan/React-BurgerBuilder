import React, { Component, Fragment } from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDraweClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    //This actually works as a toggle but we cannot use it in our app because the side drawer covers it. But in case we may want to put it somehere in the app it does have the functionality
    sideDraweToggleHandler = () => {
        //You should not do it like this because do the the asynchronus nature of seState this may lead to unespected outcomes
        // this.setState({ showSideDrawer: !this.state.showSideDrawer })

        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <Fragment>
                <Toolbar
                    drawerToggleClicked={this.sideDraweToggleHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDraweClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    };
};

export default Layout;