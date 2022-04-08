import { imageConstants } from 'constants';

const initialState = [];

export const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case imageConstants.GET_IMAGE_REQUEST:
      return {
        isLoading: true,
        payload: false,
      };
    case imageConstants.GET_IMAGE_SUCCESS:
      return {
        isLoading: false,
        payload: action.payload,
      };
    case imageConstants.GET_IMAGE_FAILED:
      return {
        isLoading: false,
        payload: false,
      };

    default:
      return state;
  }
};
