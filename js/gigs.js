(function($) {

    "use strict";    

    // Read gig schedule out of a JSON object in gigSchedule.js.
    function loadGigSchedule() {
        var gigSchedule = JSON.parse(window.gigs)[0].gigs;
        for (var i = 0; i < gigSchedule.length; ++i) {
            appendGigToDom(gigSchedule[i]);
        }
    }
    window.loadGigSchedule = loadGigSchedule;


    // Add a row to the gig table for each gig.
    function appendGigToDom(gig) {
        $('#gig-table').append(
            '<tr>'
                + '<td>' + gig.date + '</td>'
                + '<td>' + gig.who + '</td>'
                + '<td>' + gig.band + '</td>'
                + '<td>' + gig.location + '</td>'
                + '<td>' + gig.event + '</td>'
            + '</tr>'
        );
    }

})(jQuery);
