import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const customStyles = {
  ...atomDark,
  'pre[class*="language-"]': {
    ...atomDark['pre[class*="language-"]'],
    fontSize: '3vh',
    width: '80vw'
  }
};

export default function JSX ({ children }) {
  return (
    <SyntaxHighlighter language="jsx" style={customStyles}>
      {children}
    </SyntaxHighlighter>
  );
}
