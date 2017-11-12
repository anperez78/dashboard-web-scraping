import React, { Component } from 'react';
import './HomeScreen.css';
import GarajesAvgPriceChart from './GarajesAvgPriceChart.js'
import PisosAvgPriceChart from './PisosAvgPriceChart.js'

class HomeScreen extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Precios pisos y garajes</h2>
        </div>

        <div className="main">
          <div className="leftSide">
            <div className="marginTop">
              <h3>Precio medio garages</h3>
              <GarajesAvgPriceChart/>
            </div>
            <div className="marginTop">
              <h3>Precio medio pisos</h3>
              <PisosAvgPriceChart/>
            </div>
          </div>
          <div className="rightSide">
            <h3>Pisos</h3>
            <ul>
              <li><a href="/prices-details/barcelona-barcelona">Barcelona</a></li>
              <li><a href="/prices-details/rubi-barcelona">Rubi</a></li>
            </ul>
          </div>
        </div>



      </div>
    );
  }
}

export default HomeScreen;
