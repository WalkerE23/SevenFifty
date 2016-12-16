angular.module('AdminCtrl', []).controller('AdminController', function($scope,Admin) {

    $scope.buyerList = [];
    $scope.domainsList = [];

	$scope.init = function(){
        populateBlacklist();
        populateBuyersList();
	}

    $scope.addNewDomainName = function(){
    	if($scope.newDomain){
    		var temp = $scope.newDomain.split('@');//just in case
    		var domain = temp[temp.length - 1];//last one, always

            if(Admin.checkDomainFormat(domain)){
                Admin.addDomain(domain).then(function(res){
                    if(res){
                        populateBlacklist();
                        $scope.newDomain = "";
                    }
                }); 
            }

    	}
    	else{
            console.log(new Error());
    	}
    }

    $scope.removeThisDomain = function(domainObj){
    	if(domainObj){
    		Admin.removeDomain(domainObj).then(function(res){
                if(res){
                    populateBlacklist();
                }
            });
    	}
        else{
            console.log(new Error());
        }
    }

    function populateBlacklist(){
        Admin.getAllBlacklistDomains().then(function(res){
            $scope.domainsList = res;
        });
    }
    function populateBuyersList(){
        Admin.getAllBuyers().then(function(res){
            $scope.buyerList = res;
        });
    }
});