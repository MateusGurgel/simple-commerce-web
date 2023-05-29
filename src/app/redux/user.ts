import { Dispatch } from "react";
import User from "../interfaces/User";
import { api } from "../api";
import { error } from "console";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";

const LOGIN_USER_REQUEST = "user/LOGIN_USER_REQUEST";
const LOGIN_USER_SUCCESS = "user/LOGIN_USER_SUCCESS";
const LOGIN_USER_FAILURE = "user/LOGIN_USER_FAILURE";
const USER_LOGOUT = "user/LOGOUT";

//login action types
interface UserLoginRequestAction {
  type: typeof LOGIN_USER_REQUEST;
}

interface UserLoginSuccessAction {
  type: typeof LOGIN_USER_SUCCESS;
  payload: User;
}

interface UserLoginFailureAction {
  type: typeof LOGIN_USER_FAILURE;
  error: string;
}

interface UserLogoutFailureAction {
  type: typeof USER_LOGOUT;
}

type UserActionTypes =
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginFailureAction
  | UserLogoutFailureAction;

//Login Action creators

export const LoginUserRequest = (): UserLoginRequestAction => ({
  type: LOGIN_USER_REQUEST,
});

export const LoginUserSuccess = (user: User): UserLoginSuccessAction => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const LoginUserFailure = (error: string): UserLoginFailureAction => ({
  type: LOGIN_USER_FAILURE,
  error,
});

// State type
interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

//LoginUser Async Thunk

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch(LoginUserRequest());

    const body = {
      email: email,
      password: password,
    };

    try {
      const response = await api.post("/users/auth", body);
      const user = response.data;
      dispatch(LoginUserSuccess(user));
    } catch (error: any) {
      dispatch(LoginUserFailure(error.response?.data));
    }
  };
};

// Reducer
const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

interface UserStateSelector {
  user: UserState;
}

export function useUserState() {
  const cartState = useSelector((state: UserStateSelector) => state);
  return cartState.user;
}

export default userReducer;
