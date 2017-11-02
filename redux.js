function asyncRequest() {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve(Math.ceil(Math.random() * 10));
      } else {
        reject(new Error('something wrong'));
      }
    }, Math.random * 600 + 100);
  });
}
const express = require('express');
const server = express();
//redux
const Redux = require('redux');
const { createStore, applyMiddleware } = Redux;

const createSagaMiddleware = require('redux-saga').default;
const { call, put, takeEvery, takeLatest } = require('redux-saga/effects');

//step1->action type consts
const INCREMENT = 'INCREMENT';
const ASYNC_INCREMENT = 'ASYNC_INCREMENT';

//step2->action
const increment = () => ({ type: INCREMENT });
const asyncIncrement = () => ({ type: ASYNC_INCREMENT });

//step3->saga

function* asyncIncrementFlow() {
  try {
    yield put({ type: `${ASYNC_INCREMENT}_START` });
    const num = yield call(asyncRequest);
    yield put({ type: `${ASYNC_INCREMENT}_SUCCESS`, payload: num });
  } catch (error) {
    console.log(error.message);
    yield put({ type: `${ASYNC_INCREMENT}_FAILED`, error });
  }
}


function* saga() {
  yield takeLatest(ASYNC_INCREMENT, asyncIncrementFlow);
}

//step4->reducer
const counterReducer = (state = 1, action) => {
  switch (action.type) {
    case INCREMENT:
      console.log(`${INCREMENT} action happened, preState is ${state}, next state is ${state + 1}`);
      return state + 1;

    case `${ASYNC_INCREMENT}_START`:
      console.log(`${INCREMENT}_START`);
      //request start handle
      return state;

    case `${ASYNC_INCREMENT}_SUCCESS`:
      console.log(`${INCREMENT}_SUCCESS action happened, preState is ${state}, next state is ${state + action.payload}`);
      //request success handle
      return state + action.payload;

    case `${ASYNC_INCREMENT}_FAILED`:
      console.log(`${ASYNC_INCREMENT}_FAILED, state is still`);
      //request fail handle
      return state;

    default:
      return state
  }
}

//store
const sagaMiddleware = createSagaMiddleware();
const store = createStore(counterReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

//view to trigger by action
store.dispatch(increment());
console.log('-------')
setInterval(() => {
  store.dispatch(asyncIncrement());
}, 5000);

server.listen(3000);