$(document).ready(function() {
    mySection.addEvenlistener('click', function() {
        console.log("the button was pressed")
    })
    $("#section").load("../sections/home-section.html");

})