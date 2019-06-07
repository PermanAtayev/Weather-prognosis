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

app.get( "", (req, res) => {
    res.render( "index.hbs", {
        title: "Weather",
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

app.get( "/weather", ( req, res ) => {
    if( !req.query.address ){
        return res.send(
            {
                error: "Address must be provided"
            }
        )
    }
    const location = req.query.address;

    geocode( location, ( error, { latitude, longtitude, location } = {} ) => {
        if( error )
            return res.send( { error } );

        if( location.length === 0 ){
            return res.send( { error: "Please enter a valid location" } );
        }

        forecast( latitude, longtitude, ( error, response ) => {
                if( error )
                    return res.send( { error } );
                
                console.log( location );
                return res.send( {
                    forecast: response,
                    location
                } )    
         } )
        
    } )
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
        title: "404",
        name: "Perman Atayev"
    });     
} )



app.listen( port, () => {
    console.log( "Server is running on " + port );
} )
