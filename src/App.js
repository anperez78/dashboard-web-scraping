import React, { Component } from 'react';
import './App.css';
import GarajesAvgPriceChart from './GarajesAvgPriceChart.js'
import PisosAvgPriceChart from './PisosAvgPriceChart.js'
import GarajesCountChart from './GarajesCountChart.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          This is a test!
        </p>
        <GarajesAvgPriceChart/>
        <PisosAvgPriceChart/>
        <GarajesCountChart/>
      </div>
    );
  }
}

export default App;
