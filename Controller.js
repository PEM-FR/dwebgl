define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang"
], function(declare, array, lang){
    return declare("dwebgl.Controller", [], {

        _clock : null,
        containerNode : null,
        _objects : null,
        objectModels : null,
        screenInterfaces : null,
        _scene : null,
        _camera : null,
        _cameraControls : null,
        wrapper : null,

        constructor : function(args){

            lang.mixin(this, args);

            if(!this._objects){
                this._objects = [];
            }

            if(!this.objectModels){
                this.objectModels = [];
            }

            if(!this.screenInterfaces){
                this.screenInterfaces = [];
            }

            this._renderer = this.wrapper.getRenderer(this.containerNode);
            this._clock = this.wrapper.getClock();
            this._scene = this.wrapper.getScene();
            this._camera = this.wrapper.getCamera({x: 0, y: 0, z: 5});
            this.wrapper.addToScene(this._camera, this._scene);
            this._cameraControls = this.wrapper.getCameraControls(this._camera);
            // transparently support window resize
            THREEx.WindowResize.bind(this._renderer, this._camera);


            // - you will most likely replace this part by your own
            var geometry	= new THREE.TorusGeometry( 1, 0.42 );
            var material    = new THREE.MeshNormalMaterial();
            var mesh	    = new THREE.Mesh( geometry, material );

            this.wrapper.addToScene(mesh, this._scene);
            this.animate();
        // allow 'p' to make screenshot
        //THREEx.Screenshot.bindKey(this._renderer);
        // allow 'f' to go fullscreen where this feature is supported
        //if( THREEx.FullScreen.available() ){
        // THREEx.FullScreen.bindKey();
        },

        animate : function(test) {
            // animation loop
            // loop on request animation loop
            // - it has to be at the begining of the function
            // - see details at http://my.opera.com/emoller/blog/2011/12/20/_requestAnimationFrame-for-smart-er-animating
            this._requestAnimationFrame(this.animate);

            // do the render
            this._render();

            // update stats
            //this.stats.update();
        },

        _requestAnimationFrame : function() {
            var lastTime = 0,
                currTime = new Date().getTime(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                id = window.setTimeout(dojo.hitch(this, function() {
                    this.animate();
                }), timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        },

        _render : function() {
            var delta = this._clock.getDelta()/100;

            // FIXME, do we use dojo at this level, if not we could go for the vanilla forEach
            // only IE would suffer from this I guess...
            this.objectModels.forEach(function(model){
                model.update(delta);
            }, this);

            this.screenInterfaces.forEach(function(gui){
                gui.update(delta);
            }, this);

            // update camera controls
            this._cameraControls.update();
            // actually render the scene
            this._renderer.render(this._scene, this._camera);
        }

    });
});