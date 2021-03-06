import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OderdSummarry/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
    // constructor(props){
    //     super (props);
    //     this.state = {...}
    // } the below method is a bit more modern because it's shorter syntax
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchesState(ingredients) {
        const sum = Object.keys(ingredients)//YOU CAN NOT PASS ANYTHING AND JUST USE THE this.props.ings
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0)

        return sum > 0;
    }

    // This Will not work correctly, at leas if we want to use the "this." keyword if the method is triggered trough an event
    // do to the way the "this" keyword works in Javascript, it will then not refer to the class
    // that's why we need the arrow functions, which in the end are still methods, but internally, they take advantage of arrow functions which basically
    //  contain the state of the context of "this" 
    // purchaseHandler(){
    //     this.setState)_
    // }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true });
        }else{
            this.props.onSetRedirectPath('/checkoutSummary')
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();

        //WE ARE NOT USING THIS ANYMORE BECAUSE WE CAN USE REDUX TO MANAGE TO GET THE STATE IN THE CHECKOUTSUMMARY
        // const queryParams = [];
        // for (let i in this.props.ings) {
        //     //EncodeURIComponent encodes my elements in such a way it can be used in the URL
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price=' + this.props.price)
        // const queryString = queryParams.join('&');
        this.props.history.push('/checkoutSummary'
            // {pathname: '/checkoutSummary',
            // search: queryString}
        )
    }

    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        //We do this because when we open the app, the ingredients is null unti data is fetched from the server so an exception will be trhown
        if (this.props.ings) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        addIngredient={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchesState(this.props.ings)}
                        order={this.purchaseHandler}
                        isAuthenticated={this.props.isAuthenticated}
                        price={this.props.price} />
                </Fragment>
            )

            orderSummary = (
                <OrderSummary
                    purchaseContinue={this.purchaseContinueHandler}
                    purchaseCancelled={this.purchaseCancelHandler}
                    price={this.props.price}
                    ingredients={this.props.ings} />
            )
        }

        //THIS IS NOT REQUIRED HERE ANYMORE BECAUSE WE ARE NOT DOING ANYTHING ASYNCHRONOUS WHEN VIEWING THE ORDER SUMMARY
        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));