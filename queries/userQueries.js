const pool = require('../pool');
const utility = require('./utility');
const fs = require('fs');

const addVictimData = async (req, res) => {
	// console.log(req.file);
	// console.log(req.body);
	const uid = req.params.id;
	const { path, filename } = req.file;
	const { sex, age, pwdstat, activity, description } = req.body;
	let location;
	location = await utility.getLocation(filename)
	console.log(location);
	// console.log(path);
	const { date, time } = utility.getDateTime();
	pool.query(
		'INSERT INTO victim (sex, age, pwdstat, activity, description, date, time, location, image, uid) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
		[
			sex,
			age,
			pwdstat,
			activity,
			description,
			date,
			time,
			location,
			path,
			uid
		],
		(error, result) => {
			if (error) throw error;
			res.status(200).send(`Victim added with id: ${result.insertId}`);
		}
	);
};

module.exports = { addVictimData };
