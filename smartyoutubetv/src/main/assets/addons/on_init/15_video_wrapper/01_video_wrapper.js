/**
 * Description:
 * Adds useful methods to video api
 * This methods have usage only in exoplayer context
 */

console.log("Scripts::Running script video_wrapper.js");

function VideoWrapperAddon() {
    this.TAG = 'VideoWrapperAddon';

    this.run = function() {
        this.applyWrapping();
    };

    this.applyWrapping = function() {
        var $this = this;

        document.createElementReal = document.createElement;

        document.createElement = function(tagName) {
            if (tagName.toUpperCase() == 'VIDEO') {
                Log.d($this.TAG, "Wrapping tag " + tagName);

                var video = document.createElementReal(tagName);

                // $this.addFakeListener(video);
                $this.overrideVolumeProp(video);

                return video;
            }

            return this.createElementReal(tagName);
        };
    };

    this.overrideVolumeProp = function(video) {
        Log.d(this.TAG, "Overriding video's volume property");
        Utils.overrideProp(video, 'volume', 0);
    };

    this.addFakeListener = function(video) {
        var $this = this;

        video.addEventListenerReal = video.addEventListener;

        video.addEventListener = function(type, listener, options) {
            Log.d($this.TAG, "Add event listener: " + type + " " + listener);

            if (!this.listeners) {
                this.listeners = {};
            }

            Log.d($this.TAG, "Storing " + type + " listener for future use...");
            this.listeners[type] = listener;

            // if (type == 'timeupdate' || type == 'ended' || type == 'playing' || type == 'loadeddata' || type == 'focus' || type == 'play') {
            //     return;
            // }
            //
            // this.addEventListenerReal(type, listener, options);
        };

        video.dispatchEventReal = video.dispatchEvent;

        video.dispatchEvent = function(event) {
            Log.d($this.TAG, "Dispatching event: " + event);

            this.dispatchEventReal(event);
        };
    };
}

if (DeviceUtils.isExo()) {
    new VideoWrapperAddon().run();
}

