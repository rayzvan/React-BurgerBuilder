import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postaclCode: ''
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

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mai" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
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