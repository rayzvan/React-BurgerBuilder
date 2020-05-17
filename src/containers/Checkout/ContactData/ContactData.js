import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {

    //TODO Investigate how can we make a js functions wo we call for each objec to create does properties, si we don't have all that dupicated code
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {//TODO Make country a dropdown, he said we can use some third party libraries (i do not know if it is for the dropdown or for getting all the countrie)
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'emal',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastes' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();//To prevent the default which is to send a request which we do not want because it will reload our form
        //alert('You have continued!');
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            //!!!! **** This price needs to be calculated on the server so that the user cannot manipulate the price you are using ****!!!!!
            price: this.props.price,
        }

        //the .json is for firbase, this is to function correctly
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                this.props.history.push('/');

            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm //This is not a deep clone for the objects inside the orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });
    }

    render() {
        const formEelementsArray = [];
        for (let key in this.state.orderForm) {
            formEelementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form>
                {formEelementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;