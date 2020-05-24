import React, { Fragment } from 'react';
import CheckoutSummary from '../../components/Oreder/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

const checkout = (props) => {

    const checkoutCanceledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('checkoutSummary/contact-data');
    }

    let summary = <Redirect to="/" />
    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
        summary = (
            <Fragment>
                {purchasedRedirect}
                <CheckoutSummary
                    checkoutCanceled={checkoutCanceledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                    ingredients={props.ings} />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </Fragment>
        )
    }
    return (
        <div>
            {summary}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(checkout);