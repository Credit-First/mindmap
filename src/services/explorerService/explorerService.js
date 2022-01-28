import axios from 'axios';
import { Emitter } from 'services/Emitter';

class explorerService extends Emitter {

    init() {
        this.setInterceptors();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            if (err.response?.status === 401 && err.config && !err.config.__isRetryRequest) {
                this.setSession(null);
            }
        });
    };

    getFolder = (title, type) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/explorer/folder', {
                data: {
                    title,
                    type
                }
            }).then(response => {
                if ( response.data.folder )
                {
                    resolve(response.data.folder);
                }
                else
                {
                    reject(response.data.error);
                }
            });
        });
    };

    getMap = (folderTitle) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/explorer/mapList', {
                data: {
                    folderTitle,
                }
            }).then(response => {
                if ( response.data.mapList )
                {
                    resolve(response.data.mapList);
                }
                else
                {
                    reject(response.data.error);
                }
            });
        });
    };

    createFolder = (createTitle, currentFolderTitle) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/explorer/createFolder', {
                createTitle,
                currentFolderTitle, 
            }).then(response => {
                if ( response.data.folder )
                {
                    resolve(response.data.folder);
                }
                else
                {
                    reject(response.data.error);
                }
            });
        });
    };

    updateMap = (mapTitle, folderTitle, currentFolderTitle, moveType) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/explorer/updateMap', {
                mapTitle,
                folderTitle,
                currentFolderTitle, 
                moveType
            }).then(response => {
                if ( response.data.mapList )
                {
                    resolve(response.data.mapList);
                }
                else
                {
                    reject(response.data.error);
                }
            });
        });
    };

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
}

const instance = new explorerService();

export default instance;
