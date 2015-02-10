var privilege = angular.module('myApp.privilege', [
    'ui.router',
    'ui.bootstrap',
    'pasvaz.bindonce',
    'underscore',
    'ngAnimate',
    "handyUtilities",
    "request",
    "slider",
    "ngJsTree",
    'ngSanitize',
    'ngToast',
    'changeNotification',
    'brantwills.paging'
])

privilege.config(['ngToastProvider', function (ngToast) {
    ngToast.configure({
        verticalPosition: 'top',
        horizontalPosition: 'center',
        //dismissButton: true,
        dismissOnClick: true,
        timeout: 4000
    });
}])

privilege.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        //console.clear();
    }])

privilege.controller('PrivilegeCtrl', ['$scope', '$rootScope', '$state', 'requestService',
    function ($scope, $rootScope, $state, requestService) {
        requestService.privilegeMenuList().success(function (menuList, httpStatus) {
            $scope.menuList = menuList;
            $scope.menuTemplateUrl = menuList[0]['templateurl']
            $scope.selectedMenu = menuList[0];
        })
        $scope.setPage = function (menu) {
            $scope.menuTemplateUrl = menu['templateurl']
            $scope.selectedMenu = menu;
        };
        $scope.isSelectedMenu = function (menu) {
            return $scope.selectedMenu === menu ? 'open' : '';
        };
    }])




