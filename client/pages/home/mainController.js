go2fishApp.controller('mainController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $scope.init = function() {
        if (!$rootScope.user) {
            $http.get('/getUser').then(function(res) {
                if (res.data === "" || !res.data) {
                    $rootScope.user = null;
                } else {
                    $rootScope.user = res.data;
                }
            }, function(res) {
                console.log(res);
            })
        }
    }
}]);
