import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import {
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  props,
  on,
  createSelector,
  createFeatureSelector,
} from "@ngrx/store";

import { User, UsersState } from "../../_shared/models/user";

const key = "users";
const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: UsersState = usersAdapter.getInitialState({
  users: [],
  isLoading: false,
});

const selectUsersFeature = createFeatureSelector<UsersState>(key);

export const getUsers = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.users
);

export const getLoadingStatus = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.isLoading
);

export const UsersActions = createActionGroup({
  source: key,
  events: {
    Init: emptyProps(),
    "Get Users": emptyProps(),
    "Initialize Users": props<{ users: User[] }>(),
    "Begin Update": props<{ user: User }>(),
    "Complete Update": props<{ user: User }>(),
  },
});

export const UsersReducer = createFeature({
  name: key,
  reducer: createReducer(
    initialState,

    on(UsersActions.beginUpdate, (state, action) => ({
      ...state,
      isLoading: true,
    })),

    on(UsersActions.completeUpdate, (state, action) => ({
      ...state,
      users: state.users.map((user: User) =>
        action.user.id === user.id ? { ...action.user } : user
      ),
      isLoading: false,
    })),

    on(UsersActions.initializeUsers, (state, action) => ({
      ...state,
      users: [...action.users],
    }))
  ),
});
