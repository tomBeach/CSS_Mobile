$(document).ready(function() {
    console.log("======= jQuery OK =======");
    console.log("window.orientation:", window.orientation);

    function initialize() {
        console.log("== initialize ==");
        $('.menu-btn[0]').on('mousedown', toggleMenuLink);
        $('.menu-btn').on('mousedown', toggleMenuLink);
        // $('.menu-btn').on('mouseup', toggleMenuLink);
        $('#toggle-menu').on('mousedown', toggleMenu);
    }
    function toggleMenu() {
        console.log("== toggleMenu ==");
        if ($('#side-menu').css('margin-left') == '-120px') {
            $('#side-menu').css('margin-left', '0');
        } else {
            $('#side-menu').css('margin-left', '-120px');
        }
    }
    function toggleMenuLink(e) {
        console.log("== toggleMenuLink ==");
        console.log("$('.menu-btn')[0]:", $('.menu-btn')[0]);
        console.log("$('.menu-btn').length:", $('.menu-btn').length);
        console.dir( $._data(day, 'events') );
        console.dir( $._data(week, 'events') );
        var whichPix = e.currentTarget.id;
        var dayScroll = $('#day-pix').offset().top - 60;
        var weekScroll = $('#week-pix').offset().top - 60;
        var monthScroll = $('#month-pix').offset().top - 60;
        console.log("whichPix:", whichPix);
        console.log("dayScroll:", dayScroll);
        console.log("weekScroll:", weekScroll);
        console.log("monthScroll:", monthScroll);
        if ($('#' + whichPix).css('background-color') == 'rgb(14, 11, 22)') {
            $('.menu-btn').css('background-color', 'rgb(14, 11, 22)');
            $('#' + whichPix).css('background-color', 'rgb(255, 0, 0)');
        } else {
            $('#' + whichPix).css('background-color', 'rgb(14, 11, 22)');
        }
        switch (whichPix) {
            case "day":
            var dayScroll = $('#day-pix').offset().top - 60;
            var weekScroll = $('#week-pix').offset().top - 60;
                $('html, body').animate({
                    scrollTop: dayScroll
                }, 300);
                break;
            case "week":
            var dayScroll = $('#day-pix').offset().top - 60;
            var weekScroll = $('#week-pix').offset().top - 60;
                $('html, body').animate({
                    scrollTop: weekScroll
                }, 300);
                break;
            case "month":
                $('html, body').animate({
                    scrollTop: monthScroll
                }, 300);
                break;
            default:

        }
    }
    function checkImageWH(imageId) {
        console.log("== checkImageWH ==");
        // Get image
        var dayImage = $("#" + imageId);
        console.log("dayImage:", dayImage);

        // Create new image to test
        var newImage = new Image();
        newImage.src = dayImage.attr("src");

        // Get accurate measurements from that.
        var windowW = $(window).width();
        var imageW = newImage.width;
        var imageH = newImage.height;
        var maxWH = windowW*0.8;
        // var sectionH = getSectionHeight(windowW);
        var imgT = parseInt($(dayImage).css('top').slice(0, -2));
        if (imageW > imageH) {
            console.log("+++ landscape +++");
            var newH = parseInt((maxWH*imageH)/imageW);
            var topOffset = parseInt((320 - newH)/2);
            console.log("topOffset:", topOffset);
            var newT = imgT;
            $(dayImage).css('width', maxWH + 'px');
            $(dayImage).css('height', 'auto');
            $(dayImage).css('top', newT + 'px');
            $(dayImage).css('left', parseInt((320 - maxWH)/2) + 'px');
        } else {
            console.log("+++ portrait +++");
            var newW = parseInt((maxWH*imageW)/imageH);
            $(dayImage).css('width', newW + 'px');
            $(dayImage).css('height', maxWH + 'px');
            $(dayImage).css('top', newT + 'px');
            $(dayImage).css('left', parseInt((320 - newW)/2) + 'px');
        }
    }
    function getSectionHeight(windowW) {
        console.log("== getSectionHeight ==");
        if(window.innerHeight > window.innerWidth){
            console.log("+++ portrait +++");
        } else {
            console.log("+++ landscape +++");
        }
        return windowH;
    }

    initialize();
    checkImageWH("today-pic");
});
