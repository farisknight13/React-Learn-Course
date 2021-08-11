import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
// import { persistStore, persistCombineReducers } from "redux-persist";
// import createSensitiveStorage from "redux-persist-sensitive-storage";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

//integrate redux thunk
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers/index";

// const storage = createSensitiveStorage({
//     keychainService: "myKeychain",
//     sharedPreferencesName: "mySharedPrefs"
//   });

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
