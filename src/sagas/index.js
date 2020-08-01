import { all, call, fork } from 'redux-saga/effects';

import user from './user';
import video from './video';
import daylog from './daylog';
import calendar from './calendar';
import ranking from './ranking';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:7777/api';

export default function* rootSaga() {
	yield all([
		fork(calendar),
		fork(video),
		fork(user),
		fork(daylog),
		fork(ranking),
	]);
}

// export default function* rootSaga() {
//   yield all([call(user), call(video), call(dayLog), call(calendar)]);
// }
