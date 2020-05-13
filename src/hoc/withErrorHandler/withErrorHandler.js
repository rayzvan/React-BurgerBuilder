import React, { Fragment, Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'


//This takes a WrappedComponent as input and returns a function which recieves props
//!!! IT IS WITH LOWER CASE BECAUSE WE ARE NOT GOING TO USE IT IN JSX
//We are GOING TO WRAP THE BURGER BUILDER WITH THIS
//WE CHANGED IT TO BASE CLASS BECAUSE WE NEED STATE
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        // This will only be called once componentDidMount was called in the <WrappedCOmponent {..this.props}/>
        //This idea is to execute this code when the component is getting created
        //This method is obsoliie but you can put it in the constroctor then
        componentWillMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            });
            //This worked gread for POST requests in the componentDidMount
            //This is the scenario where the link is broken 
            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
                return 
            });
        };

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
}

export default withErrorHandler;