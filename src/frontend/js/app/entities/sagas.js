import { call, put, select } from 'redux-saga/effects';

export const loadListFactory = (actions, fetchList, jwt) =>
    function* loadList() {
        const state = yield select();
        const { error, list } = yield call(fetchList, jwt);

        if (error) {
            console.error({ error }); // eslint-disable-line no-console
            yield put(actions.failure(error));
        } else {
            yield put(actions.success(list));
        }
    };

export const loadItemFactory = (actions, fetchItem, jwt) =>
    function* loadItem({ payload }) {
        const state = yield select();
        const { error, item } = yield call(fetchItem, payload, jwt);

        if (error) {
            console.error({ error }); // eslint-disable-line no-console
            yield put(actions.failure(error));
        } else {
            yield put(actions.success(item));
        }
    };
