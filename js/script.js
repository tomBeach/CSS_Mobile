$(document).ready(function() {
    console.log("======= jQuery OK =======");
    console.log("window.orientation:", window.orientation);

    function initialize() {
        console.log("== initialize ==");
        if (window.innerWidth < 321) {
            setPicSize("D_pic");
        }
        activateButtons();
    }
    function selectPic(e) {
        console.log("== selectPic ==");
        if ($('#' + e.currentTarget.id).attr('class') == 'M_pic') {
            console.log("== M_pic ==");
            $('#NED_header').css('display', 'block');
            $('html, body').animate({
                scrollTop: $('#NED_header').offset().top
            }, 300);
        }
    }
    function activateButtons() {
        console.log("== activateButtons ==");
        $('#toggle-menu-btn').on('mousedown', toggleMenu);
        $('img').on('mousedown', selectPic);
        $('#edit').on('mousedown', toggleNED);
    }
    function toggleNED() {
        console.log("== toggleNED ==");
        if ($('#NED').css('display') == 'none') {
            toggleMenu();
            $('#NED').css('display', 'block');
            $('#close').on('mousedown', toggleNED);
        } else {
            $('#NED').css('display', 'none');
            $('#close').off('mousedown', toggleNED);
        }
    }
    function toggleMenu() {
        console.log("== toggleMenu ==");
        if ($('#side-menu').css('margin-left') == '-120px') {
            $('#side-menu').css('margin-left', '0');
            $('.menu-btn').on('mousedown', toggleMenuLink);
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
        toggleMenu();
        $('.menu-btn').css('background-color', 'rgb(14, 11, 22)')
    }
    function checkImageWH(imageId) {
        console.log("== checkImageWH ==");
        // == get selected image
        var dayImage = $("." + imageId);
        console.log("dayImage:", dayImage);

        // == create new image to test HW
        var newImage = new Image();
        newImage.src = dayImage.attr("src");

        // == get measurements of newImage
        var windowW = $(window).width();
        var imageW = newImage.width;
        var imageH = newImage.height;
        var maxWH = windowW*0.8;
        return [imageW, imageH, maxWH]
    }
    function setPicSize(imageId) {
        console.log("== setPicSize ==");

        // == set pic WH for proper centering and aspect
        var picData = checkImageWH(imageId);

        // == pic container div
        var dayBox = $("#D_pixBox");

        // == get top px integer (remove "px" from top value string)
        var imgT = parseInt($(dayBox).css('top').slice(0, -2));

        // == handle landscape images
        if (picData[0] > picData[1]) {
            console.log("+++ landscape +++");
            var newH = parseInt((picData[2]*picData[1])/picData[0]);
            var topOffset = parseInt((320 - newH)/2);
            console.log("topOffset:", topOffset);
            var newT = imgT;
            $(dayBox).css('width', picData[2] + 'px');
            $(dayBox).css('height', 'auto');
            $(dayBox).css('top', newT + 'px');
            $(dayBox).css('left', parseInt((320 - picData[2])/2) + 'px');

        // == handle portrait images
        } else {
            console.log("+++ portrait +++");
            var newW = parseInt((picData[2]*picData[0])/picData[1]);
            $(dayBox).css('width', newW + 'px');
            $(dayBox).css('height', picData[2] + 'px');
            $(dayBox).css('top', newT + 'px');
            $(dayBox).css('left', parseInt((320 - newW)/2) + 'px');
        }
    }

    initialize();
});
