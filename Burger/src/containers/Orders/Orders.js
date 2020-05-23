import React, { Component } from 'react'
import Order from '../../components/Oreder/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    //we use redux instead
    // state = {
    //     orders: [],
    //     loading: true
    // }
    //We use componentDidMount because we only want to fetch the orders when this page is loaded
    componentDidMount() {
        //WE MOVED THIS INTO ORDER ACTIONS
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchedOrders = [];
        //         for (let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({ loading: false, orders: fetchedOrders })
        //     }).catch(err => {
        //         this.setState({ loading: false })
        //     })
        this.props.onFetchOrders(this.props.token, this.props.userId);//TODO After implmenting commit #55, the Orers page does not work if there is no order, FIX THIS
    }

    render() {

        let orders = <Spinner/>
        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price} /* We use + to make it from a strin, a number */ />
                )
            )
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));//now for a 404 for example the error popup will appear