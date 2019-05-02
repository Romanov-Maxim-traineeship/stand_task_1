import React, { Component } from 'react';
import { Button, Input } from 'antd';

import ResultText from './ResultText';

import { map } from 'lodash';
import ReactFileReader from 'react-file-reader';

const { TextArea } = Input;

class TextProcessing extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', resultValue: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  word(word) {
    console.log(`word: ${word}`, word.length);
    return `{${word}}`;
  }

  handleRun() {
    const { value } = this.state;
    let res = value
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ');
    // let newRes = res.map((word) => {
    //   console.log('!!!');
    //   return `{${word}}`;
    // });

    let newRes = map(res, this.word);
    this.setState({ resultValue: newRes.join(' ') });
  }

  handleClear() {
    this.setState({ value: '' });
    this.setState({ resultValue: '' });
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
    return (
      <div className="TextProccessing-wrapper">
        <div className="Text-area">
          <span className="Text-area_about">IN</span>
          <TextArea
            value={this.state.value}
            onChange={this.handleChange}
            rows={25}
            cols={60}
            placeholder="Исходный текст"
          />
        </div>
        <ResultText
          value={this.state.resultValue}
          onChange={this.handleChange}
        />
        <div className="Buttons-wrapper">
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
