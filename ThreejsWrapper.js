require([
    "dojo/_base/declare"
    ], function(declare){
        return declare("dojo.webgl.ThreejsWrapper", null, {

            // _renderer: THREE.WebGLRenderer || THREE.CanvasRenderer
            _renderer: null,

            // _clock : THREE.Clock
            _clock : null,

            // _containerNode : domNode
            _containerNode: null,

            _objects: null,

            constructor: function(params) {
                this._clock = new THREE.Clock();

                this._createRenderer();
                this.addStats();
                this.init();
                this.animate();
    //            this.loadCharacter();
            },

            _createRenderer: function() {
                if( Detector.webgl ){
                    this._renderer = new THREE.WebGLRenderer({
                        antialias	: true,	// to get smoother output
                        preserveDrawingBuffer	: true	// to allow screenshot
                    });
                    this._renderer.setClearColorHex( 0xBBBBBB, 1 );
                // uncomment if webgl is required
                //}else{
                // Detector.addGetWebGLMessage();
                // return true;
                }else{
                    this._renderer	= new THREE.CanvasRenderer();
                }
                this._renderer.setSize(window.innerWidth, window.innerHeight);
                this._containerNode.appendChild(this._renderer.domElement);
            },

            addStats: function() {
                // add Stats.js - https://github.com/mrdoob/stats.js
                /*
                this.stats = new Stats();
                this.stats.domElement.style.position	= 'absolute';
                this.stats.domElement.style.top	= '0px';
                document.body.appendChild( this.stats.domElement );
                */
            },

            animate: function(test) {
                // animation loop
                // loop on request animation loop
                // - it has to be at the begining of the function
                // - see details at http://my.opera.com/emoller/blog/2011/12/20/_requestAnimationFrame-for-smart-er-animating
                this._requestAnimationFrame( this.animate );

                // do the render
                this._render();

                // update stats
                //this.stats.update();
            },

            _requestAnimationFrame: function() {
                var lastTime = 0;
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(dojo.hitch(this, function() {
                    this.animate();
                }),
                timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            },


            _render:function() {
                var delta = this._clock.getDelta()/100;

                // FIXME, do we use dojo at this level, if not we could go for the vanilla forEach
                // only IE would suffer from this I guess...
                array.forEach(this.objectModels, function(model){
                    model.update(delta);
                });

                array.forEach(this.screenInterfaces, function(model){
                    model.update(delta);
                });
                if(this.character) {
                    //this.character.update();

                    // update camera controls
                    this.cameraControls.update();

                    // actually render the scene
                    this._renderer.render( this.scene, this.camera );

                }
            },

            init: function() {
                // create a scene
                this.scene = new THREE.Scene();
                // transparently support window resize
                THREEx.WindowResize.bind(this._renderer, this.camera);
            // allow 'p' to make screenshot
            //THREEx.Screenshot.bindKey(this._renderer);
            // allow 'f' to go fullscreen where this feature is supported
            //if( THREEx.FullScreen.available() ){
            // THREEx.FullScreen.bindKey();
            //}
            },

            loadGameObjects: function(objects, gui) {
                //current function to load game objects until server is ready
                objects.forEach(function(obj){
                    this.loadObject(obj);
                }, this);
                this.loadGUI(gui);
            },

            loadObject: function(model) {
                require([model], dojo.hitch(this, function(ObjectModel){
                    var object = new ObjectModel({
                        'engine': this
                    });
                    this.scene.add( object.root );
                    this.objectModels.push(object);
                }));
            },

            loadGUI: function(gui) {
                require([gui], dojo.hitch(this, function(ObjectGUI){
                    var screen = new ObjectGUI({
                        'engine': this
                    });
                    this.screenInterfaces.push(screen);
                }));
            }
    /*
    ,
            loadCharacter: function() {
                require(['app/models/spaceShips/f302', 'dojo/_base/connect'], dojo.hitch(this, function(Character, connect){
                    var character = new Character({
                        'engine': this,
                        gameControls:true
                    });
                    connect.connect(character, "onComplete", dojo.hitch(this, function() {
                        this.camera = character.camera;
                        this.cameraControls = character.cameraControls;
                        this.scene.add( character.root );
                        this.objectModels.push(character);
                        this.loadGameObjects();
                        this.character = character;
                    }));
                }));
            }
    */
    })
});