import * as React from 'react';

import "../static/style.css";

const BasicCard = (props) => {
  return (
    <div className='custom-card'>
      <div>
        <img alt={props.alt} src={props.src} />
        <h2>{props.title}</h2>
        {props.content}
      </div>
    </div>
  );
}

export default BasicCard;
