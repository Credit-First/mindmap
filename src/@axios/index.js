import Axios from "axios";

const axios = Axios.create({
    responseType: "json",
    // baseURL: 'http://34.129.223.170:3000',
    baseURL: 'http://34.129.68.252:2083',
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
});

axios.interceptors.response.use(function (res) {
    return res;
})

export default axios;