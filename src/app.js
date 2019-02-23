import React, { useState } from 'react';
import Widget from './widget';
import Random from './random';
import SpeedSwitch from './speed-switch';
import GoodSwitch from './good-switch';

import './app.css';

export default function App () {
  const [ onlyGood, setOnlyGood ] = useState(false);

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
          <GoodSwitch value={onlyGood} onChange={setOnlyGood} />
          <Random type="movie" args={{ onlyGood }} />
        </Widget>
        <Widget title="Summary">
          <Random type="number" />
          <Random type="color" />
          <Random type="movie" />
        </Widget>
      </div>
    </div>
  );
}
