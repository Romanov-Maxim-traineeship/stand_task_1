import React, { Component } from 'react';
import { Button, Input } from 'antd';

import ResultText from './ResultText';

import { map } from 'lodash';
import ReactFileReader from 'react-file-reader';

const { TextArea } = Input;

class TextProcessing extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', resultValue: '', specialChar: '', counter: 0 };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSpecialEven = this.handleChangeSpecialEven.bind(this);
    this.handleRun = this.handleRun.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleChangeSpecialEven(event) {
    this.setState({ specialChar: event.target.value });
  }

  handleRun() {
    const { value, specialChar } = this.state;
    let res = value.toLowerCase().split(' '); // преобразуем исходный текст в массив

    this.setState({ counter: 0 });
    res.map((res) => {
      // итерируемся по масиву
      if (res[0] === specialChar) {
        // сравниваем первую букву слова с введеным искомым символом
        this.setState(function(prevState, props) {
          return { counter: prevState.counter + 1 };
        });
      }
    });
  }

  handleClear() {
    this.setState({ value: '' });
    this.setState({ resultValue: '' });
    this.setState({ specialChar: '' });
  }

  handleOpen() {}

  handleFiles = (files) => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var file = files[0];
      var reader = new FileReader();

      var textFile = /text.*/;

      if (file.type.match(textFile)) {
        reader.onload = function(event) {
          this.setState({ value: event.target.result });
        }.bind(this);
      } else {
        console.log('ERROR');
      }
      reader.readAsText(file);
    } else {
      alert('Your browser is too old to support HTML5 File API');
    }
  };

  render() {
    const { counter, specialChar } = this.state;
    return (
      <div className="TextProccessing-wrapper">
        <div className="Text-area">
          <span className="Text-area_about">IN</span>
          <TextArea
            style={{
              resize: 'none',
            }}
            value={this.state.value}
            onChange={this.handleChange}
            rows={22}
            cols={50}
            placeholder="Исходный текст"
          />
        </div>
        <ResultText
          value={specialChar ? `Слов на букву '${specialChar}': ${counter}` : 0}
          onChange={this.handleChange}
        />
        <div className="Buttons-wrapper">
          <div className="special-char">
            <TextArea
              style={{
                resize: 'none',
              }}
              value={this.state.specialChar}
              onChange={this.handleChangeSpecialEven}
              rows={1}
              cols={3}
              placeholder="Искомая буква"
            />
          </div>
          <ReactFileReader fileTypes={['.txt']} handleFiles={this.handleFiles}>
            <Button
              className="bitton-wrap"
              icon="download"
              size="large"
              type="dashed"
              ghost
              onClick={() => this.handleOpen()}
            >
              Open
            </Button>
          </ReactFileReader>
          <div className="h-100">
            <Button
              className="bitton-wrap"
              icon="play-circle"
              size="large"
              type="primary"
              onClick={() => this.handleRun()}
            >
              Run
            </Button>
          </div>
          <div className="h-100">
            <Button
              className="bitton-wrap"
              icon="stop"
              size="large"
              type="danger"
              onClick={() => this.handleClear()}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default TextProcessing;
