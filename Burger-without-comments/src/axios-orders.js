import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-6687a.firebaseio.com/'
});

export default instance;