
const weatherForm = document.querySelector( "form" );
const searchElement = document.querySelector( "input" );
const messageOne = document.querySelector( "#m1" );
const messageTwo = document.querySelector( "#m2" );
const GPS = document.querySelector("#GPS")

weatherForm.addEventListener( "submit", (event) => {
    event.preventDefault();

    const location = searchElement.value;

    messageOne.innerHTML = "Loading...";
    messageTwo.innerHTML = " ";

    fetch( "/weather?address=" + location ).then((response) => {
        response.json().then((data) => {
        
        if( data.error )
            messageOne.innerHTML = data.error;
        else{
            messageOne.innerHTML = data.location;
            messageTwo.innerHTML = data.forecast;
        }

    })
    })

} )

function showPosition(position) {
    fetch( "/weather?longitude=" + position.coords.longitude + "&latitude=" + position.coords.latitude )
        .then((response) => {
        response.json().then((data) => {

            if( data.error )
                messageOne.innerHTML = data.error;
            else{
                messageOne.innerHTML = data.location;
                messageTwo.innerHTML = data.forecast;
            }

        })
    })

}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        messageOne.innerHTML = "Geolocation is not supported by this browser.";
    }
}

GPS.onclick = function(){
    messageOne.innerHTML = "Loading..."
    getLocation()
}