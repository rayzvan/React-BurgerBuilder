import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'

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

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            {/* {this.state.show ? <BurgerBuilder /> : null} */}
            {/* If we want to use without exact we need to use a Switchm because if we go to checkOutSummary the BurgerBuilder will also be loaded  */}
            <Route path='/checkoutSummary' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/auth' component={Auth} />
            <Route path='/' component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
