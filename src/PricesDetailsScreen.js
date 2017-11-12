import React, { Component } from 'react';
import Loader from 'halogen/PulseLoader';
import SubTable from './SubTable.js'
import './PricesDetailsScreen.css';

class PricesDetailsScreen extends Component {

  constructor(){
    super()
      this.state = {
        data: [],
        loading: true
      }

  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var city = this.props.match.params.city;
		fetch('http://localhost:8080/pisos/' + city)
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
      this.setState({
        data: jsonResult,
        loading: false
      });
		});
	}

  render() {
    let content;

    if (this.state.loading) {
      content = <div className="centerDiv">
        <Loader color="#26A65B" size="16px" margin="4px"/>
      </div>
    } else {
      var city = this.props.match.params.city;
      content = <div>
          <h1>{city}</h1>
          <a href='/home'>Back</a>
          <table>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>

                      <td><a href={'http://localhost:8080/pisos/' + city + '/' + item._id}>{item._id}</a></td>
                      <td>
                        <SubTable prices={item.prices} />
                      </td>
                  </tr>
                )

             })}</tbody>
           </table>
        </div>
    }

    return (content);
  }
}

export default PricesDetailsScreen;
