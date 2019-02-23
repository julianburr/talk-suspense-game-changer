import React from 'react';
import colors from 'css-color-names';

const TYPES = {
  number: () => Array.from(Array(100)).map((_, i) => i),
  color: () =>
    Object.keys(colors).filter((color) => color.length < 10).map((color) => (
      <span className="color" style={{ '--color': color }}>
        {color}
      </span>
    )),
  movie: ({ onlyGood }) =>
    [
      'Lucky Number Slevin 🏇',
      'Memento',
      'Fracture',
      !onlyGood && 'Badman vs. Superman 🍅',
      !onlyGood && 'The Great Gatsby',
      'The Lord of the Rings 💍',
      'Slumdog Millionair',
      'Jaws ⛵️🦈',
      'Forest Gump 🏃‍♂️',
      !onlyGood && 'The Day After Tomorrow',
      'Independence Day 👽',
      'The Sixth Sense',
      'Oceans 11',
      'The LEGO Movie',
      'Lobster 🦐',
      !onlyGood && 'Avater',
      !onlyGood && 'Titanic 🚢',
      !onlyGood && 'The DaVinci Code',
      !onlyGood && 'Illuminati',
      !onlyGood && '2012',
      !onlyGood && 'The Purge'
    ].filter(Boolean)
};

export default async function api (type, args = {}) {
  const speed = JSON.parse(localStorage.getItem('speed'));
  const ms = speed
    ? Math.floor(Math.random() * 100) + 200
    : Math.floor(Math.random() * 2000) + 4000;
  await delay(ms);

  const items = TYPES[type](args);
  return items[Math.floor(Math.random() * items.length)];
}

function delay (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
