import React, { useContext, useEffect } from 'react';
import Spinner from './spinner';
import { DataContext } from './utils/data-context';

export default function Random ({ type, args }) {
  const { data, fetch, getKey } = useContext(DataContext);
  const key = getKey(type, args);

  useEffect(
    () => {
      fetch(type, args);
    },
    [ key ]
  );

  if (!data[key] || data[key].loading) {
    return <Spinner />;
  }

  if (data[key].error) {
    return <p>Something went wrong! {data[key].error}</p>;
  }

  return <p>{data[key].data}</p>;
}
