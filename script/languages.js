$(document).ready(function() {
    setTimeout(() => {
        $.getJSON('../data/languages.json', function(res) {
            if (res) {
                res['languages'].forEach(element => {
                    const childs = '<div class="n-p">' +
                        '<p class="name">' + element.name + '</p>' +
                        '<div class="percentage">' + element.percentage + '</div>' +
                        '</div>' +
                        '<div class="container">' +
                        `<div class="rectangle ${element.name}"></div>` +
                        '</div>';
                    $(childs).appendTo('.languages');
                });
            }
        })
    }, 3000);


})