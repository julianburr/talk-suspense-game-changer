import React, { Fragment } from 'react';
import './good-switch.css';

export default function GoodSwitch ({ value, onChange }) {
  return (
    <button className="good-switch" onClick={() => onChange(!value)}>
      {value ? (
        <Fragment>
          <span className="good-switch--icon">👍</span> Showing only good ones
        </Fragment>
      ) : (
        <Fragment>
          <span className="good-switch--icon">👐</span> Showing all movies
        </Fragment>
      )}
    </button>
  );
}
