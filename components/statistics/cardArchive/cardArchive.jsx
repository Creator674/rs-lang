import "./cardArchive.less"
import React from 'react';
import {Bar} from 'react-chartjs-2';

const СardArchive = ({learntWords, days}) => {
  const datesArray = [...days].slice(0, 7).map(el => el[0]);
  const amountOfWords = [...days].slice(0, 7).map(el => {
    if(el[1].guessed){
      return el[1].guessed
    }
    return 0
  })

  const data = {
      labels: datesArray,
      datasets: [{
      data: amountOfWords,
      backgroundColor: [    '#7AB4CC',    '#1F658A',    '#D3E8ED',    '#7AB4CC',    '#1F658A',    '#2C3E50',    '#C00000' ],
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