/* Javascript permettant un défilement avec une durée */


$(document).ready(function () {
    rmTmp();

    affPage("modif.html");

    $('html').on('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $('html').on('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });


    /*$('#bloc_centre').css("height", $('body').height() - $('.pied-de-page').height());
    $('.js-scrollTo').on('click', function () { // Au clic sur un élément
        var page = $(this).attr('href'); // Page cible
        var speed = 750; // Durée de l'animation (en ms)
        $('html, body').animate({scrollTop: $(page).offset().top}, speed); // Go
        return false;
    });*/

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

                $('.lien_dossiers').click(function () {
                    affPage('')
                })

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
                    $(this).css("background-color", "#ffb7b7");
                });
            }
            if (url === "modif.html") {
                var images = ["photo.jpeg", "photo2.jpg", "photo3.jpg", "photo4.jpg", "photo5.jpg", "photo6.jpg", "photo7.jpg", "photo8.jpg"];

                var start = 0;

                $('.photo').each(function(index) {
                    $(' <img src="images\\' + images[index] + '"> ').appendTo(this);
                });

                $('#arrow-right').click(function () {
                    if(start + 5 < images.length) {
                        start++;
                        $('.photo img').remove();
                        $('.photo').each(function (index) {
                            $(' <img src="images\\' + images[index+start] + '"> ').appendTo(this);
                        });
                    }
                });

                $('#arrow-left').click(function () {
                    if(start > 0) {
                        start--;
                        $('.photo img').remove();
                        $('.photo').each(function (index) {
                            $(' <img src="images\\' + images[index+start] + '"> ').appendTo(this);
                        });
                    }
                });

                $('.photo').click(function (e) {
                    if(e.target.src != undefined) {
                        var images = $('#apercu, #original');
                        images.find('img').remove();
                        $(' <img src="' + e.target.src + '"> ').prependTo(images);
                    }
                });

                $('#contrasteSlider').on("input", function () {
                    $('#contrasteVal').val(this.value);
                });

                $('#contrasteVal').on("keyup", function () {
                    if(!isNaN(this.value)){
                        var val;
                        if(+this.value < 0){
                            val = 0;
                        } else if(+this.value >= 100){
                            val = 100;
                        } else {
                            val = +this.value;
                        }
                        $('#contrasteSlider').val(val);
                    }
                });
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
                        $("#error").html("Nom de dossier invalide")
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
            console.log(e);
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



