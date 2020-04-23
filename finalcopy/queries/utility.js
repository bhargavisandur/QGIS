// Utility functions
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const moment = require('moment-timezone');
const nodeGeocoder = require('node-geocoder');
const fs = require('fs');
const path = require('path');

const getLocation = async (filename) => {
    try {
        const { stdout, stderr } = await exec(
            'exiftool -c "%.6f" ./public/images/' + filename
        );
        // console.log(`stderr:${stderr}`);

        let location = '';
        // console.log(stdout);
        const lines = stdout.toString().split('\n');
        lines.forEach((line) => {
            const parts = line.split(':');
            if (
                parts[0].trim() === 'GPS Latitude' ||
                parts[0].trim() === 'GPS Longitude'
            )
                location += parts[0].trim() + '=' + parts[1].trim() + ' ';
        });
        // console.log(location);
        return location;
    } catch (error) {
        console.log(`error: ${error.message}`);
        return;
    }
};

const matchImage = async (filename) => {
    try {
        console.log(__dirname);
        const image = path.join(
            path.dirname(fs.realpathSync(__filename)),
            `../public/images/${filename}`
        );
        console.log(image);
        const { stdout, stderr } = await exec(
            `cd ImageRecognition && python3 recognize_faces_image.py --encodings encodings.pickle --image ${image}`
        );
        // console.log(`stderr:${stderr}`);

        let output = stdout.split('\n');
        return output;
        //return !output[2].includes('Unknown');
    } catch (error) {
        console.log(`Error:${error}`);
        return;
    }
};

const findGender = async (filename) => {
    try {
        console.log(__dirname);
        const image = path.join(
            path.dirname(fs.realpathSync(__filename)),
            `../public/images/${filename}`
        );
        const { stdout, stderr } = await exec(
            `cd GenderRecognition && python3 AgeGender.py --input ${image}`
        );
        return stdout;
    } catch (error) {
        console.log(`Error: ${error}`);
        return;
    }
};

const getDateTime = () => {
    const m = moment.tz('Asia/Calcutta').format();
    const date = m.slice(0, 10);
    const time = m.slice(11, 19);
    return { date: date, time: time };
};

//to convert string address to latitude and longitude

let options = {
    provider: 'openstreetmap',
};
let geoCoder = nodeGeocoder(options);

var loc = '';
const tolatlong = async (locate) => {
    await geoCoder
        .geocode(locate)
        .then((res) => {
            const lat = res[0].latitude;
            const long = res[0].longitude;
            loc = 'Latitude=' + lat + ' ' + 'Longitude=' + long;
        })
        .catch((err) => {});
    return loc;
};

module.exports = {
    getLocation,
    getDateTime,
    tolatlong,
    matchImage,
    findGender,
};
