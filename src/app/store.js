import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from '../features/todoList/TodoListSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todoList: todoListReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['todoList']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

const persistor = persistStore(store);

export { store, persistor };
