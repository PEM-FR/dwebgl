define([], function(){

   function SceneApi(){
        return this;
   };

   SceneApi.prototype = {
        // _scene : THREE.Scene
        //      A three.js scene instance
        _scene : null,

        getInstance: function(){
            // summary :
            //      This function is used to get the real THREE.Scene instance
            return this._scene;
        },

        add: function(obj){
            // summary :
            //      This function is used to add an object to the scene
            // obj : Object
            //      The object to add to the scene
            throw new Error('Unimplemented API: SceneApi.add');
       },

       remove: function(obj, destroy){
            // summary :
            //      This function is used to remove an object form the scene
            // obj : Object
            //      The object to be removed from the scene
            // destroy : boolean
            //      If true, the function will try to call destroy on the object
            // returns
            throw new Error('Unimplemented API: SceneApi.remove');
       },

       destroy: function(childrenAswell){
            // summary :
            //      This function is used to destroy the scene
            // childrenAswell : boolean
            //      If set to true, then we will try destroy all the objects
            //      from the scene aswell
            throw new Error('Unimplemented API: SceneApi.destroy');
       }
   }

   return SceneApi;
});