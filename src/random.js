import React, { useState, useEffect } from 'react';
import Spinner from './spinner';
import api from './utils/api';

export default function Random ({ type, args }) {
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ data, setData ] = useState(null);

  const key = `${type}--${JSON.stringify(args)}`;

  useEffect(
    () => {
      api(type, args)
        .then((data) => {
          setLoading(false);
          setError(null);
          setData(data);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
          setError(e.message);
          setData(null);
        });
    },
    [ key ]
  );

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p>Something went wrong! {error}</p>;
  }
  return <p>{data}</p>;
}
