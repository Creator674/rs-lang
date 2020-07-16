import "./cardArchive.less"
import React from 'react';
import {Bar} from 'react-chartjs-2';
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
  <div className='tab'>

  <h2 className='learntWords'><span>{learntWords}</span> of <span>3600</span> words learnt</h2>
  <div className='alpinist'>
    <img src='./images/marginalia-done.png' alt="we are crawling"/>
  </div>
  <div className="bar-wrapper">
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
    </div>
  </div>
  );
  };
  export default СardArchive