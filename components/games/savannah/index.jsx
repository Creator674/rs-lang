import React from "react";
import "./savannah.less"

const Savannah = (props) => {
    return (
      <div className="wrapper">
       <div className="savannah-main">
          <div className="lifes">
            <img src="../images/heart.png" alt="Your lifes"/>
            <img src="../images/heart.png" alt="Your lifes"/>
            <img src="../images/heart.png" alt="Your lifes"/>
            <img src="../images/heart.png" alt="Your lifes"/>
            <img src="../images/heart.png" alt="Your lifes"/>
          </div>
         
            {/* тут компонент CloseButton */}
    
          <div className="fallingWord">
            <span>Falling Word</span>
          </div>

          <div className="listOfWords">
            <ul>
              <li>First Word</li>
              <li>Second Word</li>
              <li>Third Word</li>
              <li>Fourth Word</li>
            </ul>
          </div>
       </div>

      <div className="drop">
        <span>°</span>
      </div>

      <div className="bucketOfFlowers">
        <img src="../images/bucket.png" alt="Flowers feel bad without the water"/>
      </div>

    </div>
    )
  };
 
  export default Savannah;