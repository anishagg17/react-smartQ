import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner= () => {
    return(
        <div style={{position:"absolute",  margin : "380px", left:"300px", }}>
          <Loader type="ThreeDots" color=" #55c57a"
             height={80} width={80} />
        </div>
      );
}

export default Spinner;