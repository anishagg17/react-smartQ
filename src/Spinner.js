import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner= () => {
    return(
        <div style={{position:"absolute",  margin : "380px", left:"300px", }}>
          <Loader type="ThreeDots" color="rgb(128, 224, 18)"
             height={80} width={80} />
        </div>
      );
}

export default Spinner;