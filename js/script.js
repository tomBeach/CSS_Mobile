$(document).ready(function() {
    console.log("======= jQuery OK =======");
    console.log("window.orientation:", window.orientation);
    if(window.innerHeight > window.innerWidth){
        console.log("+++ portrait +++");
    }

    function initialize() {
        console.log("== initialize ==");
        $('#toggle-menu').on('mouseenter', toggleBtn);
        $('#toggle-menu').on('mouseleave', toggleBtn);
        $('#toggle-menu').on('mousedown', toggleMenu);
        // $('#menu-header').on('mouseenter', showDrop);
        // $('#menu-header').on('mouseleave', hideDrop);
        // $('#menu-header').on('mousedown', lockMenu);
        // $('.accordion').on('click', togglePanels);
    }
    $(window).on("orientationchange",function(e){
        console.log("== orientationchange ==");
        console.log("e.orientation:", e.orientation);
    });
    function toggleMenu() {
        console.log("== toggleMenu ==");
        if ($('#side-menu').css('margin-left') == '-120px') {
            $('#side-menu').css('margin-left', '0px');
        } else {
            $('#side-menu').css('margin-left', '-120px');
        }
    }
    function toggleBtn() {
        console.log("== toggleBtn ==");
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
        var imgT = parseInt($(dayImage).css('top').slice(0, -2));
        if (imageW > imageH) {
            console.log("+++ landscape +++");
            var newH = parseInt((maxWH*imageH)/imageW);
            var topOffset = parseInt((320 - newH)/2);
            console.log("topOffset:", topOffset);
            var newT = imgT + topOffset;
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

    initialize();
    checkImageWH("today-pic");
});
