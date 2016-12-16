angular.module('AdminCtrl', []).controller('AdminController', function($scope,Admin) {

	$scope.init = function(){

		Admin.getAllWholesalers().then(function(res){
			$scope.wholesalerList = res;
		});
		Admin.getAllBlacklistDomains().then(function(res){
			console.log(res);
			$scope.domainsList = res;
		});
		
	}

    $scope.addNewDomainName = function(){
    	if($scope.newDomain){
    		Admin.addDomain(newDomain)
    	}
    }

    $scope.removeThisDomain = function(domainObj){
    	if(domainObj){
    		Admin.removeDomain(domainObj);
    	}
    }
});