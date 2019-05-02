import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const ResultText = (props) => {
  return (
    <div className="Text-area">
      <span className="Text-area_about">OUT</span>
      <TextArea
        value={props.value}
        rows={22}
        cols={46}
        placeholder="Результативный текст"
      />
    </div>
  );
};

export default ResultText;
