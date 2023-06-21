import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "../services/auth";
import authReducer from "../features/login/loginSlice";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reverseApi } from "../services/geo";

const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	[reverseApi.reducerPath]: reverseApi.reducer,
	auth: authReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
			.concat(api.middleware)
			.concat(reverseApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
