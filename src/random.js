import React, { Component } from 'react';
import Spinner from './spinner';
import api from './utils/api';

export default class Random extends Component {
  state = {
    loading: true,
    data: null,
    error: null
  };

  componentDidMount () {
    const { type, args } = this.props;
    api(type, args)
      .then((data) =>
        this.setState({
          data,
          loading: false,
          error: null
        })
      )
      .catch(
        (e) =>
          console.error(e) ||
          this.setState({
            loading: false,
            data: null,
            error: e.message
          })
      );
  }

  componentDidUpdate (prevProps) {
    const { type, args } = this.props;
    if (prevProps.type !== type || prevProps.args !== args) {
      this.setState({ loading: true }, () =>
        api(type, args)
          .then((data) =>
            this.setState({
              data,
              loading: false,
              error: null
            })
          )
          .catch(
            (e) =>
              console.error(e) ||
              this.setState({
                loading: false,
                data: null,
                error: e.message
              })
          )
      );
    }
  }

  render () {
    const { loading, error, data } = this.state;
    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <p>Something went wrong! {error}</p>;
    }
    return <p>{data}</p>;
  }
}

