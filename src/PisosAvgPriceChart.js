import React, { Component } from 'react';
var LineChart = require("react-chartjs").Line;
var _ = require('lodash');
var moment = require('moment');

export default class PisosAvgPriceChart extends Component {

	constructor(props) {
	  super(props);
		this.chartOptions = {};
		this.state = {
			pisosTossaData: [],
			pisosRubiData: [],
			pisosRipolletData: [],
			pisosBarcelonaData: []
		};
	}

	componentDidMount() {
		this.pisosTossaData();
		this.pisosRubiData();
		this.pisosRipolletData();
	 	this.pisosBarcelonaData();
 	}

	pisosTossaData() {
		fetch('http://localhost:8080/pisos/tossa-de-mar-girona')
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
			this.setState({ pisosTossaData: jsonResult });
		});
	}

	pisosRubiData() {
		fetch('http://localhost:8080/pisos/rubi-barcelona')
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
			this.setState({ pisosRubiData: jsonResult });
		});
	}

	pisosRipolletData() {
		fetch('http://localhost:8080/pisos/ripollet-barcelona')
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
			this.setState({ pisosRipolletData: jsonResult });
		});
	}

	pisosBarcelonaData() {
		fetch('http://localhost:8080/pisos/barcelona-barcelona')
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
			this.setState({ pisosBarcelonaData: jsonResult });
		});
	}

  render() {

		const pisosTossaLabels = _.map(this.state.pisosTossaData, "_id.date")
										.map(mydate => moment(new Date(mydate)).format('D MMM of YYYY'));
		const pisosRubiLabels = _.map(this.state.pisosRubiData, "_id.date")
										.map(mydate => moment(new Date(mydate)).format('D MMM of YYYY'));
		const pisosRipolletLabels = _.map(this.state.pisosRipolletData, "_id.date")
										.map(mydate => moment(new Date(mydate)).format('D MMM of YYYY'));
		const pisosBarcelonaLabels = _.map(this.state.pisosBarcelonaData, "_id.date")
										.map(mydate => moment(new Date(mydate)).format('D MMM of YYYY'));

		if (_.isEqual(pisosTossaLabels, pisosRubiLabels) &&
				_.isEqual(pisosRubiLabels, pisosRipolletLabels) &&
			  _.isEqual(pisosRipolletLabels, pisosBarcelonaLabels)) {

			console.log('labels are OK');

			const pisosTossaAvgPrice = _.map(this.state.pisosTossaData, "avgPrice");
			const pisosRubiAvgPrice = _.map(this.state.pisosRubiData, "avgPrice");
			const pisosRipolletAvgPrice = _.map(this.state.pisosRipolletData, "avgPrice");
			const pisosBarcelonaAvgPrice = _.map(this.state.pisosBarcelonaData, "avgPrice");

			this.chartData =  {
	      labels: pisosBarcelonaLabels,
	    	datasets: [
	    		{
	    			label: "pisos Tossa",
						fillColor: "rgba(256,256,256,0.1)",
						pointColor: "rgba(220,220,220,1)",
	    			data: pisosTossaAvgPrice
					},
					{
	    			label: "pisos Rubi",
						fillColor: "rgba(256,256,256,0.1)",
						pointColor: "rgba(220,220,220,1)",
	    			data: pisosRubiAvgPrice
					},
					{
	    			label: "pisos Ripollet",
						fillColor: "rgba(256,256,256,0.1)",
						pointColor: "rgba(220,220,220,1)",
	    			data: pisosRipolletAvgPrice
					},
					{
	    			label: "pisos Barcelona",
						fillColor: "rgba(256,256,256,0.1)",
						pointColor: "rgba(220,220,220,1)",
	    			data: pisosBarcelonaAvgPrice
					}
				]
			};

		}

    return <LineChart data={this.chartData} options={this.chartOptions} width="600" height="400"/>
  }
};
