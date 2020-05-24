import { useState, useEffect } from 'react'

export default httpClient =>{

    const [error, setError] = useState(null);

    //BECAUSE WE WANT TO EXECUTE THIS BEFORE OUR JSX EXECUTES, WE JUST REMOVE componentWillUnmount
    // componentWillMount() {
    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    const resInterceptors = httpClient.interceptors.response.use(res => res, error => {
        setError(error)
        return
    });
    // };


    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptors);
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

    return [error, errorConfirmedHandler]
}