import React, { Fragment, useState, useEffect } from 'react'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);


        //BECAUSE WE WANT TO EXECUTE THIS BEFORE OUR JSX EXECUTES, WE JUST REMOVE componentWillUnmount
        // componentWillMount() {
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
        const resInterceptors = axios.interceptors.response.use(res => res, error => {
            setError(error)
            return
        });
        // };


        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptors);
            }
        }, [reqInterceptor, resInterceptors])
        //WE CAN USE THE CLEANUP FUNCTION OF useEffect for componentWillUnmount
        // componentWillUnmount() {
        //     axios.interceptors.request.eject(this.reqInterceptor);
        //     axios.interceptors.response.eject(this.resInterceptors);
        // }

        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <Fragment>
                <Modal
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    }

}

export default withErrorHandler;