import React, { Component, Fragment } from 'react';
import CheckoutSummary from '../../components/Oreder/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

class Checkout extends Component {

    //we used componentDidMount and NOT componentDidUpdate, because whenever I load this component, it will mount itself
    //  there is no way I can route to it without being mounted again, because it's not nested som some other page
    //componentDidMount() 
    //We use componentWillMount becausewe need to set the ingredients before we render the child component
    componentWillMount() {
        //WE DO NOT NEED THIS BECAUSE WE HAVE THE DATA IN OUR STORE WITH REDUX
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let price = 0;
        // for (let param of query.entries()) {
        //     //THIS IS A WORKEAROUND, WE WILL DO IT IN A BETTER WAY
        //     if (param[0] === 'price') {
        //         price = param[1];
        //     } else {
        //         ingredients[param[0]] = + param[1];
        //     }

        //{1}
        //THIS IS NOT GOOD HERE BECAUSE IS TOO LATE, IT DOES RUN BEFORE THE RENDER RUNS, IT DOES NOT PREVENT THE RENDERING WITH THE OLD PROPS WE RECIEVED
        // AND IN THE OLD PROPS, PURCHASED IS STILL TRUE TRUE
        // SO WE NEED TO INIT THE PUCHASE IN THE BURGER BUILDER WHEN WE CLICK ON ORDER NOW BUTTON
        //this.props.onInitPurchase();
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('checkoutSummary/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <Fragment>
                    {purchasedRedirect}
                    <CheckoutSummary
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ings} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        // we are not render because we want to pass the ingredients to ContactData
                        // component={ContactData}

                        //WE USE THIS NOW BECAUSE WE HAVE REDUX AND DO NOT NEED TO PASS DATA TO COMPONENT MANUALLY
                        component={ContactData}
                    />
                </Fragment>
            )
        }
        return (
            <div>
                {summary}

                {/* //WE COMMENTED THIS BECAYSE WE USE REDUX (VID 280 (Adjusting Checkout and..))
                    render={(props) => (
                         <ContactData 
                         ingredients={this.props.ings} 
                         price={this.state.price}
                         {...props}/>//Because we need the history in the ContactData so we can navigate from there
                         )} /> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

//RELATEDO TO {1}
// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(Checkout);