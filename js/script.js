$(document).ready(function() {
    console.log("======= jQuery OK =======");
    console.log("window.orientation:", window.orientation);

    function initialize() {
        console.log("== initialize ==");
        $('#toggle-menu-btn').on('mousedown', toggleMenu);
        console.log("window.innerWidth:", window.innerWidth);
        console.log("window.innerHeight:", window.innerHeight);
        if (window.innerWidth < 321) {
            checkImageWH("D_pic");
        }
    }
    function toggleMenu() {
        console.log("== toggleMenu ==");
        if ($('#side-menu').css('margin-left') == '-120px') {
            $('#side-menu').css('margin-left', '0');
            // == activate benu buttons
            // $('.menu-btn[0]').on('mousedown', toggleMenuLink);
            $('.menu-btn').on('mousedown', toggleMenuLink);
            // $('.menu-btn').on('mouseup', toggleMenuLink);
        } else {
            $('#side-menu').css('margin-left', '-120px');
        }
    }
    function toggleMenuLink(e) {
        console.log("== toggleMenuLink ==");
        // == change menu-item bg color
        if ($('#' + e.currentTarget.id).css('background-color') == 'rgb(14, 11, 22)') {
            $('.menu-btn').css('background-color', 'rgb(14, 11, 22)');
            $('#' + e.currentTarget.id).css('background-color', 'rgb(255, 0, 0)');
        } else {
            $('#' + e.currentTarget.id).css('background-color', 'rgb(14, 11, 22)');
        }

        // == scroll window to selected section
        switch (e.currentTarget.id) {
            case "day":
                $('html, body').animate({
                    scrollTop: $('#D_header').offset().top - 60
                }, 300);
                break;
            case "week":
                $('html, body').animate({
                    scrollTop: $('#W_header').offset().top - 60
                }, 300);
                break;
            case "month":
                $('html, body').animate({
                    scrollTop: $('#M_header').offset().top - 60
                }, 300);
                break;
            case "year":
                $('html, body').animate({
                    scrollTop: $('#Y_header').offset().top - 60
                }, 300);
                break;
            default:
                $('html, body').animate({
                    scrollTop: $('#D_header').offset().top - 60
                }, 300);
                break;
        }
    }
    function checkImageWH(imageId) {
        console.log("== checkImageWH ==");
        // == Get image
        var dayImage = $("#" + imageId);
        var dayBox = $("#D_picBox");
        console.log("dayImage:", dayImage);

        // == Create new image to test
        var newImage = new Image();
        newImage.src = dayImage.attr("src");

        // == Get accurate measurements from that.
        var windowW = $(window).width();
        var imageW = newImage.width;
        var imageH = newImage.height;
        var maxWH = windowW*0.8;
        // var sectionH = getSectionHeight(windowW);
        console.log("$(dayBox).css('top'):", $(dayBox).css('top'));

        // == get top px (remove "px" from top value string)
        var imgT = parseInt($(dayBox).css('top').slice(0, -2));
        if (imageW > imageH) {
            console.log("+++ landscape +++");
            var newH = parseInt((maxWH*imageH)/imageW);
            var topOffset = parseInt((320 - newH)/2);
            console.log("topOffset:", topOffset);
            var newT = imgT;
            $(dayBox).css('width', maxWH + 'px');
            $(dayBox).css('height', 'auto');
            $(dayBox).css('top', newT + 'px');
            $(dayBox).css('left', parseInt((320 - maxWH)/2) + 'px');
        } else {
            console.log("+++ portrait +++");
            var newW = parseInt((maxWH*imageW)/imageH);
            $(dayBox).css('width', newW + 'px');
            $(dayBox).css('height', maxWH + 'px');
            $(dayBox).css('top', newT + 'px');
            $(dayBox).css('left', parseInt((320 - newW)/2) + 'px');
        }
    }
    // function getSectionHeight(windowW) {
    //     console.log("== getSectionHeight ==");
    //     if(window.innerHeight > window.innerWidth){
    //         console.log("+++ portrait +++");
    //     } else {
    //         console.log("+++ landscape +++");
    //     }
    //     return windowH;
    // }

    initialize();
});
