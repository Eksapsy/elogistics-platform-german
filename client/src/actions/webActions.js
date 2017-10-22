export const toggleLoader = (loading = undefined) => async dispatch => {
  dispatch({
    type: TOGGLE_LOADER,
    loading
  })
};