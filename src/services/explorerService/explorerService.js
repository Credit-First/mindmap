import axios from '@axios';
import { Emitter } from 'services/Emitter';

class explorerService extends Emitter {

    init() {
        this.setInterceptors();
    }

    setInterceptors = () => {
        axios.interceptors.request.use(
            (config) => {
                config.headers['Authorization'] = 'Bearer ' + this.getAccessToken();
                console.log(config)
                return config;
            }, (error) => {
                console.log("Failed");
                return Promise.reject(error);
            });

        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            console.log(err)
            if (err.response?.status === 401 && err.config && !err.config.__isRetryRequest) {
                // if you ever get an unauthorized response, logout the user
                this.emit("onAutoLogout", "Invalid access_token");

                this.setSession(null);
            }
        });
    };


    getFolder = () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/v1/folders', {
            }).then(response => {
                if (response.data) {
                    resolve(response.data);
                }
                else {
                    reject(response.data.error);
                }
            });
        });
    };

    getMap = (folderTitle) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/v1/mind_maps', {
                data: {
                    folderTitle,
                }
            }).then(response => {
                if (response.data) {
                    resolve(response.data);
                }
                else {
                    reject(response.data.error);
                }
            });
        });
    };

    deleteFolder = (folderId) => {
        return new Promise((resolve, reject) => {
            axios.delete('/api/v1/mind_maps/' + folderId)
            .then(response => {
                if (response.status == 'success') {
                    resolve();
                }
                else {
                    reject(response.message);
                }
            });
        });
    };
    createFolder = (name, description, user_id, parent_folder_id) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/v1/folders', {
                name,
                description,
                user_id,
                parent_folder_id
            }).then(response => {
                if (response.data) {
                    resolve(response.data);
                }
                else {
                    reject(response.data.error);
                }
            });
        });
    };
    deleteFolder = (folderId) => {
        return new Promise((resolve, reject) => {
            axios.delete('/api/v1/folders/' + folderId)
                .then(response => {
                    if (response.data.status == 'success') {
                        resolve();
                    }
                    else {
                        reject(response.message);
                    }
                });
        });
    };
    deleteMap = (mapId) => {
        return new Promise((resolve, reject) => {
            axios.delete('/api/v1/mind_maps/' + mapId)
                .then(response => {
                    if (response.data.status == 'success') {
                        resolve();
                    }
                    else {
                        reject(response.message);
                    }
                });
        });
    };
    updateMap = ({ id, name, map, user_id, folder_id }) => {
        return new Promise((resolve, reject) => {
            axios.put('/api/v1/mind_maps/' + id, {
                id,
                name,
                map,
                user_id,
                folder_id
            }).then(response => {
                if (response.data) {
                    resolve(response.data);
                }
                else {
                    reject(response.data.error);
                }
            });
        });
    };
    createMap = ({ name, map, user_id, folder_id }) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/v1/mind_maps', {
                name,
                map,
                user_id,
                folder_id
            }).then(response => {
                if (response.data) {
                    resolve(response.data);
                }
                else {
                    reject(response.data.error);
                }
            });
        });
    };
    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new explorerService();

export default instance;
