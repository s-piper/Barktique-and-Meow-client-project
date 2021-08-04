import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postConfirmations (action) {


}


function* postCompleted (action) {


}

function* mailerWatcherSaga () {

    yield takeLatest('POST_CONFIRMATION_EMAIL', postConfirmations );
    yield takeLatest('POST_COMPLETED_EMAIL', postCompleted);
}

export default mailerWatcherSaga;