import { combineReducers } from 'redux';

// Reducer
import { imageReducer } from 'reducers/image.reducers';

const appReducer = combineReducers({
  // Store reducer here to combine it into tree state
  imageReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
