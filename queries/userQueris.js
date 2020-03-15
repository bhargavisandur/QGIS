const pool = require('../pool');
const utility = require('./utility');

const addVictimData = (req, res) => {
	const { filename } = req.file;
	const { sex, age, pwdstat, activity, description } = req.body;
	const location = utility.getLocation(filename);
	const { date, time } = utility.getDateTime();
	pool.query(
		'INSERT INTO victim (sex, age, pwdstat, activity, description, date, time, location, image) values($1, $2, $3, $4, $5, $6, $7, $8, $9)',
		[
			sex,
			age,
			pwdstat,
			activity,
			description,
			date,
			time,
			location,
			bytea('./Images/' + filename)
		],
		(error, result) => {
			if (error) throw error;
			res.status(200).send(`Victim added with id: ${result.insertId}`);
		}
	);
};
