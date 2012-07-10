define(function(){
    var wrapper = {
        // _renderer: THREE.WebGLRenderer || THREE.CanvasRenderer
        _renderer: null,

        // _clock : THREE.Clock
        _clock : null,

        // _containerNode : domNode
        _containerNode: null,

        // _objects : Array
        _objects: null,

        // objectModels : Array
        objectModels : null,

        // screenInterfaces : Array
        screenInterfaces : null,

        _scene : null,

        _camera : null,

        _cameraControls : null,

        constructor: function(params) {

            this._containerNode = params.containerNode;
            this.objectModels = [];
            this.screenInterfaces = [];

            this._clock = new THREE.Clock();

            this._createRenderer();
            this.addStats();
            this.init();
            this.animate();

            return this;
//            this.loadCharacter();
        },

        _createRenderer: function() {
            if(Detector.webgl){
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
            var lastTime = 0,
                currTime = new Date().getTime(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                id = window.setTimeout(dojo.hitch(this, function() {
                    this.animate();
                }), timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        },


        _render:function() {
            var delta = this._clock.getDelta()/100;

            // FIXME, do we use dojo at this level, if not we could go for the vanilla forEach
            // only IE would suffer from this I guess...
            this.objectModels.forEach(function(model){
                model.update(delta);
            }, this);

            this.screenInterfaces.forEach(function(gui){
                gui.update(delta);
            }, this);
            if(this._character) {
                //this._character.update();
                // update camera controls
                this._cameraControls.update();
            }
            // actually render the scene
            this._renderer.render(this._scene, this._camera);
        },

        init: function() {
            // create a scene
            this._scene = new THREE.Scene();
            this._camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
            this._camera.position.set(0, 0, 5);
            this._cameraControls = new THREEx.DragPanControls(this._camera);
            this._scene.add(this._camera);
            // transparently support window resize
            THREEx.WindowResize.bind(this._renderer, this._camera);
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
                this._scene.add( object.root );
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
        },

        addMesh: function(mesh) {
       	    this._scene.add(mesh);
        }

    };

    return function (params){
        return wrapper.constructor(params);
    };

});