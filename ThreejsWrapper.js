require([
    "../vendor/three.js/Three.js",
    "../vendor/three.js/Detector.js",
    "../vendor/threex/THREEx.screenshot.js",
    "../vendor/threex/THREEx.FullScreen.js",
    "../vendor/threex/THREEx.WindowResize.js",
    "../vendor/threex.dragpancontrols.js"
]);

define([
    "dwebgl/api/wrapperApi"
], function(wrapperApi){


    function wrapper(params){
        wrapperApi.call(this);
        return this;
    };

    wrapper.prototype = Object.create(wrapperApi.prototype);

    wrapper.prototype._renderer = null;

    wrapper.prototype.getScene = function() {
        return new THREE.Scene();
    };

    wrapper.prototype.getClock = function() {
        return new THREE.Clock();
    };

    wrapper.prototype.getCamera = function(coords) {
        var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.set(coords.x, coords.y, coords.z);
        return camera;
    };

    wrapper.prototype.getCameraControls = function(camera) {
        return new THREEx.DragPanControls(camera);
    };

    wrapper.prototype.getRenderer = function(containerNode) {
        if(!containerNode){
            if(this._renderer){
                return this._renderer;
            }
            throw new Error(
                "wrapper.getRenderer : "
                    + "No containerNode specified, and no renderer Instance set"
            );
            return;
        }
        if(Detector.webgl){
            this._renderer = new THREE.WebGLRenderer({
                antialias : true,	// to get smoother output
                preserveDrawingBuffer : true	// to allow screenshot
            });
            this._renderer.setClearColorHex(0xBBBBBB, 1);
        // uncomment if webgl is required
        //}else{
        // Detector.addGetWebGLMessage();
        // return true;
        }else{
            this._renderer = new THREE.CanvasRenderer();
        }
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        containerNode.appendChild(this._renderer.domElement);
        return this._renderer;
    };

    wrapper.prototype.addStats = function() {
            // add Stats.js - https://github.com/mrdoob/stats.js
//            this.stats = new Stats();
//            this.stats.domElement.style.position	= 'absolute';
//            this.stats.domElement.style.top	= '0px';
//            document.body.appendChild( this.stats.domElement );
    };

    wrapper.prototype.addToScene = function(scnObj, scene) {
   	    scene.add(scnObj);
    };

    return wrapper;

});