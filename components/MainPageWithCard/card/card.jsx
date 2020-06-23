import React, { Component } from 'react';
import {ProgressChart} from '../../Progress/progress-chart'
import {ProgressBar} from '../../Progress/progress-bar'
import './card.less'

export const Card = () => {
      return (
         <>
            <div className="main-card">
               <span className="arrow left"></span>
               <div className="card-box">
                  <div className="btns-row">
                     <button className="hard">hard</button>
                     <button className="repeat">repeat</button>
                     <button className="easy">easy</button>
                     <button className="answer">answer</button>
                  </div>
                  <div className="gameboard">
                     <p className="example">It did not produce the desired effect.</p>
                     <p className="translation">Это не произвело желаемого эффекта.</p>
                  </div>
                  <div className="card-footer">
                     <span className="transl">производить</span>
                     <ProgressChart className="chart" width="4rem" value="0.1"/>
                  </div>
               </div>
               <span className="arrow"></span>
            </div>

            <div className="bar">
               <ProgressBar current="20" total="100" width="58rem" />
            </div>
         </>   
      );
}
