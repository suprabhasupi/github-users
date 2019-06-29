import {
  FETCH_USERS_SUCCESS
} from '../actions/home';

const initialState = {
  users: []
};

export default function homepageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        uers: action.payload
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}