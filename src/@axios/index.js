import Axios from "axios";

const axios = Axios.create({
    responseType: "json"
});

axios.interceptors.response.use(function (res) {
    return res.data;
})

export default axios;