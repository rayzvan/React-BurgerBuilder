import React, { useEffect, Fragment, useState } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OderdSummarry/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

const burgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false)

    useEffect(() => {
        props.onInitIngredients();
    }, [])

    const updatePurchesState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0)

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetRedirectPath('/checkoutSummary')
            props.history.push('/auth');
        }

    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkoutSummary')
    }

    const disabledInfo = { ...props.ings };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if (props.ings) {
        burger = (
            <Fragment>
                <Burger ingredients={props.ings} />
                <BuildControls
                    addIngredient={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchesState(props.ings)}
                    order={purchaseHandler}
                    isAuthenticated={props.isAuthenticated}
                    price={props.price} />
            </Fragment>
        )

        orderSummary = (
            <OrderSummary
                purchaseContinue={purchaseContinueHandler}ß
                purchaseCancelled={purchaseCancelHandler}
                price={props.price}
                ingredients={props.ings} />
        )
    }

    return (
        <Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngridients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));