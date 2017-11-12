import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import HomeScreen from './HomeScreen.js'
import PricesDetailsScreen from './PricesDetailsScreen.js'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <Route path='/prices-details/:city' component={PricesDetailsScreen} />
            <Route path='/home' component={HomeScreen} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
