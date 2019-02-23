import React, { Component, createContext } from 'react';
import api from './api';

export const DataContext = createContext();

export class DataProvider extends Component {
  state = {
    cache: {}
  };

  loading = [];

  getKey = (type, args) => {
    return `${type}--${JSON.stringify(args)}`;
  };

  fetch = (type, args) => {
    const key = this.getKey(type, args);

    if (this.loading.includes(key) || this.state.cache[key]) {
      return { loading: true };
    }

    this.loading.push(key);
    this.setState(
      {
        [key]: { loading: true }
      },
      () => {
        this.loading = this.loading.filter((i) => i !== key);
      }
    );

    api(type, args)
      .then((data) =>
        this.setState({
          [key]: {
            loading: false,
            error: null,
            data
          }
        })
      )
      .catch((e) =>
        this.setState({
          [key]: {
            loading: false,
            error: e.message,
            data: null
          }
        })
      );
  };

  render () {
    return (
      <DataContext.Provider
        value={{
          data: this.state,
          fetch: this.fetch,
          getKey: this.getKey
        }}
        {...this.props}
      />
    );
  }
}
