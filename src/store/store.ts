import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';
import { createWrapper } from 'next-redux-wrapper';
import { api } from '@/services/star-wars';
import searchReducer, { searchSlice } from '@/store/searchSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  search: searchReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(
          nextReduxCookieMiddleware({
            subtrees: [
              `${searchSlice.name}.counter`,
              {
                subtree: `${searchSlice.name}.searchTerm`,
                cookieName: 'NEXT_SEARCH_TERM',
                serializationFunction: String,
                deserializationFunction: String,
                defaultState: searchSlice.getInitialState().searchTerm,
              },
            ],
          })
        )
        .concat(api.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

const makeStore = wrapMakeStore(() => setupStore());

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: true,
});
