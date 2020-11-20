import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgur-bildur.firebaseio.com/'
})

export default instance;