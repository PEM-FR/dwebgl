define([], function(){

   function WrapperApi(){
        return this;
   };

   WrapperApi.prototype = {
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

       render: function(scene, camera){
            // summary :
            //      This function calls the renderer's render function
            // scene : dwebgl/api/SceneApi
            //      The scene used for rendering
            // camera : Object
            //      The camera to use for the rendering
            throw new Error('Unimplemented API: wrapperApi.render');
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
       }
   }

   return WrapperApi;
});