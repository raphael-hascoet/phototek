/* Javascript permettant un défilement avec une durée */
var selectedItem;

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

    $.post('php/index.php/imagick');


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


    function fermerLoader() {

        $(".loader").remove();
    }
    function affPage(url) {
        $('#main').load("html/" + url.split('/')[0], function () {

            $('.lien_dossiers').click(function (e) {
                e.preventDefault();
                affPage('dossiers.html');
            });

            if (url === "dossiers.html") {

                $.ajax({
                    url: 'php/index.php/dossiers',
                    type: 'get',
                    dataType: 'json',
                    success: function (response) {
                        console.log("marche !");
                        fermerLoader();
                        var tabDossier = response;
                        tabDossier.forEach(function(e) {
                            $('#dossier').append(" <figure class='dossiers' id=doss_"+e['id']+"><div class='img_doss'><img src='images/index.png'></div><figcaption>"+e['nom']+"</figcaption></figure>");


                        });

                        $('.dossiers').click(function() {
                            var dossiers = $('.dossiers');
                            var dossier = $(this);
                            var doss_id = dossier.attr('id').split("_");
                            dossiers.removeClass('active');
                            if(selectedItem === doss_id) {
                                dossier.removeClass('active');
                            }
                            else {
                                dossier.addClass('active');
                                selectedItem = doss_id;
                            }

                        });
                        $('.dossiers').dblclick(function () {
                            var dossier = $(this);
                            var doss_id = dossier.attr('id').split("_");
                            console.log("pt");
                            affPage("imagesDoss.html/"+doss_id[1]);
                        })
                    },

                    error: function (context, text, error) {
                        alert("Failure\n" + context.responseText + "\n" + text + "\n" + error);
                    }
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
                    $(this).css("background-color", "#ffb7b7");
                });
            }

            if(url.split('/')[0] === "imagesDoss.html") {
                var idDoss = url.split('/')[1];

                $.ajax({
                    url: 'php/index.php/images/'+idDoss,

                    type: 'get',
                    dataType: 'json',
                    success: function (response) {
                        fermerLoader();
                        var tabImages = response;
                        $('#dossier').append("<figure class='image' id=return><div class='img_doss'><img src='images/index.png'></div><figcaption>../</figcaption></figure>");
                        tabImages.forEach(function(e) {
                            $('#dossier').append("<figure class='image' id=img_"+e['id']+"><div class='img_doss'><img src='upload/"+idDoss+"/"+e['id']+"."+e['mime']+"'></div><figcaption>"+e['nom']+"</figcaption></figure>");
                        });
                        $('.image').dblclick(function () {
                            var image = $(this);

                            id = image.attr('id');
                            if(id === "return") {
                                affPage("dossiers.html");
                            }
                            else {

                                affPage("modif.html/"+id.split("_")[1]);
                            }
                        }).click(function (e) {
                            $(this).toggleClass("active");

                            var images = $('.image');
                            var image = $(this);
                            var textTag = $('#tag_input');
                            var buttonTag = $('#tag_button');
                            buttonTag.prop('disabled',false);
                            var img_id = image.attr('id').split("_")[1];
                            images.removeClass('active');
                            if (selectedItem === img_id) {
                                image.removeClass('active');

                            }
                            else {
                                image.addClass('active');
                                selectedItem = img_id;
                            }

                            $.ajax({
                                url: 'php/index.php/images/infos/' + img_id,
                                type: 'get',
                                dataType: 'json',
                                success: function (response) {
                                    console.log(response);
                                    $('#info_nom').html(response['nom']);
                                    $('#info_taille').html(response['width']+"x"+response['height']);
                                    $('#info_poids').html(response['taille']);
                                    $('#info_last_modif').html(response['date']);
                                    $('#tag').html("");
                                    response['tags'].forEach(function(e) {
                                        $('#tag').append("<li>"+e['label']+"<span id='tag_"+e['id']+"' class='deleteTag'>X</span></li>")
                                    });

                                    $('.deleteTag').click(function() {
                                        var idTag = $(this).attr('id').split('_')[1];
                                        console.log(idTag);

                                        $.ajax({
                                            url: 'php/index.php/tag/delete/'+3,

                                            success: function (response) {
                                                console.log(response);
                                            }
                                        });
                                    })

                                },

                                error: function (context, text, error) {
                                    console.log("Failure\n" + context.responseText + "\n" + text + "\n" + error);
                                }
                            });
                        });
                    },

                    error: function (context, text, error) {
                        console.log("Failure\n" + context.responseText + "\n" + text + "\n" + error);
                    }
                });
            }

            if (url.split('/')[0] === "modif.html") {
                var idPhoto = url.split('/')[1];

                //console.log(idPhoto);
                var images = [];

                $.post('php/index.php/imagesfolder/' + idPhoto, function (e) {

                    var selectedOptJq = $('#outils option:first-child');
                    var selectedOpt = selectedOptJq.val();

                    var defaultValsOpts = {"contraste": 5, "saturation": 100, "luminosite": 100, "teinte" : 100};
                    var valsOpts = Object.assign({}, defaultValsOpts);

                    var maxOpts = {"contraste": 10, "saturation": 500, "luminosite": 200, "teinte": 200};

                    var result = JSON.parse(e);
                    var images = result['photos'];

                    $('#original, #apercu').each(function () {
                        $('<img src="upload/' + result['folder'] + '/' + idPhoto + '.jpg">').appendTo(this);
                    });

                    var posSelected = images.findIndex(function (e) {
                        return e['id'] === idPhoto;
                    });

                    var selected = '#footer_' + idPhoto;

                    var idSelected = idPhoto;

                    var start = posSelected;

                    if (start + 5 > images.length) {
                        if (images.length >= 5) {
                            start = images.length - 5;
                        } else {
                            start = 0;
                        }
                    }


                    $('.photo').each(function (index) {
                        var img = images[index + start];
                        if (img != null) {
                            $('<img src="upload/' + result['folder'] + '/' + img['id'] + '.' + img['mime'] + '" id="footer_' + img['id'] + '">').appendTo(this);
                        }
                    });

                    update(defaultValsOpts, selectedOpt);

                    $(selected).parent().addClass('selected_footer');

                    $('#arrow-right').click(function () {
                        if (start + 5 < images.length) {
                            start++;
                            $('.photo img').remove();
                            $('.photo').each(function (index) {
                                var img = images[index + start];
                                $('<img src="upload/' + result['folder'] + '/' + img['id'] + '.' + img['mime'] + '" id="footer_' + img['id'] + '">').appendTo(this);
                            });
                            $('.selected_footer').removeClass('selected_footer');
                            $(selected).parent().addClass('selected_footer');
                        }
                        if (images.length <= 5 && start + 1 < images.length) {
                            start++;
                            $('.selected_footer').removeClass('selected_footer');
                            $(selected).parent().addClass('selected_footer');
                        }
                    });

                    $('#arrow-left').click(function () {
                        if (start > 0 && images.length > 5) {
                            start--;
                            $('.photo img').remove();
                            $('.photo').each(function (index) {
                                var img = images[index + start];
                                $('<img src="upload/' + result['folder'] + '/' + img['id'] + '.' + img['mime'] + '" id="footer_' + img['id'] + '">').appendTo(this)
                            });
                            $('.selected_footer').removeClass('selected_footer');
                            $(selected).parent().addClass('selected_footer');
                        }
                        console.log("oui");
                        if (start > 0 && images.length <= 5) {
                            start--;
                            $('.selected_footer').removeClass('selected_footer');
                            $(selected).parent().addClass('selected_footer');
                        }
                    });

                    $('.photo').click(function (e) {
                        if (e.target.src !== undefined) {
                            var imagesCentre = $('#apercu, #original');
                            imagesCentre.find('img').remove();
                            $(' <img src="' + e.target.src + '"> ').prependTo(imagesCentre);
                            $('.selected_footer').removeClass('selected_footer');
                            $(e.target).parent().addClass('selected_footer');
                            selected = '#' + e.target.id;

                            valsOpts = Object.assign({}, defaultValsOpts);
                            update(valsOpts, selectedOpt);
                        }
                    });

                    function update(valOpts, selectedOpt) {
                        idSelected = selected.split('_')[1];
                        var photoUpdate = images.find(function (e) {
                            return e['id'] === idSelected;
                        });
                        posSelected = images.findIndex(function (e) {
                            return e['id'] === idSelected;
                        });
                        console.log(photoUpdate);
                        $('#info_nom').html(photoUpdate['nom']);
                        $('#info_taille').html(photoUpdate['exif']['COMPUTED']['Width'] + 'x' + photoUpdate['exif']['COMPUTED']['Height'] + 'fpx');
                        $('#info_poids').html(photoUpdate['exif']['FileSize']);
                        $('#info_last_modif').html(photoUpdate['exif']['FileDateForm'] + "</br>" + photoUpdate['exif']['FileHourForm']);

                        $('#imgSlider').val(valsOpts[selectedOpt]);
                        $('#imgVal').val(valsOpts[selectedOpt]);

                        $.post('php/index.php/rmtmpimage');
                    }


                    $('#formoutils').submit(function (e) {
                        return false;
                    });

                    $('#outils').change(function (){
                        selectedOpt = this.value;
                        $('#titreSlider').html($(this).find('option:selected').text());
                        $('#imgSlider').attr('max', maxOpts[selectedOpt]);
                        $('#imgSlider').val(valsOpts[selectedOpt]);
                        $('#imgVal').val(valsOpts[selectedOpt]);
                    });

                    $('#imgSlider').on("input", function (e) {
                        e.preventDefault();
                        $('#imgVal').val(this.value);

                        updateImg(valsOpts[selectedOpt], this.value, selectedOpt, valsOpts);
                        valsOpts[selectedOpt] = this.value;
                    });

                    $('#imgVal').on("keyup", function (e) {
                        e.preventDefault();
                        console.log("oui");
                        if (!isNaN(this.value)) {
                            var val;
                            if (+this.value < 0) {
                                val = 0;
                            } else if (+this.value >= maxOpts[selectedOpt]) {
                                val = maxOpts[selectedOpt];
                            } else {
                                val = +this.value;
                            }
                            updateImg(valsOpts[selectedOpt], val, selectedOpt, valsOpts);
                            valsOpts[selectedOpt] = val;
                            $('#imgSlider').val(val);
                        }
                    });

                    function updateImg(oldVal, newVal, opt, valsOpts) {

                        valsOpts[opt] = newVal;

                        console.log(valsOpts);

                        var valsOptsRet = Object.assign({}, valsOpts);

                        valsOptsRet["contraste"] = ((5 - valsOpts["contraste"]) * -1);

                        console.log(valsOptsRet);

                        $.post('php/index.php/modif_image/' + idSelected, valsOptsRet, function () {
                            var apercu = $('#apercu');
                            console.log('modif');
                            apercu.find('img').attr('src', "tmp/tmpimage.jpg?" + new Date().getTime());
                        });
                    }

                    $('#btEnregistrer').click(function (e) {
                        e.preventDefault();
                        $.post('php/index.php/savemodifs/' + idSelected, function (e) {
                            $('#original').find('img').attr('src', "upload/" + e + "?" + new Date().getTime());
                            $(selected).attr('src', "upload/" + e + "?" + new Date().getTime());

                            valsOpts = Object.assign({}, defaultValsOpts);
                            update(valsOpts, selectedOpt);
                        });
                    });

                    $('#btToutAnnuler').click(function (e) {
                        e.preventDefault();
                        $.post('php/index.php/rmtmpimage', function (e) {
                            var apercu = $('#apercu');

                            apercu.find('img').attr('src', $('#original').find('img').attr('src') + "?" + new Date().getTime());

                            valsOpts = Object.assign({}, defaultValsOpts);
                            update(valsOpts, selectedOpt);
                        })
                    });

                });

                //var images = ["photo.jpeg", "photo2.jpg", "photo3.jpg", "photo4.jpg", "photo5.jpg", "photo6.jpg", "photo7.jpg", "photo8.jpg"];

            }
        });
    }

    function affCanvas(url) {
        toggleAff();
        $('.canvas_container').load("canvas/" + url, function () {

            if(url === "supprimer.html") {
                if(selectedItem != null) {


                }
                else {
                    alert("Selectionnez un dossier !");
                    toggleAff();
                }
                console.log(selectedItem);
            }

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
            affPage("dossiers.html");
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



