import { all, call } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';

// axios.defaults.baseURL = `localhost:3000/api`;

export default function* rootSaga() {
  yield all([call(user)]);
}