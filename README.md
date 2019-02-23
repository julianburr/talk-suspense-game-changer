# Why React Suspense Will Be a Game Changer

This is the demo app I used for my talk at the [ReactJS Brisbane meetup](https://www.meetup.com/en-AU/reactbris/) about React Suspense. It's also complimentary to the [medium article](https://medium.com/react-in-depth/why-react-suspense-will-be-a-game-changer-37b40fea71ec) I wrote a while back.

I used [Created React App](https://github.com/facebook/create-react-app) for this demo as well as the latest canary version of React. Please note that Suspense for data loading is still highly experimental and APIs will change!

## How to use this repo

You'll see several branches in this repo, walking you through the "evolution" of data handling in React apps, from local state and Redux to Suspense, showing how it simplifies the way we deal with async data and loading states in our applications in the future.

To get started, simply clone the repo, check out the branch you want, install dependencies and ... well, that's it 😊

```bash
# Clone repo
git clone git@github.com:julianburr/talk-suspense.git
cd talk-suspense

# Optionally switch branch
git checkout ...

# Install dependencies
yarn

# Start dev server
yarn start
```

## Summary

### Local State

The simplest way of dealing with async data flows is by using local state. All you need to store a loading (and maybe an error) state, as well as the actual data. With classes this could look something like this.

```js
import React, { Component } from 'React'

class Example extends Component {
  state = {
    loading: true,
    error: null,
    data: null
  }

  // Fetch data when component mounts
  componentDidMount () {
    getData(this.props.id)
      .then(data => {
        this.setState({
          loading: false,
          error: null,
          data
        })
      })
      .catch(e => {
        this.setState({
          loading: false,
          error: e.message,
          data: null
        })
      });
  }

  // We need to refetch the data when the id changes,
  // so we listen for that in `cDU`
  componentDidUpdate (prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({ loading: true });
      getData(this.props.id)
        .then(data => {
          this.setState({
            loading: false,
            error: null,
            data
          })
        })
        .catch(e => {
          this.setState({
            loading: false,
            error: e.message,
            data: null
          })
        });
    }
  }

  render () {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }

    if (this.state.error) {
      return <p>Error: {this.state.error}</p>;
    }

    return <p>Loaded! {this.state.data}</p>;
  }
}
```

This is a hell of a lot of boilerplate for such a simple scenario. Hooks make it already a bit better...

```js
import React, { useState, useEffect } from 'react'

function Example ({ id }) {
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ data, setData ] = useState(null);

  useEffect(() => {
    setLoading(true);
    getData(id)
      .then(data => {
        setLoading(false);
        setError(null);
        setData(data);
      })
      .catch(e => {
        setLoading(false);
        setError(e.message);
        setData(null);
      })
  }, [ id ]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <p>Loaded! {data}</p>;
}
```

...but there are still several problems with this:

* 👎 Ugly ternaries → bad DX
* 👎 Boilerplate → bad DX
* 👎 Confined data and loading state → bad DX & UX
* 👎 Re-fetching data → bad DX
* 👎 Flashing spinners → bad UX

### Global state management, i.e. Context

Some of these can be addressed by hoisting up the data handling to a global state management layer. This could e.g. something like Redux, MobX or just Context, which I'll go with here for the sake of simplicity.

```js
const DataContext = React.createContext();

function DataProvider (props) {
  const [ cache, setCache ] = useState({});

  async function fetch (id) {
    if (cache[id]) {
      return cache[id];
    }

    setCache({
      ...cache, 
      [id]: { loading: true }
    });

    try {
      const data = await getData(id);
      setCache({
        ...cache,
        [id]: {
          loading: false,
          error: null,
          data
        }
      });
    } catch (e) {
      setCache({
        ...cache,
        [id]: {
          loading: false,
          error: e.message,
          data: null
        }
      });
    }
  }

  return <DataContext.Provider value={{data: cache, fetch}} {...props} />;
}

function Example ({ id }) {
  const { fetch, data } = useContext(DataContext);

  useEffect(() => {
    fetch(id)
  }, [ id ]);

  if (!data[id] || data[id].loading) {
    return <p>Loading...</p>;
  }

  if (data[id].error) {
    return <p>Error: {data[id].error}</p>;
  }

  return <p>Loaded! {data[id].data}</p>;
}
```

Still a lot of boilerplate, but at least the final component consuming the data is a lot simpler, and we solved a bunch of our initial issues, yay us 😄

* 👎 Ugly ternaries 
* 👍 Boilerplate 
* 👍 Confined data and loading state 
* 👎 Re-fetching data 
* 👎 Flashing spinners 

Still not great though...

### Suspense to the rescue

```js
import React, { Suspense } from 'react';
import cache from './awesome-cache-provider'; // 😉

function Example ({ id }) {
  const data = cache.read(id);
  return <p>Loaded! {data}</p>;
}

function App () {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Example id={1} />
      <Example id={2} />
    </Suspense>
  );
}
```

Nice, this already looks a lot cleaner.

* ❤️ Ugly ternaries 
* ❤️ Boilerplate 
* ❤️ Confined data and loading state 
* ❤️ Re-fetching data 
* 👎 Flashing spinners

### Concurrent mode as the final touch

```diff
- ReactDOM.render(<App />, document.getElementById('root'));
+ ReactDOM.unstable_createRoot(document.getElementById(‘root’)).render(<App />);
```

That's it. Now we can give `<Suspense />` a maxDuration prop that allows us to prevent anything from rendering for this amount of time, making it possible to not show any spinners on fast networks and thereby hugely improving the user experience.

❤️
