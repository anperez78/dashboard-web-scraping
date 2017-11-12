import React, { Component } from 'react';
var _ = require('lodash');
var moment = require('moment');
import {Line} from 'react-chartjs-2';


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
		fetch('http://localhost:8080/pisos/tossa-de-mar-girona/aggregate')
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
			this.setState({ pisosTossaData: jsonResult });
		});
	}

	pisosRubiData() {
		fetch('http://localhost:8080/pisos/rubi-barcelona/aggregate')
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
			this.setState({ pisosRubiData: jsonResult });
		});
	}

	pisosRipolletData() {
		fetch('http://localhost:8080/pisos/ripollet-barcelona/aggregate')
    .then((result) => {
			return result.json();
    })
		.then((jsonResult) => {
			this.setState({ pisosRipolletData: jsonResult });
		});
	}

	pisosBarcelonaData() {
		fetch('http://localhost:8080/pisos/barcelona-barcelona/aggregate')
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
						fill: false,
						borderColor: 'green',
	    			data: pisosTossaAvgPrice
					},
					{
	    			label: "pisos Rubi",
						fill: false,
						borderColor: 'blue',
	    			data: pisosRubiAvgPrice
					},
					{
	    			label: "pisos Ripollet",
						fill: false,
						borderColor: 'red',
	    			data: pisosRipolletAvgPrice
					},
					{
	    			label: "pisos Barcelona",
						fill: false,
						borderColor: 'purple',
	    			data: pisosBarcelonaAvgPrice
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
