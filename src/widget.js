import React from 'react';
import './widget.css';

export default function Widget ({ children, title }) {
  return (
    <div class="widget">
      <div className="widget--inner">
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  );
}
