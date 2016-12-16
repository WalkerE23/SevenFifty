
angular.module('CustomerCtrl', []).controller('CustomerController', function($scope,Customer) {

	$scope.status_msg = "";

    $scope.signup = function(){
    	if($scope.email && $scope.firstn && $scope.lastn){
    		email = $scope.email;
    		if(Customer.checkEmailFormat(email)){
    			//email in the right format
    			if(Customer.isEmailValid(email)){
    				//vailid: has not been used before, and is not on the blacklist
    				//sign them up!!
    				if(Customer.addCustomer($scope.firstn,$scope.lastn,$scope.email)){
    					//success!!!
    					updateStatusMessage(5);
    				}
    				else{
    					updateStatusMessage(4);
    				}
    			}
    			else{
    				updateStatusMessage(3);
    			}
    		}
    		else{
    			updateStatusMessage(2);
    		}
    		$scope.status_msg = ""
    	}
    	else{
    		updateStatusMessage(1);
    	}
    };

    function updateStatusMessage(flag){
    	switch(flag){
    		case 0:
    			$scope.status_msg = "";
    			break;
    		case 1:
    			$scope.status_msg = "fill in everything";
    			break;
    		case 2:
    			$scope.status_msg = "email not properly formatted";
    			break;
    		case 3:
    			$scope.status_msg = "email NOT VALID";
    			break;
			case 4:
				$scope.status_msg = "something went wrong with signing up, check with yadda yadda";
				break;
			case 5:
    			$scope.status_msg = "Success! You have been added.";
    			break;
    	}
    }
});