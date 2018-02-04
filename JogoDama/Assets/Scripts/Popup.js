$(document).ready(function () {
    //$('a').on('click', function(){
    //  $('.wrap, a').toggleClass('active');
    //  return false;
    //   });



    $("#lnkAbrirPopup").click(
        function () {
            $('.wrap, a').toggleClass('active');
            $('.wrap').css('transform', 'rotate(5deg)');
            setTimeout(
                function () {
                    $('.wrap').css('transform', 'rotate(360deg)');
                    $('.wrap, a').toggleClass('active');
                    return true;
                },
                1500);
        });




    $('.rad').on('mouseenter mouseleave', function () {
        $('.box, .line').toggleClass('open');
    });
});

