import {applyMiddleware, compose, createStore} from "redux";
import persistState from "redux-localstorage";
import {createLogger} from "redux-logger";
import createSagaMiddleware from 'redux-saga';
import thunk from "redux-thunk";
import rootSaga from "../api/sagas/index";
import {authRedirectMiddleware} from "../auth/index";
import rootReducer from "../reducers/index";

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

export default function configureStore() {
    const store = createStore(
        rootReducer,
        compose(
            persistState("auth"),
            applyMiddleware(
                logger,
                thunk,
                sagaMiddleware,
                authRedirectMiddleware,
            )
        )
    );
    sagaMiddleware.run(rootSaga);

    return store;
}