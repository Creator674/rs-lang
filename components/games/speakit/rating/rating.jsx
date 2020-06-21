import React, { useState } from 'react'
import './rating.less'

export class Rating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: 'l1',
      isLevelChanged: false,
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleOptionChange = (e) => {
    console.log(e.target.value)
    this.setState({
      selectedOption: e.target.value,
      isLevelChanged: true,
    })
    console.log(this.selectedOption, this.isLevelChanged)
  }

  handleFormSubmit = (e) => {
    this.setState({
      selectedOption: e.target.value,
      isLevelChanged: true,
    })
    console.log(this.selectedOption, this.isLevelChanged)
  }

  render() {
    return (
      <form className='header_column__level' onSubmit={this.handleFormSubmit}>
        <input
          type='radio'
          name='rating'
          id='step6'
          value='l6'
          checked={this.state.selectedOption === 'l6'}
          onChange={this.handleOptionChange}
        />
        <label htmlFor='step6'>6 </label>

        <input
          type='radio'
          name='rating'
          id='step5'
          value='l5'
          checked={this.state.selectedOption === 'l5'}
          onChange={this.handleOptionChange}
        />
        <label htmlFor='step5'>5 </label>

        <input
          type='radio'
          name='rating'
          id='step4'
          value='l4'
          checked={this.state.selectedOption === 'l4'}
          onChange={this.handleOptionChange}
        />
        <label htmlFor='step4'>4</label>

        <input
          type='radio'
          name='rating'
          id='step3'
          value='l3'
          checked={this.state.selectedOption === 'l3'}
          onChange={this.handleOptionChange}
        />
        <label htmlFor='step3'>3 </label>

        <input
          type='radio'
          name='rating'
          id='step2'
          value='l2'
          checked={this.state.selectedOption === 'l2'}
          onChange={this.handleOptionChange}
        />
        <label htmlFor='step2'>2</label>

        <input
          type='radio'
          name='rating'
          id='step1'
          value='l1'
          checked={this.state.selectedOption === 'l1'}
          onChange={this.handleOptionChange}
        />
        <label htmlFor='step1'>1</label>
      </form>
    )
  }
}
