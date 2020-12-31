import React from 'react'

import './App.css';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Data from './Data';



class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: Data,
      nowQuestion: 1,
      flashcard: Data[0],
      display: false,
    };
    this.initData = {
      data: Data,
      nowQuestion: 1,
      flashcard: Data[0],
      display: false,
    };
    this.setAnswer = this.setAnswer.bind(this);
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.back = this.back.bind(this);
  }

  setAnswer(data) {
    // alert(data);
  }

  openCard() {
    if (this.state.flashcard.selectedVal) {
      this.state.data[this.state.nowQuestion - 1].checkAnswerQuestion = true
      this.setState({ display: !this.state.display })
    } else {
      // alert('Hãy chọn đáp án trước khi xem đáp án')
    }

  }

  answerQuestion = event => {
    this.state.flashcard.selectedVal = event.target.value
    this.state.data[this.state.nowQuestion - 1].selectedVal = event.target.value
    this.setState({ selectedVal: event.target.value, data: this.state.data, flashcard: Object.assign({}, this.state.flashcard) })
  };

  chooseQuestion(row) {
    let chooseQuestion = Object.assign({}, this.state.data[row - 1])
    this.setState({ nowQuestion: row, flashcard: chooseQuestion, selectedVal: chooseQuestion.selectedVal })
  }

  back() {
    this.setState({ nowQuestion: this.state.nowQuestion - 1, flashcard: Object.assign({}, this.state.data[this.state.nowQuestion - 2]) })
  }

  next() {
    this.setState({ nowQuestion: this.state.nowQuestion + 1, flashcard: Object.assign({}, this.state.data[this.state.nowQuestion]) })
  }

  view() {
    let point = 0;

    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selectedVal == this.state.data[i].correct) {
        point++;
      }
    }

    alert("Bạn đã trả lời đúng :" + point + " câu")
  }

  reset() {
    window.location.reload(true);
  }

  render() {

    let buttonItem = [];

    for (let row = 1; row <= 10; row++) {
      buttonItem.push(
        <div style={{ margin: 2, marginBottom: 10 }}><Button variant="contained" color={row === this.state.nowQuestion ? "primary" : ""} onClick={() => { this.chooseQuestion(row) }}>{row}</Button></div>

      );
    }

    let anwsered = 0;

    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selectedVal) {
        anwsered++;
      }
    }


    return (
      <div className="App">
        <header className="App-header">
          <h2> NGUYỄN VĂN QUÝ</h2>
          <h3> FLASH CARD</h3>
          <div style={{ display: "flex" }}>{buttonItem}</div>
          <div style={{ display: "flex" }}>
            <Button style={{ height: 50, marginRight: 10 }} variant="contained" color="secondary"
              disabled={this.state.nowQuestion === 1}
              onClick={() => { this.back(); }}>Back</Button>
            <div
              className={this.state.display ? 'card flip' : 'card'}
              style={{ height: 300, width: 500 }}
              onClick={() => this.openCard()}
            >
              <div className="front" >
                {this.state.flashcard.question}
                <div className="flashcard-options">
                  <RadioGroup value={this.state.flashcard.selectedVal ? this.state.flashcard.selectedVal : "0"} onChange={this.answerQuestion}>
                    {this.state.flashcard.options.map(option => {
                      return <div className="flashcard-option" key={option.id}>
                        <FormControlLabel
                          value={option.id}
                          control={<Radio disabled={this.state.data[this.state.nowQuestion - 1].checkAnswerQuestion} />}
                          label={option.content} ></FormControlLabel>
                      </div>
                    })}
                  </RadioGroup>
                </div>
              </div>
              <div className="back" >{this.state.flashcard.answer}</div>
            </div>
            <Button style={{ height: 50, marginLeft: 10 }} variant="contained" color="secondary"
              disabled={this.state.nowQuestion === 10}
              onClick={() => { this.next(); }}>Next</Button>
          </div>
          <div style={{ display: anwsered == 10 ? "flex" : "none" }}>
            <Button style={{ height: 50, marginLeft: 10 }} variant="contained" color="secondary"
              onClick={() => { this.view(); }}>Xem điểm</Button>
            <Button style={{ height: 50, marginLeft: 10 }} variant="contained" color="secondary"
              onClick={() => { this.reset(); }}>Làm lại</Button>

          </div>
        </header>
      </div>
    );
  }
}

export default App;
