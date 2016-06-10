go2fishApp.controller('loginController', ['$scope', '$rootScope', '$http', '$location',function($scope, $rootScope, $http, $location) {
    $scope.init = function(){
        //if user already login , go to home page directly.
        if( $rootScope.user !== null ){
             $location.path('/');
        }
    }

    $scope.login = function() {
        var userEmail = $scope.userEmail;
        var password = $scope.userPassword;
        var data = {
            "userEmail": userEmail,
            "password": password
        }
        $http.post('/login', data).then(function(res) {
            $rootScope.user = res.data;
            $location.path('/');
        }, function(res) {
            console.log(res);
        })
    }
}]);
