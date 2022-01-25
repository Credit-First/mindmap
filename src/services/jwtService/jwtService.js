import axios from 'axios';
import jwtDecode from 'jwt-decode';

class Emitter {
    _events = {};
    on(event_name, callback) {
        if (!this._events[event_name]) this._events[event_name] = [];
        this._events[event_name].push(callback);
    }
    off(event_name, callback) {
        const events = this._events[event_name] || [];
        const index = events.indexOf(callback);
        events.splice(index, 1);
    }
    emit(event_name, data) {
        const events = this._events[event_name] || [];
        events.forEach(event => {
            event(data);
        });
    }
}

class jwtService extends Emitter {

    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                    // if you ever get an unauthorized response, logout the user
                    this.emit("onAutoLogout", "Invalid access_token");

                    this.setSession(null);
                }
                throw err;
            });
        });
    };

    handleAuthentication = () => {

        let access_token = this.getAccessToken();

        // if (!access_token) {
        //     return;
        // }
        if (this.isAuthTokenValid(access_token)) {
            this.setSession(access_token);
            this.emit("onAutoLogin", true);
        }
        else {
            this.setSession(null);
            this.emit("onAutoLogout", 'access_token expired');
        }
    };

    createUser = (data) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/auth/register', data)
                .then(response => {
                    if ( response.data.user )
                    {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    }
                    else
                    {
                        reject(response.data.error);
                    }
                });
        });
    };

    signInWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/auth', {
                data: {
                    email,
                    password
                }
            }).then(response => {
                if ( response.data.user )
                {
                    this.setSession(response.data.access_token);
                    resolve(response.data.user);
                }
                else
                {
                    reject(response.data.error);
                }
            });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            // setTimeout(() => {
            //     this.setSession("sdfsdfdsfdsfsdfsdf");
            //     resolve({
            //         username: 'ODC'
            //     });
            // }, 2000)
            axios.get('/api/auth/access-token', {
                data: {
                    access_token: this.getAccessToken()
                }
            }).then(response => {
                if (response.data.user) {
                    this.setSession(response.data.access_token);
                    resolve(response.data.user);
                }
                else {
                    reject(response.error);
                }
            });
        });
    };

    // updateUserData = (user) => {
    //     return axios.post('/api/auth/user/update', {
    //         user: user
    //     });
    // };

    setSession = access_token => {
        if (access_token) {
            localStorage.setItem('jwt_access_token', access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        }
        else {
            localStorage.removeItem('jwt_access_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = access_token => {
        if (!access_token) {
            return false;
        }
        try {
            return true;

            const decoded = jwtDecode(access_token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                console.warn('access token expired');
                return false;
            }
            else {
                return true;
            }
        } catch (e) {
            return false;
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new jwtService();

export default instance;
