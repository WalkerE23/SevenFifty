
angular.module('CustomerCtrl', []).controller('CustomerController', function($scope,Customer) {

	updateStatusMessage(0);

    $scope.signup = function(){
    	if($scope.email && $scope.firstn && $scope.lastn){
    		email = $scope.email;
    		if(Customer.checkEmailFormat(email)){
    			//email in the right format
                Customer.isEmailValid(email).then(function(validated){
                    if(validated.success && validated.unique){

                        console.log("Validated: " + JSON.stringify(validated));    
                        Customer.addCustomer($scope.firstn,$scope.lastn,$scope.email).then(function(added){
                            if(added){
                                successMessage($scope.firstn,$scope.lastn,$scope.email);
                            }
                            else{
                                updateStatusMessage(5);
                            }
                        })
                    }
                    else if(validated.success && !validated.unique){
                        updateStatusMessage(4);
                    }
                    else{
                        updateStatusMessage(3);
                    }
                })
    		}
    		else{
    			updateStatusMessage(2);
    		}
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
    			$scope.status_msg = "Please fill in every field in order to get started.";
    			break;
    		case 2:
    			$scope.status_msg = "The email you entered was not formatted properly. Please check for typos!";
    			break;
    		case 3:
    			$scope.status_msg = "Please contact your manager about getting access to a corporate SevenFifty profile for wholesalers.";
    			break;
            case 4:
                $scope.status_msg = "Sorry, This email is already associated with a buyer in our records.";
                break;
			case 5:
				$scope.status_msg = "Something went wrong when signing you up. Please contact SevenFifty, or try back later!";
				break;
    	}
    }
    function successMessage(fn,ln,em){
        var el = document.getElementById("status_msg");
        el.style.color = "green";
        $scope.status_msg = "Congrats, " +fn + " " + ln + " for signing up as a SevenFifty buyer. You are registered under " + em + "."
    }
});


