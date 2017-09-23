import React, { Component } from 'react';
var BarChart = require("react-chartjs").Bar;
var _ = require('lodash');
var moment = require('moment');

export default class GarajesCountChart extends Component {

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
		fetch('http://localhost:8080/garajes/tossa-de-mar-girona')
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
			this.setState({ garajesTossaData: jsonResult });
		});
	}

	garajesRubiData() {
		fetch('http://localhost:8080/garajes/rubi-barcelona')
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
			this.setState({ garajesRubiData: jsonResult });
		});
	}

	garajesRipolletData() {
		fetch('http://localhost:8080/garajes/ripollet-barcelona')
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
			this.setState({ garajesRipolletData: jsonResult });
		});
	}

	garajesBarcelonaData() {
		fetch('http://localhost:8080/garajes/barcelona-barcelona')
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

			console.log('labels are OK');

			const garajesTossaCountDocuments = _.map(this.state.garajesTossaData, "countDocuments");
			const garajesRubiCountDocuments = _.map(this.state.garajesRubiData, "countDocuments");
			const garajesRipolletCountDocuments = _.map(this.state.garajesRipolletData, "countDocuments");
			const garajesBarcelonaCountDocuments = _.map(this.state.garajesBarcelonaData, "countDocuments");

			this.chartData =  {
	      labels: garajesBarcelonaLabels,
	    	datasets: [
	    		{
	    			label: "Garajes Tossa",
						fillColor: "rgba(256,256,256,0.1)",
						pointColor: "rgba(220,220,220,1)",
	    			data: garajesTossaCountDocuments
					},
					{
	    			label: "Garajes Rubi",
						fillColor: "rgba(256,256,256,0.1)",
						pointColor: "rgba(220,220,220,1)",
	    			data: garajesRubiCountDocuments
					},
					{
	    			label: "Garajes Ripollet",
						fillColor: "rgba(256,256,256,0.1)",
						pointColor: "rgba(220,220,220,1)",
	    			data: garajesRipolletCountDocuments
					},
					{
	    			label: "Garajes Barcelona",
						fillColor: "rgba(256,256,256,0.1)",
						pointColor: "rgba(220,220,220,1)",
	    			data: garajesBarcelonaCountDocuments
					}
				]
			};

		}

    return <BarChart data={this.chartData} options={this.chartOptions} width="600" height="400"/>
  }
};
