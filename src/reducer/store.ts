import { AnyAction, applyMiddleware, combineReducers, createStore, Dispatch, Middleware, Store } from "redux";
import { commonReducer } from "./common/index";
import { IStore } from "../utils/types/index";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { createLogger } from "redux-logger";
import { rootSaga } from "../saga";

export const appReducer = combineReducers({
  common: commonReducer
});
const rootReducer = (state: IStore | undefined, action: any) => {
  return appReducer(state, action);
};

const sagaMiddleWare: SagaMiddleware<{}> = createSagaMiddleware();
const middleWare: Middleware[] = [sagaMiddleWare];

const logger: Middleware = createLogger();
middleWare.push(logger);

const store: Store<IStore, AnyAction> & {
  dispatch: Dispatch<any>;
} = createStore(rootReducer, applyMiddleware(...middleWare));

sagaMiddleWare.run(rootSaga);


export {store}