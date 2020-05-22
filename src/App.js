import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent';

//!!!!! **** THIS WIL ACTUALLY NOT WORK IF is called Async.. instead of async.. !!! ****
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

const asyncCheckout = asyncComponent(() => {s
  return import('./containers/Checkout/Checkout');
})

class App extends Component {

  //TO make sure the burger builder dissapears after a while
  //and test fo componentWillUnmount() to see if the interceptors are ejected
  // state = {
  //   show: true
  // }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ show: false })
  //   }, 5000)
  // }

  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>{/* THIS IS THE ROUTING SETUP FOR UNAUTHENTICATED USERS */}
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>{/* THIS IS THE ROUTING SETUP FOR UNAUTHENTICATED USERS */}
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
          {/* If we want to use without exact we need to use a Switchm because if we go to checkOutSummary the BurgerBuilder will also be loaded  */}
          <Route path='/checkoutSummary' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={BurgerBuilder} />
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));