export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users }
});


export function getUsers() {
  return dispatch => {
    return fetch("https://api.github.com/search/users?q=tom")
      .then(res => res.json())
      .then(json => {
        dispatch(fetchUsersSuccess(json));
        return json;
      })
      .catch(error => {
        console.error('Error on homepage====>', error)
      })
  };
}
