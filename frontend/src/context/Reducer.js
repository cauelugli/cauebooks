const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "UPDATE_FAILURE":
      return {
        user: state.user,
        isFetching: false,
        error: true,
      };
    case "FAVORITE":
      state.user.favoritesList.push(action.payload);
      return {
        user: state.user,
        isFetching: false,
        error: false,
      };
    case "UNFAVORITE":
      const index = state.user.favoritesList.indexOf(action.payload);
      if (index > -1) {
        state.user.favoritesList.splice(index, 1);
      }
      return {
        user: state.user,
        isFetching: false,
        error: false,
      };
    case "LIKE":
      state.user.likesList.push(action.payload);
      return {
        user: state.user,
        isFetching: false,
        error: false,
      };
    case "UNLIKE":
      const index1 = state.user.likesList.indexOf(action.payload);
      if (index1 > -1) {
        state.user.likesList.splice(index1, 1);
      }
      return {
        user: state.user,
        isFetching: false,
        error: false,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default Reducer;
