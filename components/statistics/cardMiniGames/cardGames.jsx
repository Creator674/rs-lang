import React, { useEffect, useState } from 'react'
import './cardGames.less'
import { Bar } from 'react-chartjs-2'
import { Pie } from 'react-chartjs-2'

const СardGames = ({
  savannah,speakit,sprint, audiocall, hangman, puzzle,
}) => {
  

  const [gameName, setGameName] = useState('speakit')
  const [ind, setInd] = useState(0)
  const [dateData, setDateData] = useState(0)
  const [date, setDate] = useState('today')
  const [amountWords, setamountWords] = useState(0)
  const [amountErrors, setamountErrors] = useState(0)
  const [amountGuessed, setamountGuessed] = useState(0)

  const games = [savannah, speakit, sprint, audiocall, hangman, puzzle];
  const gamesNames = ['savannah', 'speakit', 'sprint', 'audiocall', 'hangman', 'puzzle'];

  const settoGameName = (name) => {
    setGameName(name)
    setInd(gamesNames.indexOf(name))
    const Isdata = Object.entries(games[gamesNames.indexOf(name)])
    if(Isdata[0]){
      setDateData(Isdata[0][1][1]) 
    }
  }
   
  useEffect(() => {
    if(dateData){
      setDate(Object.keys(dateData) )         // дата
      const countOfGame = Object.entries(dateData)[1]
      console.log(countOfGame)
      if(countOfGame){
        setamountWords(Object.entries(dateData)[1][1].amount)
        setamountErrors(Object.entries(dateData)[1][1].faults)
        setamountGuessed(Object.entries(dateData)[1][1].guessed)
      }
    }
  }, [gameName]) 


   const data2 = {
    labels: date ,
    datasets: [
      {
        data: [amountWords],
        backgroundColor: ['#7AB4CC', '#1F658A', '#D3E8ED', '#7AB4CC', '#1F658A', '#2C3E50', '#C00000'],
      },
    ],
  }
  const data1 = {
    labels: ['SpeakIt', 'Savannah', 'Audiocall', 'Hangman', 'English Puzzle', 'Sprint'],
    datasets: [
      {
        data: [amountWords],
        backgroundColor: ['#7AB4CC', '#1F658A', '#D3E8ED', '#7AB4CC', '#1F658A', '#2C3E50', '#C00000'],
      },
    ],
  } 

  return (
    <div className='tab'>
      <h2 className='currentGame'>
        <button onClick={() => {settoGameName('savannah')}}>savannah</button>
        <button onClick={() => {settoGameName('speakit')}} >speakit</button>
        <button onClick={() => {settoGameName('sprint')}}>sprint</button>
        <button onClick={() => {settoGameName('audiocall')}}>audiocall</button>
        <button onClick={() => {settoGameName('hangman')}}>hangman</button>
        <button onClick={() => {settoGameName('puzzle')}}>puzzle</button>
      </h2>
      <h2 style={{textAlign: 'center'}}>{gameName}</h2>
      <div className='eagle'>
        <p className='eagle__text eagle__text_left'>Correct answers</p>
        <div className='eagle__digs'>
          <p className='eagle__dig'>
            {amountGuessed}
            </p>
          <p className='eagle__dig eagle__dig_right-wing eagle__dig_errors'>
            {amountErrors}
            </p>
        </div>
        <p className='eagle__text'>Errors</p>
      </div>

      <div className='pie-wrapper'>
        <Pie
          data={data1}
          width={150}
          height={150}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            tooltips: {
              enabled: true,
            },
          }}
        />
      </div>
      <div className='bar-wrapper'>
        <Bar
          data={data2}
          options={{
            legend: {
              display: false,
            },
            tooltips: {
              enabled: true,
            },
          }}
        />
      </div>
    </div>
  )
}
export default СardGames
