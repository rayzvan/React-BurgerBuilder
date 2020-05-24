import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
})

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
})

const app = (props) => {

  const { onTryAutoLogin } = props;

  useEffect(() => {
    onTryAutoLogin();
  }, [onTryAutoLogin])

  let routes = (
    <Switch>
      <Route path='/auth' render={(props) => <Auth {...props} />} />
      <Route path='/' component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkoutSummary' render={(props) => <Checkout {...props} />} />
        <Route path='/orders' render={(props) => <Orders {...props} />} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' render={(props) => <Auth {...props} />} />
        <Route path='/' component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading..</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div >
  );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));