

'use strict';

var
    Vec     = require('./Vec');

/**
 * Responsibilities of this module:
 *
 * Hold the PIXI containers that represent the different pieces of the app.
 */
module.exports = (function(win){

    var
        // These all relate to the resolution of the canvas
        devicePixelRatio,
        backingStoreRatio,
        ratio,

        // The default FPS
        fps = 60,

        // These are all used for the main rendering loop
        now,
        then = Date.now(),
        interval = 1000/fps,
        delta,

        // Some rad colours, should we need any.
        colours = [
            '#ed5565',
            '#da4453',
            '#fc6e51',
            '#e9573f',
            '#ffce54',
            '#fcbb42',
            '#a0d468',
            '#8cc152',
            '#48cfad',
            '#37bc9b',
            '#4fc1e9',
            '#3bafda',
            '#5d9cec',
            '#4a89dc',
            '#ac92ec',
            '#967adc',
            '#ec87c0',
            '#d770ad',
            '#f5f7fa',
            '#e6e9ed',
            '#ccd1d9',
            '#aab2bd',
            '#656d78',
            '#434a54'
        ];

    /**
     * Primitive drawing functions below this point
     */
    function randomColour() {
        return colours[Math.floor(Math.random() * colours.length)];
    }

    /**
     * Used to limit the frames per second the app runs at.
     */
    function render(cb) {
        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);
            cb();
        }
    }

    function init(opts) {
        fps = opts.fps;
        interval = 1000/fps;
    }

    return {
        colours: colours,
        randomColour: randomColour,
        ratio: ratio,
        init: init,
        render: render
    };

})(window);
