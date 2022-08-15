import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3'
});

instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;