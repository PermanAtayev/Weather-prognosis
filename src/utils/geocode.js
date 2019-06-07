const request = require( 'request' );

const geocode = ( address, callback ) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent( address ) + ".json?access_token=pk.eyJ1IjoianVzdG1hc3Rlcml0OTkiLCJhIjoiY2p2eTk1aDI2MGNlNzQzbXp5N3ZnNzdqciJ9.W12RivXFbVhvhAZ_fOQzxQ&limit=1"

    request( { url, json: true }, ( error, { body } ) => {

        if( error ){
            callback( 'Unable to connect to location services' );
        }
        else if( body.features.length === 0 ){
            callback( 'Could not find the location' );
        }
        else{
            const data = {
                latitude: body.features[ 0 ].center[ 1 ],
                longtitude: body.features[ 0 ].center[ 0 ],
                location: body.features[ 0 ].place_name
            }

            callback( undefined, data );
        }

    } )
}

module.exports = geocode;