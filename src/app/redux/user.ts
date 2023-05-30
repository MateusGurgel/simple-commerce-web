import User from "../interfaces/User";
import { Dispatch } from "react";
import { useSelector } from "react-redux";
import { api } from "../api";

const REGISTER_USER_REQUEST = "user/REGISTER_USER_REQUEST";
const REGISTER_USER_SUCCESS = "user/REGISTER_USER_SUCCESS";
const REGISTER_USER_FAILURE = "user/REGISTER_USER_FAILURE";

const LOGIN_USER_REQUEST = "user/LOGIN_USER_REQUEST";
const LOGIN_USER_SUCCESS = "user/LOGIN_USER_SUCCESS";
const LOGIN_USER_FAILURE = "user/LOGIN_USER_FAILURE";

const USER_LOGOUT = "user/LOGOUT";

//register action types

interface UserRegisterRequestAction {
  type: typeof REGISTER_USER_REQUEST;
}

interface UserRegisterSuccessAction {
  type: typeof REGISTER_USER_SUCCESS;
  payload: User;
}

interface UserRegisterFailureAction {
  type: typeof REGISTER_USER_FAILURE;
  error: string;
}

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

interface UserLogoutAction {
  type: typeof USER_LOGOUT;
}

type UserActionTypes =
  | UserRegisterRequestAction
  | UserRegisterSuccessAction
  | UserRegisterFailureAction
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginFailureAction
  | UserLogoutAction;

//Register Action creators

export const RegisterUserRequest = (): UserRegisterRequestAction => ({
  type: REGISTER_USER_REQUEST,
});

export const RegisterUserSuccess = (user: User): UserRegisterSuccessAction => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

export const RegisterUserFailure = (
  error: string
): UserRegisterFailureAction => ({
  type: REGISTER_USER_FAILURE,
  error,
});
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

export const SingOutUser = (): UserLogoutAction => ({
  type: USER_LOGOUT,
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

//RegisterUser Async Thunk

export const register = (name: string, email: string, password: string) => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch(RegisterUserRequest());

    const body = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await api.post("/users", body);
      const user = response.data;
      dispatch(RegisterUserSuccess(user));
    } catch (error: any) {
      if (!error.response) {
        dispatch(RegisterUserFailure("Try again later"));
      }

      const userErrorMessage = error.response.data.errors[0].message;
      dispatch(RegisterUserFailure(userErrorMessage));
    }
  };
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
      if (!error.response) {
        dispatch(LoginUserFailure("Try again later"));
      }

      const userErrorMessage = error.response.data.errors[0].message;
      dispatch(LoginUserFailure(userErrorMessage));
    }
  };
};

// Reducer
const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    return {
        ...state,
        isLoading: true,
        error: null,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
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
  const userState = useSelector((state: UserStateSelector) => state);
  return userState.user;
}

export default userReducer;
