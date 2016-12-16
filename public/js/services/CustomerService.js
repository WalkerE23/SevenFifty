angular.module('CustomerService', []).factory('Customer', ['$http', function($http) {

    return {
        checkEmailFormat : function(email) {
            //is the email in the correct format in the first place?
            var regexTest = /\S+@\S+\.\S+/i;
            return regexTest.test(email);
        },
        
        isEmailValid: function(givenAddr){
            return $http.post('/api/validateEmail',{email:givenAddr})
            .then(function(response){
                return response.data;
            });
        },

        addCustomer : function(firstName,lastName,email) {
            var dataObj = {firstName:firstName,lastName:lastName,email:email}
            return $http.put('/api/addCustomer',dataObj)
            .then(function(response){
                if(response.data.success){
                    return true;
                }
                else{
                    console.log(response.error);
                    return false;
                }
            });
        },

    }       

}]);