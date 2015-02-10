angular.module("request", []).factory('requestService', function ($http, $rootScope, util, $document) {
  var BACKEND_SERVER,
      url,
      doGetRequest = function (path) {
        url = _wrapper(path);
        return $http.get(url)
        //return $http.jsonp( url )  // 解决跨域问题
      },
      doPostRequest = function (path, data) {
        url = _wrapper(path);
        //return $http.post(url, data);
        return $http({ // 跨域
          url: url,
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        });
      },
      _wrapper = function (path) {
        if(!util.parseURL(path).query) {
          path += "?callback=JSON_CALLBACK";
        } else {
          path += "&callback=JSON_CALLBACK";
        }
        url = BACKEND_SERVER + path;
        return url;
      },
      userDetail = function (userno) {
        return doGetRequest('userDetail.json?userno=' + userno);
      },
      userList = function () {
        return doGetRequest('userList.json');
      },
      appRoleList = function () {
        return doGetRequest('appRoleList.json');
      },
      userRoleList = function (userno) {
        return doGetRequest('userRoleList.json?userno=' + userno);
      },
      saveUser = function (url, data) {
        return doPostRequest(url, data);
      },
      deleteUsers = function (url, data) {
        return doPostRequest(url, data);
      },
      privilegeMenuList = function () {
        return doGetRequest('privilegeMenu.json');
      },
      faWenMenuList = function () {
        return doGetRequest('faWen.menu.json');
      },
      roleDetail = function () {

      },
      deptList = function () {
        return doGetRequest('deptList.json');
      },
      menuList = function () {
        return doGetRequest('voteMenuList.json');
      },
      faWenList = function(){
        return doGetRequest('faWen.niGao.json');
      }
  //BACKEND_SERVER = "http://192.168.2.117:8081/data/module/privilege/"
  BACKEND_SERVER = "/json/" // absolute for test
  return {
    doGetRequest: doGetRequest,
    doPostRequest: doPostRequest,
    userDetail: userDetail,
    userList: userList,
    appRoleList: appRoleList,
    userRoleList: userRoleList,
    saveUser: saveUser,
    deleteUsers: deleteUsers,
    privilegeMenuList: privilegeMenuList,
    faWenMenuList: faWenMenuList,
    roleDetail: roleDetail,
    deptList: deptList,
    menuList: menuList,
    faWenList: faWenList
  }
})

