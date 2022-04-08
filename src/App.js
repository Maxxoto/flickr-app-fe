import React, { useEffect } from 'react';

import * as actions from 'actions';
// Redux
import { connect, useSelector } from 'react-redux';

import Navbar from 'components/Navbar';
import Gallery from 'components/Gallery';

const App = (props) => {
  const imageData = useSelector((state) => {
    return state.imageReducer;
  });

  useEffect(() => {
    props.getImages();
    console.log(imageData);
  }, []);

  return (
    <>
      <Navbar />
      <Gallery imageData={imageData} limit={6} />
    </>
  );
};

export default connect(null, actions)(App);
