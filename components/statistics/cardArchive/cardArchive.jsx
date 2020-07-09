// import React, {useEffect} from "react";
import "./cardArchive.less"
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
// import {Doughnut} from 'react-chartjs-2';
const СardArchive = ({learntWords ,day1, day2, day3, day4, day5, day6, day7}) => {
const data = {
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
    // data: [300, 50, 100],
    // borderWidth: 8,
    backgroundColor: [
    '#7AB4CC',
    '#1F658A',
    '#D3E8ED',
    '#7AB4CC',
    '#1F658A',
    '#2C3E50',
    '#C00000'
    ],
    // hoverBackgroundColor: [
    // '#C00000',
    // '#38ADA9',
    // '#1e658a'
    // ]
  }]
  };
  
  return (
  <div className='tab2'>
    
  <h2 className='learntWords'><span>{learntWords}</span> of <span>3600</span> words learnt</h2>
  <div className='alpinist'>
    <img src='./images/marginalia-done.png' alt=""/>
  </div>
    <Bar
       data={data}
       options={{
        legend:{
          display: false,
          },
        tooltips:{
          enabled: true,
        },
       }
       }

    />
  


    
    
    
    {/* <Doughnut
       data={data}
       width={500}
       height={500}
    />
    <div className="today__eagle currentStrike">
      <p>Correct answers strike</p>
      <p className="strike">{strike}</p>
      <p className="wordsToRepeat">{repeat}</p>
      <p>Words for repetition</p>
    </div> */}
  </div>
  );
  };
  export default СardArchive