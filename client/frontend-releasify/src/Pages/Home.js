import React from 'react';
import axios from 'axios';

function Home() {


  const buttonClicked = () => {
    axios.post( 'http://localhost:5001/api/users/testing', {}).then((response) => {
      console.log(response);
    })
  }

  return(
    <div>
      <div>
        it's the Releasify Homepage!
      </div>

      <button onClick={buttonClicked}>CLICK HERE</button>
    </div>
  )
}

export default Home;