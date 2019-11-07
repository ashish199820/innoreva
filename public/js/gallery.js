
$(function() {
   
    var selectedClass = "";
    $(".gbutton").click(function(){
    selectedClass = $(this).attr("data-rel");
    //$("#gallery").fadeTo(100, 0.1);
    $("#gallerySLide span").not("."+selectedClass).fadeOut().css("display:inline");
    setTimeout(function() {
    $("."+selectedClass).fadeIn().css("display:inline");
    $("#gallerySLide").fadeTo(300, 1).css("display:inline");
    }, 300);
    });
    });