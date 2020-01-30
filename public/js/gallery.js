
$(function() {
   
    var selectedClass = "";
    $(".gbutton").click(function(){
    selectedClass = $(this).attr("data-rel");
    //$("#gallery").fadeTo(100, 0.1);
    console.log(selectedClass+"i am selected!")
    $("#gallerySLide div").not("."+selectedClass).fadeOut().css("display:inline");
    setTimeout(function() {
    $("."+selectedClass).fadeIn();
    $("#gallerySLide").fadeTo(300, 1);
    }, 300);
    });
    });