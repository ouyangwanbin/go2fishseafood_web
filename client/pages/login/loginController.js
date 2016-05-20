go2fishApp.controller('loginController', function($scope) {
    $scope.login = function( ) {
        var userName = $scope.userEmail;
        var password = $scope.userPassword;
        console.log(userName + ' : ' + password);
    }
});
