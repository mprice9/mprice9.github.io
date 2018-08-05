(function($) {

    "use strict";    

    $(document).ready(loadContent);


    function loadContent() {
        loadTunes();
        loadGigSchedule();
    }
  

    $('.navigation').singlePageNav({
        currentClass : 'active'
    });


    $('.toggle-menu').click(function(){
        $('.responsive-menu').stop(true,true).slideToggle();
        return false;
    });

})(jQuery);



