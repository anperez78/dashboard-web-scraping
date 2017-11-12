import React, { Component } from 'react';
var _ = require('lodash');
var moment = require('moment');
import {Line} from 'react-chartjs-2';


export default class GarajesAvgPriceChart extends Component {

	constructor(props) {
	  super(props);
		this.chartOptions = {};
		this.state = {
			garajesTossaData: [],
			garajesRubiData: [],
			garajesRipolletData: [],
			garajesBarcelonaData: []
		};
	}

	componentDidMount() {
		this.garajesTossaData();
		this.garajesRubiData();
		this.garajesRipolletData();
	 	this.garajesBarcelonaData();
 	}

	garajesTossaData() {
		fetch('http://localhost:8080/garajes/tossa-de-mar-girona/aggregate')
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
			this.setState({ garajesTossaData: jsonResult });
		});
	}

	garajesRubiData() {
		fetch('http://localhost:8080/garajes/rubi-barcelona/aggregate')
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
			this.setState({ garajesRubiData: jsonResult });
		});
	}

	garajesRipolletData() {
		fetch('http://localhost:8080/garajes/ripollet-barcelona/aggregate')
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
			this.setState({ garajesRipolletData: jsonResult });
		});
	}

	garajesBarcelonaData() {
		fetch('http://localhost:8080/garajes/barcelona-barcelona/aggregate')
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
			this.setState({ garajesBarcelonaData: jsonResult });
		});
	}

  render() {

		const garajesTossaLabels = _.map(this.state.garajesTossaData, "_id.date")
										.map(mydate => moment(new Date(mydate)).format('D MMM of YYYY'));
		const garajesRubiLabels = _.map(this.state.garajesRubiData, "_id.date")
										.map(mydate => moment(new Date(mydate)).format('D MMM of YYYY'));
		const garajesRipolletLabels = _.map(this.state.garajesRipolletData, "_id.date")
										.map(mydate => moment(new Date(mydate)).format('D MMM of YYYY'));
		const garajesBarcelonaLabels = _.map(this.state.garajesBarcelonaData, "_id.date")
										.map(mydate => moment(new Date(mydate)).format('D MMM of YYYY'));

		if (_.isEqual(garajesTossaLabels, garajesRubiLabels) &&
				_.isEqual(garajesRubiLabels, garajesRipolletLabels) &&
			  _.isEqual(garajesRipolletLabels, garajesBarcelonaLabels)) {

			const garajesTossaAvgPrice = _.map(this.state.garajesTossaData, "avgPrice");
			const garajesRubiAvgPrice = _.map(this.state.garajesRubiData, "avgPrice");
			const garajesRipolletAvgPrice = _.map(this.state.garajesRipolletData, "avgPrice");
			const garajesBarcelonaAvgPrice = _.map(this.state.garajesBarcelonaData, "avgPrice");

			this.chartData =  {
	      labels: garajesBarcelonaLabels,
	    	datasets: [
	    		{
	    			label: "Garajes Tossa",
						fill: false,
						borderColor: 'green',
	    			data: garajesTossaAvgPrice
					},
					{
	    			label: "Garajes Rubi",
						fill: false,
						borderColor: 'blue',
	    			data: garajesRubiAvgPrice
					},
					{
	    			label: "Garajes Ripollet",
						fill: false,
						borderColor: 'red',
	    			data: garajesRipolletAvgPrice
					},
					{
	    			label: "Garajes Barcelona",
						fill: false,
						borderColor: 'purple',
	    			data: garajesBarcelonaAvgPrice
					}
				]
			};

		}

		return  <Line
          data={this.chartData}
        	width={600}
        	height={400}
        	options={{
        		maintainAspectRatio: false
        	}}
      />
  }
};
