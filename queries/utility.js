// Utility for userqueries
const { exec } = require('child_process');
const moment = require('moment-timezone');

const getLocation = (filename) => {
	exec('exiftool ' + filename, function(error, stdout, stderr) {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr:${stderr}`);
		}
		// const s=JSON.parse(stdout);
		// console.log(typeof(s));
		const location =  getLatLong(stdout);
		return location
	});
	const getLatLong = stdout => {
		const lines = stdout.toString().split('\n');
		lines.forEach(line => {
			const parts = line.split(':');
			// if (parts[0].trim() === 'Image Size') {
			// 	console.log(parts[0].trim() + ':' + parts[1]);
			// }
		});

	};
};

const getDateTime = () => {
	const m = moment.tz('Asia/Calcutta').format();
	const date = m.slice(0, 10);
	const time = m.slice(11, 19);
	return { date: date, time: time };
};

module.exports = {
	getLocation,
	getDateTime
};
