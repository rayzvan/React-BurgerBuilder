import React, { Component } from 'react';
import CheckoutSummary from '../../components/Oreder/CheckoutSummary/CheckoutSummary'

class Checkout extends Component{
    state = {
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }

    //we used componentDidMount and NOT componentDidUpdate, because whenever I load this component, it will mount itself
    //  there is no way I can route to it without being mounted again, because it's not nested som some other page
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()){
            ingredients[param[0]] = + param[1];
        }

        this.setState({ingredients: ingredients});
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return(
            <div>
                {/* THIS ARE DUMMY INGREDIENTS */}
                <CheckoutSummary
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients}/>
            </div>
        )
    }
}

export default Checkout;