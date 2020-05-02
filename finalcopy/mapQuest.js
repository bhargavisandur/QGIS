var request = require('request');

const findDistance=(lat1, long1, lat2, long2)=>{
  var jsonBod={
    "locations": [
     {
        "latLng": {
          "lat": lat1,
          "lng": long1
        }
      },
      {
        "latLng": {
          "lat": lat2,
          "lng": long2
        }
      }
    ],
    "options": {
      "allToAll": true
    }
  }

  var options = {
    'method': 'POST',
    'url': 'http://www.mapquestapi.com/directions/v2/routematrix?key=',
    'headers': {
      'Content-Type': 'text/plain',
      'Cookie': 'JSESSIONID=61D92926B7828EAA373803FF08E2BC78'
    },
    body: JSON.stringify(jsonBod)
  
  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    var obj= JSON.parse(response.body);
    console.log(obj.distance[0][1]);
    return obj.distance[0][1];
  });
  
}
findDistance(18.9410,72.8331, 19.038,72.9232);

module.exports={findDistance};