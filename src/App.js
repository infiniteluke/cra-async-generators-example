import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// @see https://jakearchibald.com/2017/async-iterators-and-generators/#async-generators-creating-your-own-async-iterator
async function* asyncRandomNumbers() {
  // This is a web service that returns a random number
  const url = 'https://www.random.org/decimal-fractions/?num=1&dec=10&col=1&format=plain&rnd=new';

  while (true) {
    const response = await fetch(url);
    const text = await response.text();
    yield Number(text);
  }
}

class App extends Component {
  state = {
    number: 0,
    done: false,
  }

  async getRandomNumbers() {
    for await (const number of asyncRandomNumbers()) {
      this.setState({ number })
      if (number > 0.95) {
        this.setState({ done: true })
        break;
      }
    }
  }

  componentDidMount() {
    this.getRandomNumbers();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{this.state.number}</h1>
          {this.state.done ? <p>Found it</p> : <p>looking for a number greater than .95</p>}
        </header>
      </div>
    );
  }
}

export default App;
