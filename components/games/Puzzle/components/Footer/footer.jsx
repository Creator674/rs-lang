import React, { useState } from 'react';
import './footer.less';
  

  export const Footer = ({props}) => {

    const state ={
        isCheckClicked: false,
        isIdontKnowClicked: false,
        isContinueClicked: false,
        isnewGameClicked: false,
        showCorrectAnswer: false,
      }

     return (
        <div className="footer">
          <button title="I DON't KNOW!!!" 
                  className={"idontKnow" + (props ? "dismissed" : "")}
                  onClick={()=> {
                    state.isIdontKnowClicked = true,
                    state.showCorrectAnswer = true
                  }}
                   >I don't</button>

          <button className="check_answer dismissed"
                  onClick={()=> this.setState({
                    isCheckClicked: true
                  })} >Check</button>

          <button className="continue dismissed" 
                  onClick={()=> this.setState({
                    isContinueClicked: true
                  })}>Continue</button> 

          <button className="newGame dismissed" 
                  onClick={()=> this.setState({
                    isnewGameClicked: true
                  })}>Contin </button> 
          
       </div>
     );
} 