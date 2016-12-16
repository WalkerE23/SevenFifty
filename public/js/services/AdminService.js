angular.module('AdminService', []).factory('Admin', ['$http', function($http) {

    return {
        addDomain : function(domainName) {
            var dataObj = {domain:domainName}
            $http.put('/api/addDomain',dataObj)
            .then(function success(response){


            }, function failure(err){
                console.log(err);
            })
        },
        removeDomain: function(domainName){
            //did this a slightly different way to allow clean passage of delete method with body
            return $http({
                url: '/api/removeDomain',
                method: 'DELETE',
                data: {
                    domain: domainName
                },
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }).then(function(response) {

            }, function(error) {
                console.log(error);
            });
        },

        getAllWholesalers : function() {
            return $http.get('/api/retrieveWholesalers')
            .then(function success(response){
                return response.data
            },function failure(err){
                return err;
            });
        },
        getAllBlacklistDomains : function(){
            return $http.get('/api/retrieveBlacklist')
            .then(function success(response){
                return response.data;
            },function failure(err){
                return err;
            });
        }
    }        

}]);