(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://evening-citadel-93533.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
