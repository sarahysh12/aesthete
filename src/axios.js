import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sthete-3ff8d.firebaseio.com'
});

export default instance;