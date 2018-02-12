/* Javascript permettant un défilement avec une durée */



$(document).ready(function() {
                
                
                $('#bloc_centre').css("height",$('body').height()-$('.pied-de-page').height());
                
                    $('.js-scrollTo').on('click', function() { // Au clic sur un élément
                    var page = $(this).attr('href'); // Page cible
                    var speed = 750; // Durée de l'animation (en ms)
                    $('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
                    return false;
                });

                $('#ajoutPhoto').click(function () {
                    affHTML("ajoute.html");
                });

                $('#supprimerPhoto').click( function() {
                    affHTML("supprimer.html");
                });

                $('#share').click( function() {
                    affHTML("share.html");
                });


                
                $('.img_doss').click(function() {
                    console.log('trqsds');
                   $(this) .css("background-color","#ffb7b7");
                });
                    
                function toggleAff() {
                    if($('.canvas').css('display') == 'block') {
                       
                        $('.canvas').css('display','none');
                        $('.canvas_container').text("");
                    }
                    else {
                        $('.canvas').css('display','block');
                    }
                }

                function affHTML(url) {
                    toggleAff();
                    $('.canvas_container').load(url, function() {
                        $("#quit").click(function() {
                            toggleAff();
                        });
                    });
                }
});    
                
