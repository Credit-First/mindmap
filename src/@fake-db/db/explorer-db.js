import mock from '../mock';
import _ from '@lodash';
import { get } from 'lodash';

function generateGUID() {
    function S4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return S4() + S4();
}

let explorerFolder = {
    title: 'All',
    dir: [
        {
            title: 'MyFolder',
            dir: [
                {
                    title: 'MyFolder1',
                    dir: [
                        {
                            title: 'MyFolder3',
                            dir: []
                        }
                    ]
                },
                {
                    title: 'MyFolder2',
                    dir: []
                },
            ]
        },
        {
            title: 'OtherFolder',
            dir: []
        }
    ]
};

let explorerMap = [
    {
        folderTitle: '',
        title: 'New Mind Map',
        duration: 5,
        img: '/assets/photo/background1.png',
        members: 10,
        modified: '2022-01-20'
    },
    {
        folderTitle: 'MyFolder',
        title: 'First Mind Map',
        duration: 5,
        img: '/assets/photo/background2.png',
        members: 10,
        modified: '2022-01-20'
    },
    {
        folderTitle: 'MyFolder',
        title: 'Second Mind Map',
        duration: 3,
        img: '/assets/photo/background3.png',
        members: 10,
        modified: '2022-01-20'
    },
    {
        folderTitle: 'MyFolder',
        title: 'Third Mind Map',
        duration: 6,
        img: '/assets/photo/background4.png',
        members: 10,
        modified: '2022-01-20'
    },
    {
        folderTitle: 'MyFolder',
        title: 'Fourth Mind Map',
        duration: 2,
        img: '/assets/photo/background5.png',
        members: 10,
        modified: '2022-01-20'
    },
    {
        folderTitle: 'OtherFolder',
        title: 'Fifth Mind Map',
        duration: 5,
        img: '/assets/photo/background6.png',
        members: 10,
        modified: '2022-01-20'
    },
    {
        folderTitle: 'OtherFolder',
        title: 'Sixth Mind Map',
        duration: 5,
        img: '/assets/photo/background.png',
        members: 10,
        modified: '2022-01-20'
    },
    {
        folderTitle: 'All',
        title: 'Fifth Mind Map',
        duration: 5,
        img: '/assets/photo/background4.png',
        members: 10,
        modified: '2022-01-20'
    },
    {
        folderTitle: 'All',
        title: 'Sixth Mind Map',
        duration: 5,
        img: '/assets/photo/background2.png',
        members: 10,
        modified: '2022-01-20'
    }
];

mock.onGet('/api/explorer/folder').reply((config) => {
    const data = JSON.parse(config.data);
    const { title, type } = data;
    let currentfolder = {};

    function searchFolder(_folder, _title) {
        for (let i = 0; i < _folder.dir.length; i++) {
            let folder = _folder.dir[i];
            if (folder.title == _title) return folder;
            if (folder.dir) {
                let child_folder = searchFolder(folder, _title);
                if (child_folder) return child_folder;
            }
        }
    }

    function previousFolder(_folder, _title) {
        let folder = _folder;
        for (let i = 0; i < folder.dir.length; i++) {
            let item = folder.dir[i];
            if (item.title == _title) return folder;
            if (item.dir) {
                let child_folder = previousFolder(item, _title);
                if (child_folder) return child_folder;
            }
        }
    }
    if (!title) {
        currentfolder = _.cloneDeep(explorerFolder)
    } else if (type === 'BACK') {
        currentfolder = _.cloneDeep(previousFolder(explorerFolder, title));
    } else {
        currentfolder = _.cloneDeep(searchFolder(explorerFolder, title));
    }

    const response = {
        folder: currentfolder
    };

    return [200, response];
    // return [200, { error }];
});

mock.onGet('/api/explorer/mapList').reply((config) => {
    const data = JSON.parse(config.data);
    const { folderTitle } = data;
    let mapList = [];

    function getMapList(_mapList, _folderTitle) {
        return _mapList.filter((map) => {
            return map.folderTitle === _folderTitle;
        })
    }

    if ( !folderTitle || folderTitle === 'All') {
        mapList = explorerMap.filter(item => item.folderTitle === 'All')
    } else {
        mapList = _.cloneDeep(getMapList(explorerMap, folderTitle));
    }

    const response = {
        mapList
    };

    return [200, response];
    // return [200, { error }];
});
mock.onPost('/api/explorer/updateMap').reply((config) => {
    const data = JSON.parse(config.data);
    let { mapTitle, folderTitle, currentFolderTitle, moveType } = data;
    let mapList = [];
    
    function previousFolder(_folder, _title) {
        let folder = _folder;
        for (let i = 0; i < folder.dir.length; i++) {
            let item = folder.dir[i];
            if (item.title == _title) return folder;
            if (item.dir) {
                let child_folder = previousFolder(item, _title);
                if (child_folder) return child_folder;
            }
        }
    }

    if( moveType === 'BACK' ) {
        let pFolder = _.cloneDeep(previousFolder(explorerFolder, currentFolderTitle));
        folderTitle = pFolder.title;
        console.log(pFolder)
    }
    explorerMap = explorerMap.map((_map) => {
        let map = _map
        if (_map.title === mapTitle) {
            map.folderTitle = folderTitle;
            return _.merge(_map, map);
        }
        return _map
    });

    function getMapList(_mapList, _folderTitle) {
        return _mapList.filter((map) => {
            return map.folderTitle === _folderTitle;
        })
    }

    if (currentFolderTitle) {
        mapList = _.cloneDeep(getMapList(explorerMap, currentFolderTitle));
    }

    const response = {
        mapList
    };

    return [200, response];
    // return [200, { error }];
});
mock.onPost('/api/explorer/createFolder').reply((config) => {
    const data = JSON.parse(config.data);
    let { createTitle, currentFolderTitle } = data;
    let currentfolder = {};
    createTitle = createTitle + _.random(1,10);

    function searchFolder(_folder, _title) {
        if (_folder.title == _title) return _folder;
        for (let i = 0; i < _folder.dir.length; i++) {
            let folder = _folder.dir[i];
            if (folder.dir) {
                let child_folder = searchFolder(folder, _title);
                if (child_folder) return child_folder;
            }
        }
    }

    currentfolder = searchFolder(explorerFolder, currentFolderTitle);
    
    currentfolder.dir.push({
        title: createTitle,
        dir: []
    })
    const response = {
        folder: currentfolder
    };

    return [200, response];
});