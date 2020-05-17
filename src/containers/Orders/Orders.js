import React, { Component } from 'react'
import Order from '../../components/Oreder/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    //We use componentDidMount because we only want to fetch the orders when this page is loaded
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders })
            }).catch(err => {
                this.setState({ loading: false })
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients} 
                        price={+order.price} /* We use + to make it from a strin, a number */ />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);//now for a 404 for example the error popup will appear