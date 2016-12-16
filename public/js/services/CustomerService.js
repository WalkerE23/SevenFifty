angular.module('CustomerService', []).factory('Customer', ['$http', function($http) {

    return {
        checkEmailFormat : function(email) {
            //is the email in the correct format in the first place?
            var regexTest = /\S+@\S+\.\S+/i;
            return regexTest.test(email);
        },
        
        isEmailValid: function(givenAddr){
            $http.post('/api/validateEmail',{email:givenAddr})
            .then(function success(response){
                console.log(response);
                ///
            },    function failure(response){
                console.log("failure")
            });
        },

        addCustomer : function(firstName,lastName,email) {
            return $http.put('/api/addCustomer', someData);
        }
    }       

}]);