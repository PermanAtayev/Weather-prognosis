const path = require('path');
const geocode = require( './utils/geocode' );
const forecast = require( './utils/forecast' );
const express = require( 'express' );
const app = express();
const hbs = require( 'hbs' );
const port = process.env.PORT || 3000;

// Setup handlebars
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials( path.join(__dirname, "../templates/partials"));

// setting up the view engine
app.set( "view engine", "hbs"  );

// static directory to serve
app.use( express.static( path.join( __dirname, "../public" ) ) );

app.get("", (req, res) => {
    res.render( "index.hbs", {
        title: "Weather App",
        name: "Perman Atayev"
    });
} )

app.get( "/about", (req, res) => {
    res.render( "about.hbs", {
        title: "About me",
        name: "Perman Atayev"
    });
});

app.get( "/help", (req, res) => {
    res.render("help.hbs", {
        title: "How can I help you?",
        name: "Perman Atayev"
    })
} )

/*
[get the weather forecast endpoint]
input must contain a location that will be converted to latitude and longtitude
 */
app.get( "/weather", async ( req, res ) => {
    if( !req.query.address && !req.query.longitude ){
        return res.send(
            {
                error: "Address must be provided"
            }
        )
    }

    if(req.query.address){
    const location = req.query.address;
    geocode( location, function( error, { latitude, longitude, location } = {} ) {
            if( error )
                return res.send( { error } );

            if( location.length === 0 )
                return res.send( { error: "Please enter a valid location" } );

            forecast(latitude, longitude, (error, response) => {
                if (error)
                    return res.send({error});

                console.log(location);
                return res.send({
                    forecast: response,
                    location
                })
            })
        } )
    }
    else if(req.query.longitude) {
        const longitude = req.query.longitude
        const latitude  = req.query.latitude

        console.log(longitude, latitude)

        await forecast(latitude, longitude, (error, response) => {
            if (error)
                return res.send({error});

            return res.send({
                forecast: response,
                location: "Latitude: " + latitude + " longitude: " + longitude
            })
        })
    }


} )

app.get( "/products", (req, res) => {
    if( !req.query.search ){
        return res.send({
            error: "You must provide a search term"
        });
    }
    console.log( req.query );
    return res.send( {
        products: []
    })
} )

app.get("/help/*", (req, res) => {
    res.send("Help article not found");
})

app.get( "*", (req, res) => {
    res.render( "404.hbs", {
        title: "Page not found - 404",
        name: "Perman Atayev"
    });     
} )



app.listen( port, () => {
    console.log( "Server is running on localhost:" + port );
} )
