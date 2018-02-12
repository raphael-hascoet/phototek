$(function () {
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
});