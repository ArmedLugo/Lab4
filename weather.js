const credentials = require('./credentials.js')
const request = require('request')

const Location = function(place) {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?access_token=' + credentials.MAPBOX_TOKEN
  console.log(url)
  request({ url, json: true }, function(error, response) {
    if (error) {
      consolelog(error.Error)
    } else {
      const data = response.body

      if ( data.Response == 'False' ) {
        console.log('Error: ' + data.Error)
      } else {
        const info = {
          x: data.features[1].geometry.coordinates[0],
          y: data.features[1].geometry.coordinates[1]
        }

        Resumen(info.x, info.y)
      }
    }
  })
}


const Resumen = function(x, y) {
  const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY +
              '/' + x + ',' + y
  request({ url, json: true }, function(error, response) {
    const data = response.body
    const info = {
      temperatura : data.currently.temperature,
      humedad : data.currently.humidity,
      condicion : data.currently.summary
    }
    console.log('Temperatura Actual ' + info.temperatura + ' Grados, con humedad de ' + info.humedad + 
    ' y un día ' + info.condicion)
  })
}

module.exports = {
  Location : Location,
  Resumen : Resumen
}
