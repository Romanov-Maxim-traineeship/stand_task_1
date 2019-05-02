import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const ResultText = (props) => {
  return (
    <div className="Text-area">
      <span className="Text-area_about">OUT</span>
      <TextArea
        value={props.value}
        rows={25}
        cols={55}
        placeholder="Результативный текст"
      />
    </div>
  );
};

export default ResultText;
