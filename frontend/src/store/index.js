import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import projectReducer from './project';
import charityReducer from './charity';
import purchaseReducer from './purchase';
import watchlistReducer from "./watchlist";

const rootReducer = combineReducers({
  session: sessionReducer,
  project: projectReducer,
  charity: charityReducer,
  purchase: purchaseReducer,
  watchlist: watchlistReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
