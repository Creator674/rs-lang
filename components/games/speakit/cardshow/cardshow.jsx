import React, { useState } from 'react'
import './cardShow.less'

export class CardShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listening: false,
      showResults: false,
      gameStart: false,
      word: '...',
      imageSrc: '...',
      translation: '...',
      pronouncedWord: '...',
    }
    this.toggleListen = this.toggleListen.bind(this)
    // this.getTranslation = getTranslation.bind(this);
  }

  //    componentWillMount() {
  //       if (typeof window !== 'undefined') {
  //          const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  //          const recognition = new SpeechRecognition();

  //          recognition.interimResults = false;
  //          recognition.maxAlternatives = 10;
  //          recognition.lang = "en-EN";
  //          recognition.continuous = false;
  //       }
  //   }

  async getTranslation(word) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200421T085741Z.28c875806d5fd2f2.7b933a17b65378f43f8faa7bde7fa96b897405f1&text=${word}&lang=en-ru`
    const res = await fetch(url)
    const data = await res.json()
    this.setState({
      translation: data.text,
    })
  }

  toggleListen() {
    this.setState(
      {
        listening: !this.state.listening,
      },
      this.startGAME
    )
  }

  checkTheAnswer = (word) => {
    const spokedWord = this.state.word.toLowerCase()
    console.log(spokedWord)
  }

  startGAME = () => {
    // e.preventDefault();
    if (this.state.listening) {
      recognition.start()
    }
    this.setState({
      gameStart: true,
    })
    recognition.onresult = (e) => {
      const transcriptions = Array.from(e.results)
        .map((res) => res[0])
        .map((result) => result.transcript)
        .join('')
      this.setState({
        pronouncedWord: transcriptions,
      })
      console.log(transcriptions)
      if (e.results[0].isFinal) {
        checkTheAnswer(transcriptions)
      }
    }
    recognition.addEventListener('end', recognition.start)
    recognition.onspeechend = () => {
      recognition.stop()
    }
  }

  restartHandleClick = (event) => {
    event.preventDefault()
    this.setState({
      gameStart: true,
    })
    recognition = ''
    recognition = new SpeechRecognition()
    recognition.start()
  }

  showResultWindow = (event) => {
    event.preventDefault()
    this.setState({
      showResults: true,
    })
  }

  render() {
    return (
      <div className='column' isGuessed={this.checkTheAnswer}>
        <div className='picture'>
          {/* <img src={this.state.imageSrc || "./images/speakit/init.jpg"} alt="pic" /> */}
          <img src='./images/speakit/init.jpg' alt='pic' />
        </div>

        <p className={this.state.gameStart ? 'translation' : 'translation play'}>
          getTranslation = {() => this.getTranslation(this.state.word)}
        </p>

        <input
          type='text'
          className={this.state.gameStart ? 'input' : 'input play'}
          readOnly={true}
          defaultValue={this.state.pronouncedWord}
        />

        <div className='btns-container'>
          <button className={this.state.gameStart ? 'btn speak' : 'btn speak speakPls'} onClick={this.toggleListen}>
            Speak please
          </button>

          <button className='btn restart' onClick={this.restartHandleClick}>
            Restart
          </button>
          <button className='btn results' onClick={this.showResultWindow}>
            Results
          </button>
        </div>
      </div>
    )
  }
}
