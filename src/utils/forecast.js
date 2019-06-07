const request = require( 'request' );

const forecast = ( x, y, callback ) => {
    const url = `https://api.darksky.net/forecast/dcf557913b8218c5558e2c463cdfc80b/${x},${y}?units=si`

    request( { url, json: true }, ( error, { body } ) => {
        if( error ){
            callback( 'No internet connection' );
        }
        else if( body.error ){
            callback( response.body.error );
        }
        else{
            data = body.daily.data[ 0 ].summary + `The temperature today is ${body.currently.temperature} Celsius and ${body.currently.precipProbability}% of the rain`;    
            callback( undefined, data );
        }
    } )

}

module.exports = forecast;