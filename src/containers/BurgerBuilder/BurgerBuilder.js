import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OderdSummarry/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENT_PRICES = {
    salad: 0.4,
    cheese: 0.9,
    bacon: 1.4,
    meat: 2.1
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super (props);
    //     this.state = {...}
    // } the below method is a bit more modern because it's shorter syntax
    state = {
        ingredients: null,
        price: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-burger-6687a.firebaseio.com/ingredients.json')
            .then(response => {
                console.log(response.data);
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                console.log("ON TEH BURGER BUILDER CATCH: "  + error);
                this.setState({ error: true });
            })
    }

    //TODO ask why not const? also try yourself
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.price;
        const updatedPrice = oldPrice + INGREDIENT_PRICES[type];

        this.setState({ ingredients: updatedIngredients, price: updatedPrice });
        this.updatePurchesState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.price;
        const updatedPrice = oldPrice - INGREDIENT_PRICES[type];

        this.setState({ ingredients: updatedIngredients, price: updatedPrice });
        this.updatePurchesState(updatedIngredients);//!!!!! We pass in the updated ingredients because when we get the ingredients from state in the updatePurchasState() method, they might not be updated!!!
    }

    updatePurchesState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0)

        this.setState({ purchasable: sum > 0 });
    }

    // This Will not work correctly, at leas if we want to use the "this." keyword if the method is triggered trough an event
    // do to the way the "this" keyword works in Javascript, it will then not refer to the class
    // that's why we need the arrow functions, which in the end are still methods, but internally, they take advantage of arrow functions which basically
    //  contain the state of the context of "this" 
    // purchaseHandler(){
    //     this.setState)_
    // }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        //alert('You have continued!');

        this.setState({ loading: true });

        const order = {
            ingredients: this.state.ingredients,
            //!!!! **** This price needs to be calculated on the server so that the user cannot manipulate the price you are using ****!!!!!
            price: this.state.price,
            customer: {
                name: 'Lavric Razvan',
                address: {
                    street: 'Test Street',
                    zipCode: '455300',
                    country: 'Germany'
                },
                email: 'tesst@gmail.com',
            },
            delivery: 'fastes'
        }

        // the .json is for firbase, this is to function correctly
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         console.log(response);
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false, purchasing: false });
        //         console.log(error);
        //     });

        this.props.history.push({pathname:'/checkoutSummary'})
        
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        //We do this because when we open the app, the ingredients is null unti data is fetched from the server so an exception will be trhown
        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addIngredient={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        order={this.purchaseHandler}
                        price={this.state.price} />
                </Fragment>
            )

            orderSummary = (
                <OrderSummary
                    purchaseContinue={this.purchaseContinueHandler}
                    purchaseCancelled={this.purchaseCancelHandler}
                    price={this.state.price}
                    ingredients={this.state.ingredients} />
            )
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

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

export default withErrorHandler(BurgerBuilder, axios);