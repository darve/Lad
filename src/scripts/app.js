
'use strict';

/**
 * Smash targets below this line
 * -----------------------------
 */

var Vec     = require('./modules/Vec'),
    PIXI    = require('pixi'),
    gfx     = require('./modules/Graphics'),
    $       = require('jquery'),
    M       = require('./modules/Math'),
    Lad     = require('./modules/Lad');

(function(win, doc, c) {

    var
        w = win.innerWidth,
        h = win.innerHeight,

        stage = new PIXI.Container(),

        renderer = new PIXI.WebGLRenderer(w, h, {
            view: c,
            backgroundColor: 0xDDDDDD,
            antialias: true
        }),

        layers = {
            lads: new PIXI.Container()
        },

        loader,

        lads = [],

        defer = {
            fn: undefined,
            num: 3,
            limit: 120
        };

        window.lads = lads;

    function render() {
        requestAnimationFrame(render);
        gfx.render(function() {
            integrate();
            renderer.render(stage);
        });
    }

    function integrate() {
        lads.forEach(function(lad, i) {
            lad.tick();
        });
    }

    function generate() {
        var c;

        for ( var i = 0, l = 300; i < l; i++ ) {
            switch ( Math.floor(Math.random() * 4 )) {
                case 0: c = 'red'; break;
                case 1: c = 'yellow'; break;
                case 2: c = 'purple'; break;
                case 3: c = 'green'; break;
            }

            var lad = new Lad({
                sprite: new PIXI.Sprite.fromImage('/assets/img/lad-' + c + '.png'),
                name: 'lad',
                viewscale: 1,
                initial: {
                    pos: new Vec(M.rand(0, w), M.rand(0, h)),
                    width: 64, height: 64,
                    rotation: 0,
                    alpha: 1
                },
                original: {
                    pos: new Vec(w/2, h/2),
                    width: 64, height: 64,
                    rotation: 0,
                    alpha: 1
                }
            });
            lads.push(lad);
            layers.lads.addChild(lad.sprite);
        }

        render();
    }

    function init() {

        gfx.init({
            fps: 60
        });

        stage.addChild(layers.lads);

        loader = PIXI.loader;
        loader.once('complete', generate);
        loader.add('red', '/assets/img/lad-red.png');
        loader.add('yellow', '/assets/img/lad-yellow.png');
        loader.add('green', '/assets/img/lad-green.png');
        loader.add('purple', '/assets/img/lad-purple.png');
        loader.load();
    }

    $(init);

})(window,document,document.querySelectorAll('canvas')[0]);
