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
    return `{${word}}`;
  }

  handleRun() {
    const { value } = this.state;
    let res = value
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') //уюираем все лишнее из
      //текста(запятые, скобки и т.д. ...)
      .replace(/\s+/g, ' ') //заменяем множественные пробелы или абзацы на 1 пробел
      .trim() //убираем пробелы в начале и конце строки
      .split(' '); //делаем из полечившегося набора слов массив для дальнейшей работы

    let newRes = map(res, this.word); // итерируемся по каждому слову в массиве и оборачиваем
    // его в ковычки c помощью вынесенной функции
    this.setState({ resultValue: newRes.join(' ') }); // преобразуем массив слов в текст
    //и кладем в стейт результативного текста
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
