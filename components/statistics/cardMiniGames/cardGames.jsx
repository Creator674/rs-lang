// import React, {useEffect} from "react";
import "./cardGames.less"
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
import {Bar} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
const СardGames = ({game, correctCount, mistakesCount ,day1, day2, day3, day4, day5, day6, day7}) => {
const data2 = {
    labels: [
      '-6',
      '-5',
      '-4',
      '-3',
      '-2',
      '-1',
      'Today',
  ],
  datasets: [{
    data: [day1, day2, day3, day4, day5, day6, day7],
    backgroundColor: [
    '#7AB4CC',
    '#1F658A',
    '#D3E8ED',
    '#7AB4CC',
    '#1F658A',
    '#2C3E50',
    '#C00000'
    ],

  }]
  };
  
  return (
  <div className='tab2'>
    
  <h2 className='currentGame'><span>{game}</span></h2>

  <div className="currentGameResult">
      <p>Correct answers</p>
      <p className="correctCount">{correctCount}</p>
      <p className="mistakesCount">{mistakesCount}</p>
      <p>Errors</p>
  </div>
  <div className="pie-wrapper">
      <Pie
      data={data2}
      width={150}
      height={150}
      options={{ maintainAspectRatio: false,
        legend:{
          display: false,
          },
          tooltips:{
            enabled: false
         }
      }
      }
      />
  </div>
  <div className="bar-wrapper">
    <Bar
       data={data2}
       options={{
        legend:{
          display: false,
          },
        tooltips:{
          enabled: true,
        },
       }}/>
  </div>
  


    
    
    
  </div>
  );
  };
  export default СardGames