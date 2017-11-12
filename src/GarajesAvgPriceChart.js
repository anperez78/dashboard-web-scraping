import React, { Component } from 'react';
var LineChart = require("react-chartjs").Line;
var _ = require('lodash');
var moment = require('moment');

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
						fillColor: "rgba(256,256,256,0.1)",
						pointColor: "rgba(220,220,220,1)",
	    			data: garajesTossaAvgPrice
					},
					{
	    			label: "Garajes Rubi",
						fillColor: "rgba(256,256,256,0.1)",
						pointColor: "rgba(220,220,220,1)",
	    			data: garajesRubiAvgPrice
					},
					{
	    			label: "Garajes Ripollet",
						fillColor: "rgba(256,256,256,0.1)",
						pointColor: "rgba(220,220,220,1)",
	    			data: garajesRipolletAvgPrice
					},
					{
	    			label: "Garajes Barcelona",
						fillColor: "rgba(256,256,256,0.1)",
						pointColor: "rgba(220,220,220,1)",
	    			data: garajesBarcelonaAvgPrice
					}
				]
			};

		}

    return <LineChart data={this.chartData} options={this.chartOptions} width="600" height="400"/>
  }
};
