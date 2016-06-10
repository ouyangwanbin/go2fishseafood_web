go2fishApp.controller('loginController', ['$scope', '$rootScope', '$http', '$location',function($scope, $rootScope, $http, $location) {
    $scope.init = function(){
        //if user already login , go to home page directly.
        if( $rootScope.user !== null ){
             $location.path('/');
        }

        //clean the error
        $scope.loginFormError = null;
    }

    $scope.login = function() {
        var userEmail = $scope.userEmail;
        var password = $scope.userPassword;
        var data = {
            "userEmail": userEmail,
            "password": password
        }
        $http.post('/login', data).then(function(res) {
            if( res.data.status !== "success" ){
                $scope.loginFormError = res.data.msg;
            }else{
                $rootScope.user = res.data.data;
                $location.path('/');    
            }           
        }, function(res) {
            console.log(res);
        })
    }
}]);
