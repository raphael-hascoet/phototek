/* Javascript permettant un défilement avec une durée */


$(document).ready(function () {
    rmTmp();

    affPage("dossiers.html");

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
        affCanvas("ajoute.html");
    });

    $('#supprimerPhoto').click(function () {
        affCanvas("supprimer.html");
    });

    $('#share').click(function () {
        affCanvas("share.html");
    });


    $('.img_doss').click(function () {
        console.log('trqsds');
        $(this).css("background-color", "#ffb7b7");
    });

    function toggleAff() {
        rmTmp();
        if ($('.canvas').css('display') == 'block') {

            $('.canvas').css('display', 'none');
            $('.canvas_container').text("");
        }
        else {
            $('.canvas').css('display', 'block');
        }
    }

    function affPage(url) {
        $('#main').load("html/" + url, function () {
            if (url === "dossiers.html") {

            }
            if (url === "modif.html") {

            }
        });
    }

    function affCanvas(url) {
        toggleAff();
        $('.canvas_container').load("canvas/" + url, function () {
            if (url === "ajoute.html") {

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

                    var files = e.originalEvent.dataTransfer.files;
                    var fd = new FormData();

                    for (var i = 0; i < files.length; i++) {
                        fd.append(files[i].name, files[i]);
                    }

                    uploadTmp(fd);
                });

                $('#envoi').on('click', function (e) {
                    e.preventDefault();
                    var folder = $('#folder');
                    if (/^[a-zA-Z][a-zA-Z\s]*$/.test(folder.val())) {
                        uploadData(folder.val());
                    } else {
                        $("#error").html("Nom de fichier invalide")
                    }
                });

            }
            $("#quit").click(function () {
                toggleAff();
            });
        });
    }

    function uploadTmp(formdata) {
        $.ajax({
            url: 'php/index.php/uploadtmp',
            type: 'post',
            data: formdata,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (response) {
                alert("Success\n" + JSON.stringify(response));
                response.forEach(function (img) {
                    show(img);
                })
            },

            error: function (context, text, error) {
                alert("Failure\n" + context.responseText + "\n" + text + "\n" + error);
            }
        });
    }

    function uploadData(folder) {
        alert(folder);
        $.post('php/index.php/upload/' + folder, function (e) {
            toggleAff();
        });
    }

    function rmTmp() {
        $.post('php/index.php/rmtmp');
    }

    function show(img) {
        var table = $("#upload-file table");
        if (table.last().find("td").length % 5 == 0) {
            table.append('<tr></tr>');
        }
        table.last().append("<td> <figure> <img src='tmp/" + img.name + "'> <figcaption>" + img.name + "</figcaption> </figure> </td>");
    }

});



