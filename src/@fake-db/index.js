import mock from './mock';
import './db/auth-db';
import './db/explorer-db';

mock.onAny().passThrough();