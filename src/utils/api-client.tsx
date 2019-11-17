import axios from 'axios';

function client(endpoint : any, {body, ...customConfig}: any = {}) {
    const token: string|null = window.localStorage.getItem('token');
    const headers: any = {'content-type': 'application/json'};
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    const config = {
        url: `${process.env.REACT_APP_API_URL}/${endpoint}`,
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };
    if (body) {
        config.data = body
    }


    return axios(config)
        .then(response => {
            return response.data;
        })
        .catch(error => console.log(error.message));
}

export default client;
