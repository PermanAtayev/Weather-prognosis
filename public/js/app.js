
const weatherForm = document.querySelector( "form" );
const searchElement = document.querySelector( "input" );
const messageOne = document.querySelector( "#m1" );
const messageTwo = document.querySelector( "#m2" );

weatherForm.addEventListener( "submit", (event) => {
    event.preventDefault();

    const location = searchElement.value;

    messageOne.innerHTML = "Loading...";
    messageTwo.innerHTML = " ";

    fetch( "http://localhost:3000/weather?address=" + location ).then((response) => {
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