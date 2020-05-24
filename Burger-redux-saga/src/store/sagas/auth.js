import { put } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import * as actions from '..'

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put({
        type: actionTypes.LOGOUT
    });
}