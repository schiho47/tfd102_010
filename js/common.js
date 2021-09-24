$(function(){
    $('button.hamburger').click(function(){
        $(this).toggleClass("is-active");
        $('.hamInside').removeClass("hidden");
    });

    $('.closeBtn').click(function(){
        $('.hamInside').addClass("hidden");
        $('button.hamburger').removeClass("is-active")
    })

   
  
});

