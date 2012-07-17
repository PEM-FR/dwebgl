require([
    "../vendor/three.js/Three.js"
]);

define([
    "dwebgl/api/SceneApi"
], function(SceneApi){

    function SceneWrapper(params){
        SceneApi.call(this);
        this._scene = new THREE.Scene();
        return this;
    };

    SceneWrapper.prototype = Object.create(SceneApi.prototype);

    SceneWrapper.prototype._scene = null;

    SceneWrapper.prototype.add = function(obj){
        this._scene.add(obj);
    };

    SceneWrapper.prototype.remove = function(obj, destroy){
        this._scene.remove(obj);
        if(typeof obj.destroy === "function"){
            obj.destroy();
        }
    };

    SceneWrapper.prototype.destroy = function(childrenAswell){
        // destroy the scene and all of it's objects if needed
    };

    return SceneWrapper;

});