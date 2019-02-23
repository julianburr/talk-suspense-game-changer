import React from 'react';
import cache from './utils/suspense-cache-provider';

export default function Random ({ type, args }) {
  const data = cache.read(type, args);
  return <p>{data}</p>;
}
