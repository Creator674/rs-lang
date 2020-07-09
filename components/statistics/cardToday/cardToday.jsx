// import React, {useEffect} from "react";
import "./cardToday.less"
// import {CanvasJSChart} from 'canvasjs-react-charts'
// // var CanvasJSReact = require('./canvasjs.react');
// // var CanvasJSReact = require('../../../lib/canvasjs/canvasjs.react');
// // var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// // import CanvasJSReact from "../../../lib/canvasjs/canvasjs.react"

// console.log({CanvasJSChart})

// const СardArchive = (props) => {
//     const options = {
//         animationEnabled: true,
//         subtitles: [{
//             text: "71% Positive",
//             verticalAlign: "center",
//             fontSize: 24,
//             dockInsidePlotArea: true
//         }],
//         data: [{
//             type: "doughnut",
//             showInLegend: true,
//             indexLabel: "{name}: {y}",
//             yValueFormatString: "#,###'%'",
//             dataPoints: [
//                 { name: "Unsatisfied", y: 5 },
//                 { name: "Very Unsatisfied", y: 31 },
//                 { name: "Very Satisfied", y: 40 },
//                 { name: "Satisfied", y: 17 },
//                 { name: "Neutral", y: 7 }
//             ]
//         }]
//     }
//     // useEffect(() => {var CanvasJSChart = CanvasJSReact.CanvasJSChart})

//     return (
//       <div>
//         <div class="study-time">
//             <p>Study Time: 46 min</p>
//         </div>
//         <div className="chartContainer">
//          {/* <CanvasJSChart options = {options} /> */}
//         </div>
//       </div>
//     )
//   };
 
//   export default СardArchive;


import React from 'react';
// import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import { red } from "@material-ui/core/colors";
const СardToday = ({ newCards, winrate, totalCards, studyTime, strike, repeat }) => {
const data = {
    labels: [
      'New cards',
      'Correct answers',
      'Total cards'
  ],
  datasets: [{
    data: [newCards, winrate, totalCards],
    // data: [300, 50, 100],
    // borderWidth: 8,
    backgroundColor: [
    '#C00000',
    '#38ADA9',
    '#1e658a'
    ],
    // hoverBackgroundColor: [
    // '#C00000',
    // '#38ADA9',
    // '#1e658a'
    // ]
  }],
  };
  const options = {
      tooltips: {
        enabled: true,
        backgroundColor: 'rgba(FF, 0, 0, 0.8)',
      }
    
  }
  
  return (
  <div className='tab1'>
    
  <h2 className='studyTime'>Study time: <span>{studyTime}</span></h2>
    <Doughnut
       data={data}
       options={{
        legend:{
          display: false,
          },
        tooltips:{
          enabled: false,
        },
       }
       }
       width={500}
       height={500}
    />
    <div className="legend">
      <p><span className='legend-newWords'>{newCards}</span> New words</p>
      <p><span className='legend-winrate'>{winrate}</span> Correct answers</p>
      <p><span className='legend-totalCards'>{totalCards}</span> Cards</p>
    </div>
    <div className="currentStrike">
      <p>Correct answers strike</p>
      <p className="strike">{strike}</p>
      <p className="wordsToRepeat">{repeat}</p>
      <p>Words for repetition</p>
    </div>
  </div>
  );
  };
  export default СardToday