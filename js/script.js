/* Javascript permettant un défilement avec une durée */


$(document).ready(function () {

    $('html').on('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $('html').on('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });


    $('#bloc_centre').css("height", $('body').height() - $('.pied-de-page').height());
    $('.js-scrollTo').on('click', function () { // Au clic sur un élément
        var page = $(this).attr('href'); // Page cible
        var speed = 750; // Durée de l'animation (en ms)
        $('html, body').animate({scrollTop: $(page).offset().top}, speed); // Go
        return false;
    });

    $('#ajoutPhoto').click(function () {
        affHTML("ajoute.html");
    });

    $('#supprimerPhoto').click(function () {
        affHTML("supprimer.html");
    });

    $('#share').click(function () {
        affHTML("share.html");
    });


    $('.img_doss').click(function () {
        console.log('trqsds');
        $(this).css("background-color", "#ffb7b7");
    });

    function toggleAff() {
        if ($('.canvas').css('display') == 'block') {

            $('.canvas').css('display', 'none');
            $('.canvas_container').text("");
        }
        else {
            $('.canvas').css('display', 'block');
        }
    }

    function affHTML(url) {
        toggleAff();
        $('.canvas_container').load("canvas/" + url, function () {
            if(url === "ajoute.html"){
                $('.upload-area').on('dragenter', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });

                $('.upload-area').on('dragover', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });

                $('.upload-area').on('drop', function (e) {
                    e.stopPropagation();
                    e.preventDefault();

                    var file = e.originalEvent.dataTransfer.files;
                    var fd = new FormData();

                    fd.append('file', file[0]);

                    uploadData(fd);
                });

            }
            $("#quit").click(function () {
                toggleAff();
            });
        });
    }
});

function uploadData(formdata) {
    $.ajax({
        url: 'php/upload.php',
        type: 'post',
        data: formdata,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            alert("Success\n" + response);
            show(response);
        },

        error: function (context, text, error) {
            alert("Failure\n" + context.responseText + "\n" + text + "\n" + error);
        }
    });
}

function show(img) {
    //$("#image_upload").append()
}
                
