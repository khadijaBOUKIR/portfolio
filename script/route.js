setTimeout(() => {
    const homeTarget = document.getElementsByClassName('home');
    const aboutTarget = document.getElementsByClassName('about');
    homeTarget[0].addEventListener('click', function() {
        $("#section").load("../sections/home-section.html");
    })
    aboutTarget[0].addEventListener('click', function() {
        $("#section").load("../sections/about-section.html");
    })
}, 3000);