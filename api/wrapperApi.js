define([
], function(){

   function wrapperApi(){
        return this;
   };

   wrapperApi.prototype = {
        getScene: function(){
            // summary :
            //      This function returns a new instance of scene
            // returns : object
            throw new Error('Unimplemented API: wrapperApi.getScene');
       },

       getRenderer: function(containerNode){
            // summary :
            //      This function returns a singleton renderer
            // containerNode : document.node OPTIONAL
            //      The node which will contain the canvas
            //      If null, we'll try to see if a renderer already exists
            //      and return it
            // returns : object
            throw new Error('Unimplemented API: wrapperApi.getRenderer');
       },

       getClock: function(){
            // summary :
            //      This function returns a Clock object
            // returns : object
            throw new Error('Unimplemented API: wrapperApi.getClock');
       },

       getCamera: function(coords){
            // summary :
            //      This function returns a camera object
            // coords : object
            //      This object contains the properties of the camera
            // returns : object
            throw new Error('Unimplemented API: wrapperApi.getCamera');
       },

       getCameraControls: function(camera){
            // summary :
            //      This function returns a camera controller object
            // camera : object
            //      The camera to which we should attach controls
            // returns : object
            throw new Error('Unimplemented API: wrapperApi.getCameraControls');
       },

       addToScene: function(scnObj, scene){
            // summary :
            //      This function returns a camera controller object
            // scnObj : object
            //      The object to add to the scene
            // scene : object
            //      The scene to which the mesh will be add
            // returns : object
            throw new Error('Unimplemented API: wrapperApi.addMeshToScene');
       }
   }

   return wrapperApi;
});