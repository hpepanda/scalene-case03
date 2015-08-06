angular.module('hpsa-client').factory("UrlParser", function(){
   return function(url){
       var parser = document.createElement('a');
       parser.href = url;
       return {
           protocol: parser.protocol,
           host: parser.host,
           hostName: parser.hostname,
           port: parser.port,
           path: parser.pathname,
           search: parser.search
       }
   }
});