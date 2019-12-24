let members = $(".team__members");
let isHover = false;

setInterval(() => {
  if (!isHover) {
    let min = 1;
    let max = $(members).length;
    let random = Math.floor(Math.random() * (max - min + 1) + min);
    $(".team__members:nth-child(" + random + ")")
      .addClass("team__members--show")
      .siblings()
      .removeClass("team__members--show");
  }
}, 3000);
function mediaSize() { 
  	
$(members).hover(

  () => {
    if (window.matchMedia('(min-width: 480px)').matches) {
    $(members).removeClass("team__members--show");
    isHover = true;
      console.log('hover');
    }
  },
  () => {
     if (window.matchMedia('(min-width: 480px)').matches) {
    isHover = false;
     }
  }
);
    
}

	/* Call the function */
  mediaSize();
  /* Attach the function to the resize event listener */
	window.addEventListener('resize', mediaSize, false);  
 



    // // eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

    $(document).ready(function() {
        "use strict";
        $(".team-list").on("click", "a", function(a) {
            a.preventDefault();
            var e = $(this).data("team");
            $(".team-single").removeClass("active"), $(".team-list li").removeClass("active"), $("#" + e).addClass("active"), $(this).parent().addClass("active")
        });
        
    });