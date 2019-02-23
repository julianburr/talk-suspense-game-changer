import React from 'react';
import Widget from './widget';
import Random from './random';
import SpeedSwitch from './speed-switch';

import './app.css';

export default function App () {
  return (
    <div className="app">
      <header>
        <h1>Dashboard</h1>
        <SpeedSwitch />
      </header>
      <div className="widgets">
        <Widget title="Random Number">
          <Random type="number" />
        </Widget>
        <Widget title="Random Color">
          <Random type="color" />
        </Widget>
        <Widget title="Random Movie">
          <Random type="movie" />
        </Widget>
      </div>
    </div>
  );
}
