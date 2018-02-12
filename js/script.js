$(function () {
    var images = ["photo.jpeg", "photo2.jpg", "photo3.jpg", "photo4.jpg", "photo5.jpg", "photo6.jpg", "photo7.jpg", "photo8.jpg"];

    var start = 0;

    $('.photo').each(function(index) {
        $(' <img src="images\\' + images[index] + '"> ').appendTo(this);
    });
});