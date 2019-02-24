import React, { useState, useEffect, Fragment } from 'react';
import { FadeLoader } from 'react-spinners';
import styled from 'styled-components';

const Heading = styled.h1`
  line-height: 1.25;
  font-size: 3.5em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const Word = styled.span`
  padding: 0 .2em;
`;

const Spinner = styled.div`
  padding: 0 .2em;
`;

function Sentence ({ show, children }) {
  const words = children.split(' ');
  return (
    <Heading>
      {words.map((word, i) => <Loader text={word} visible={show[i]} />)}
    </Heading>
  );
}

function Loader ({ text, visible }) {
  return visible ? (
    <Word>{text}</Word>
  ) : (
    <Spinner>
      <FadeLoader color="white" height={10} margin="1px" />
    </Spinner>
  );
}

export default function Title ({ children }) {
  const [ show, setShow ] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]);

  const timers = show.map(
    (_, i) => 2000 * i + 2000 + Math.floor(Math.random() * 12000)
  );

  useEffect(() => {
    let state = [ ...show ];
    show.forEach((_, i) => {
      setTimeout(() => {
        state = state.map((v, j) => (i === j ? true : v));
        setShow(state);
      }, timers[i]);
    });
  }, []);

  return (
    <Fragment>
      <Sentence show={show}>{children}</Sentence>
    </Fragment>
  );
}
