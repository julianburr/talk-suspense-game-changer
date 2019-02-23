import React, { useState } from 'react';
import './speed-switch.css';

export default function SpeedSwitch () {
  const [ speed, setSpeed ] = useState(
    JSON.parse(localStorage.getItem('speed'))
  );
  return (
    <div className="speed-switch">
      <span className="speed-switch--icon" style={{ opacity: speed ? 0.2 : 1 }}>
        🐢
      </span>
      <div className="speed-switch--switch">
        <input
          type="checkbox"
          id="speed"
          name="speed"
          onChange={(e) => {
            setSpeed(e.target.checked);
            localStorage.setItem('speed', e.target.checked);
          }}
          checked={speed}
        />
        <label for="speed" />
      </div>
      <span className="speed-switch--icon" style={{ opacity: speed ? 1 : 0.2 }}>
        🐰
      </span>
    </div>
  );
}
