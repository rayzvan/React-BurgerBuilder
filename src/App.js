import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route } from 'react-router-dom'


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
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
          {/* If we want to use without exact we need to use a Switchm because if we go to checkOutSummary the BurgerBuilder will also be loaded  */}
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/checkoutSummary' component={Checkout} />
        </Layout>
      </div>
    );
  }
}

export default App;
