import {call, put} from "redux-saga/effects";
import {deleteCurrentUserSucceeded} from "../../actions/users";
import {deleteUser} from "../routes/users";

export function* onDeleteCurrentUser(action) {
    try {
        yield call(deleteUser, action.userId);
        yield put(deleteCurrentUserSucceeded());
    } catch (error) {
        console.log(error);
    }
}