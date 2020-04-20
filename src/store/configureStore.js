import { createStore, combineReducers } from "redux";
import user from './reducer/user'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const rootReducer = combineReducers({
    user: user,
});


// const configureStore = () => {
//     return createStore(rootReducer);
// }


const persistConfig = {
    key: 'root',
    storage : storage ,
    blacklist: [] 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


//export default configureStore;

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}