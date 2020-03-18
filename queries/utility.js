// Utility for userqueries
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const moment = require('moment-timezone');
let nodeGeocoder = require('node-geocoder');

const getLocation = async filename => {
	try {
		const { stdout, stderr } = await exec(
			'exiftool -c "%.6f" ./Images/' + filename
		);
		console.log(`stderr:${stderr}`);

		let location = '';
		console.log(stdout);
		const lines = stdout.toString().split('\n');
		lines.forEach(line => {
			const parts = line.split(':');
			if (
				parts[0].trim() === 'GPS Latitude' ||
				parts[0].trim() === 'GPS Longitude'
			)
				location += parts[0].trim() + '=' + parts[1].trim() + ' ';
		});
		console.log(location);
		return location;
	} catch (error) {
		console.log(`error: ${error.message}`);
		return;
	}

	// callback(location);
};

const getDateTime = () => {
	const m = moment.tz('Asia/Calcutta').format();
	const date = m.slice(0, 10);
	const time = m.slice(11, 19);
	return { date: date, time: time };
};

//to convert string address to latitude and longitude

let options = {
	provider: 'openstreetmap'
};
let geoCoder = nodeGeocoder(options);

var loc = '';
const tolatlong = async locate => {
	await geoCoder
		.geocode(locate)
		.then(res => {
			const lat = res[0].latitude;
			const long = res[0].longitude;
			loc = 'Latitude=' + lat + ' ' + 'Longitude=' + long;
		})
		.catch(err => {});
	return loc;
};

module.exports = {
	getLocation,
	getDateTime,
	tolatlong
};
