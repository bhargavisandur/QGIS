// Utility functions
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const moment = require('moment-timezone');
const nodeGeocoder = require('node-geocoder');
const fs = require('fs');
const path = require('path');

// Get latitude and longitude from image

const getLocation = async (filename) => {
    try {
        const { stdout, stderr } = await exec(
            'exiftool -c "%.6f" ./public/images/' + filename
        );
        // console.log(`stderr:${stderr}`);

        let location = {
            lat: 0.0,
            lng: 0.0,
        };
        // console.log(stdout);
        const lines = stdout.toString().split('\n');
        lines.forEach((line) => {
            const parts = line.split(':');
            if (parts[0].trim() === 'GPS Latitude') {
                if (parts[1].trim().includes('N')) {
                    parts[1] = parts[1]
                        .trim()
                        .slice(0, parts[1].trim().length - 1);
                } else {
                    parts[1] =
                        '-' +
                        parts[1].trim().slice(0, parts[1].trim().length - 1);
                }
                location.lat = parseFloat(parts[1].trim());
            }
            if (parts[0].trim() === 'GPS Longitude') {
                if (parts[1].trim().includes('E')) {
                    parts[1] = parts[1]
                        .trim()
                        .slice(0, parts[1].trim().length - 1);
                } else {
                    parts[1] =
                        '-' +
                        parts[1].trim().slice(0, parts[1].trim().length - 1);
                }
                location.lng = parseFloat(parts[1].trim());
            }
        });
        // console.log(location);
        return location;
    } catch (error) {
        console.log(`error: ${error.message}`);
        return;
    }
};

// Match image with the trained model

const matchImage = async (filename) => {
    try {
        // console.log(__dirname);
        const image = path.join(
            path.dirname(fs.realpathSync(__filename)),
            `../public/images/${filename}`
        );
        // console.log(image);
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

// Get gender from image

const findGender = async (filename) => {
    try {
        // console.log(__dirname);
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

// Get date and time of upload

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

// Get min distance orphanage id
const getClosestOrphangeID = async (lat, lng, pool) => {
    try {
        const result = await pool.query('SELECT * FROM orphanage');
        const R = 6371;
        const lat1 = lat * (Math.PI / 180);
        const lng1 = lng * (Math.PI / 180);
        const orphanageArray = [];
        for (i = 0; i < result.rows.length; i++) {
            const r = result.rows[i];
            const lat2 = r.lat * (Math.PI / 180);
            const lng2 = r.lng * (Math.PI / 180);
            const latDiff = (lat2 - lat1) * (Math.PI / 180);
            const lngDiff = (lng2 - lng1) * (Math.PI / 180);
            const a =
                Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
                Math.cos(lat1) *
                    Math.cos(lat2) *
                    Math.sin(lngDiff / 2) *
                    Math.sin(lngDiff / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c;
            const obj = {
                distance: d,
                id: r.id,
            };
            orphanageArray.push(obj);
        }
        orphanageArray.sort((a, b) => {
            return a.distance - b.distance;
        });
        return orphanageArray[0];
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getLocation,
    getDateTime,
    tolatlong,
    matchImage,
    findGender,
    getClosestOrphangeID,
};
