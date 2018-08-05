var TUNES_DIRECTORY = "tunes/";
var TUNE_ID_PREFIX = "tune-";
var AUDIO_PREFIX = "audio-";
var PLAY_BUTTON_PREFIX = "play-";
var mostRecentlyPlayedTuneId = "";

(function($) {

    "use strict";    

    // Read tunes out of a JSON object in tuneContent.js.
    function loadTunes() {
        var tunes = JSON.parse(window.tunes)[0].tunes;
        for (var i = 0; i < tunes.length; ++i) {
            // Generate unique ID from index.
            appendTuneToDom(tunes[i], TUNE_ID_PREFIX + i);
        }

        // Bind event handlers.
        $('audio').on('ended', function(event) {
            var $target = $(event.target);
            onEnded($target.data("tune-id"));
        });
        $('.fa-play-circle-o').click(function(event) {
            var $target = $(event.target);
            toggleAudio($(this), $target.data("tune-id"));
        });
    }
    window.loadTunes = loadTunes;


    // Add a tune element to the DOM for a tune represented in JSON.
    function appendTuneToDom(tune, id) {
        $('.tunes-holder').append(
            '<div class="col-md-4 col-sm-6">'
                + '<div class="tune-item ' + getCssClassForTimeKey(tune.time, tune.key) + '">'
                    + '<div class="tune-background">'
                        + '<i class="fa fa-music"></i>'
                    + '</div>'
                    + '<div class="tune-text">'
                        + '<p>' + tune.name + '</p>'
                        + '<p>' + tune.time + '</p>'
                        + '<p>' + tune.key + '</p>'
                        + '<i class="fa fa-play-circle-o" id="' + PLAY_BUTTON_PREFIX + id + '" data-tune-id="' + id + '"></i>'
                    + '</div>'
                    + '<div class="tune-hover">'
                        + '<div class="inside">'
                            + '<p>' + tune.description + ' ' + tune.date + '.</p>'
                            + '<a href="' + TUNES_DIRECTORY + tune.pdf + '.pdf" target="_blank"><i class="fa fa-file-pdf-o"></i> Sheet music (.pdf)</a>'
                        + '</div>'
                    + '</div>'
                + '</div>'
            + '</div>'
        );
        $('#tunes').append(
            '<audio id="' + AUDIO_PREFIX + id + '" data-tune-id="' + id + '">'
                + '<source src="' + TUNES_DIRECTORY + unescape(tune.audio) + '.mp3">'
            + '</audio>'
        );
    }


    // Tune elements are color-coded. Determine the CSS class for the key and time signature.
    function getCssClassForTimeKey(time, key) {
        if (includes(time.toLowerCase(), "jig")) {
            return (includes(key.toLowerCase(), "min") || includes(key.toLowerCase(), "dor")) ? "tune-jig-minor" : "tune-jig-major";
        } else if (includes(time.toLowerCase(), "waltz")) {
           return (includes(key.toLowerCase(), "min") || includes(key.toLowerCase(), "dor")) ? "tune-waltz-minor" : "tune-waltz-major";
        } else {
            return (includes(key.toLowerCase(), "min") || includes(key.toLowerCase(), "dor")) ? "tune-reel-minor" : "tune-reel-major";
        }
    }


    function includes(string, substring) {
        return (string.indexOf(substring) !== -1);
    }


    // Handles toggling audio on or off when the user clicks a play button.
    function toggleAudio(clickedButton, tuneId) {
        var audioElement = document.getElementById(AUDIO_PREFIX + tuneId);
        if (isPlaying(audioElement)) {
            pause(tuneId);
        }
        else {
            // Pause any playing audio.
            if (isPlaying(document.getElementById(AUDIO_PREFIX + mostRecentlyPlayedTuneId))) {
                pause(mostRecentlyPlayedTuneId);
            }
            audioElement.play();
            mostRecentlyPlayedTuneId = tuneId;
            $(clickedButton).toggleClass("fa-play-circle-o fa-play-circle");
        }
    }
    window.toggleAudio = toggleAudio;


    // Pauses playing audio.
    function pause(tuneId) {
        var audioElement = document.getElementById(AUDIO_PREFIX + tuneId);
        audioElement.pause();
        audioElement.currentTime = 0;
        // Call onEnded manually to prevent races with playing something else.
        onEnded(tuneId);
    }

    // Resets 'playing' icon when audio is no longer playing.
    function onEnded(tuneId) {
        $('#' + PLAY_BUTTON_PREFIX + tuneId).toggleClass("fa-play-circle fa-play-circle-o");
    }



    // Determines whether a given audio element is currently playing.
    function isPlaying(audioElement) {
        return audioElement !== null && audioElement.duration > 0 && !audioElement.paused;
    }


})(jQuery);
