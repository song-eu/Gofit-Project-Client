// import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { Provider } from 'react-redux'; // 리액트 컴포넌트들의 리덕스 스테이트를 제공해줌
import reducer from './reducers';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const sagaMiddleware = createSagaMiddleware();

const enhancer =
	process.env.NODE_ENV === 'production'
		? compose(applyMiddleware(sagaMiddleware)) // production 모드 일때는 리덕스데브 노출안함
		: compose(
				// production 모드가 아닐때 리덕스데브툴 노출
				applyMiddleware(sagaMiddleware),
				typeof window !== 'undefined' &&
					window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
					? window.__REDUX_DEVTOOLS_EXTENSION__()
					: (f) => f
		  );

const store = createStore(
	reducer,
	enhancer
	// reducer ? action이 디스패치될때 스테이트를 어떻게 바꿔야할지 정의해두것
	// state + reducer => store
);
console.log('store.getState:', store.getState());

ReactDOM.render(
	// 자식 컴포넌트들이 리덕스 스테이트에 접근 가능해진다
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.querySelector('#root')
);

sagaMiddleware.run(rootSaga);
