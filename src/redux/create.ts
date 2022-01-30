import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./modules/reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./modules/rootSaga";
import { routerMiddleware } from "connected-react-router";
import history from "../history";
import TokenService from "./services/TokenService";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const create = () => {
  const token = TokenService.get();

  const store = createStore(
    reducer(history),

    {
      auth: {
        token,
        loading: false,
        error: null,
      },
    },
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  );

  //사가 미들웨어는 store를 리턴하기 전에 footSaga를 run 시켜줘야 한다.

  sagaMiddleware.run(rootSaga);

  return store;
};

export default create;
