define([
], function(){

   function wrapperApi(){
        return this;
   };

   wrapperApi.prototype = {
        getScene: function(){
            // summary :
            //      This function spawns an instance of scene
            // returns : object
            throw new Error('Unimplemented API: wrapperApi.getScene');
       }
   }

   return wrapperApi;
});