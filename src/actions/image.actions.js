import axios from 'axios';

import { imageConstants } from 'constants';

export const getImages = () => async (dispatch) => {
  try {
    dispatch({ type: imageConstants.GET_IMAGE_REQUEST });

    const URL = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_URL_ENDPOINT_IMAGES}`;

    const res = await axios.get(URL);

    dispatch({ type: imageConstants.GET_IMAGE_SUCCESS, payload: res.data });
    // console.log(res.data);
    //   TODO : SHOW SUCCESS MESSAGE
  } catch (e) {
    dispatch({
      type: imageConstants.GET_IMAGE_FAILED,
      payload: 'Failed to get images ! ' + e.message,
    });

    // TODO : SHOW ERROR MESSAGE
  }
};
