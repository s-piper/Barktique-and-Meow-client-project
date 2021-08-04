import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postConfirmations(action) {
    try {
        yield axios.post(
            '/api/mail/confirmation', action.payload.data);

    } catch (error) {
        console.log('Please check your postage on Mail Confirmation =>', error);
    }
}


function* postCompleted(action) {
    try {
        yield axios.post(
            '/api/mail/completed', action.payload.data);

    } catch (error) {
        console.log('Please check your postage on Mail Completed =>', error);
    }
}

function* mailerWatcherSaga() {

    yield takeLatest('POST_CONFIRMATION_EMAIL', postConfirmations);
    yield takeLatest('POST_COMPLETED_EMAIL', postCompleted);
}

export default mailerWatcherSaga;