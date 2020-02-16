import React from 'react';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import PropTypes from 'prop-types';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'draft-js/dist/Draft.css';
import 'draft-js-hashtag-plugin/lib/plugin.css';

import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';
import { LOAD_USER_REQUEST } from '../reducers/user';

config.autoAddCss = false;

const HeumBird = ({ Component, store, pageProps }) => {
  const state = store.getState();

  return (
    <Provider store={store}>
      <Head>
        <title>흠버드</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="흠흠이의 NodeBird SNS" />
        <meta name="og:title" content="HeumBird" />
        <meta name="og:description" content="흠흠이의 NodeBird SNS" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="http://localhost:3000/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.12.0/css/svg-with-js.css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap"
          rel="stylesheet"
        />
      </Head>
      {state.user.me ? (
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
};

HeumBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// SSR (서버사이드렌더링)
HeumBird.getInitialProps = async context => {
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  if (ctx.isServer) {
    axios.defaults.headers.Cookie = '';
  }
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  // 리덕스사가 호출 순서에 따라 달라짐
  if (!state.user.me) {
    // 먼저 실행
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  if (Component.getInitialProps) {
    // 다음에 실행
    pageProps = (await Component.getInitialProps(ctx)) || {};
  }
  return { pageProps };
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const composeEnhancers =
    process.env.NODE_ENV === 'production'
      ? compose
      : (!options.isServer && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose;
  // redux의 기능들을 향상, 그냥 외워라..
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(HeumBird));
