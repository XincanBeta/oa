angular.module("slider", []).factory('sliderService', function ($rootScope, requestService, $document, util) {
  var show = function () {
        if(!_path) {
          console.error("sliderService: path is error. please initPath(path) correct .")
          return;
        }
        // 这是 slider 中获取 userDetail 的入口，还可以有别的入口来完成相同的事
        requestService.doGetRequest(_path).success(function (data) {
          $rootScope.$emit("entity.update", data)
          $rootScope.$emit("slider.show")
          _resetPath();
        })
      }, hide = function () {
        $rootScope.$emit("slider.hide")
        _resetPath();
      }, showAfterHide = function () {
        $rootScope.$emit("slider.showAfterHide")
      }, initPath = function (path) {
        _pathCopy = path;
        _path = _pathCopy;
      }, setParams = function (params) {
        if(!_path) {
          console.error("setParams: initPath method should be invoke first !")
          return;
        }
        if(!angular.isObject(params)) {
          console.error("setParams: params should be an object type !")
          return;
        }

        for (var name in params) {
          if(params.hasOwnProperty(name)) {
            if(!util.parseURL(_path).query) {
              _path += "?" + name + "=" + params[name];
            } else {
              _path += "&" + name + "=" + params[name];
            }
            //console.debug("setParams: path = " + _path)
          }
        }

      }, startAutoHide = function () {
        $document.mousedown(function (event) {
          var $target = $(event.target);
          if(!($target.parents("[my-slider-show]").length > 0
              || $target.parents("tr").length > 0
              || $target.parents("ul").length > 0
              || $target.parents("ol").length > 0 )) {
            hide()
            $rootScope.$emit("row.clearSelected") // 接口，供调用者实现
          }
        })
      }, stopAutoHide = function () {
        $document.unbind("mousedown")
      },
      _resetPath = function () {
        _path = _pathCopy
      },
      _path, _pathCopy;
  startAutoHide(); // 默认启动
  return {
    // expose method
    show: show,
    hide: hide,
    showAfterHide: showAfterHide,
    initPath: initPath,
    setParams: setParams,
    startAutoHide: startAutoHide,
    stopAutoHide: stopAutoHide
  }
})
    .directive("mySliderShow", function ($rootScope, $document, sliderService) {
      return {
        restrict: "A",
        "link": function (scope, element, attrs) {
          var show = function () {
                //console.log("slider show");
                element.animate({"width": sliderWidth}, "fast");
              },
              hide = function () {
                //console.log("slider hide");
                element.animate({"width": "0"}, "fast");
              },
              showAfterHide = function () {
                //console.log("slider show after hide");
                hide();
                sliderService.show()
              },
              sliderWidth = attrs.sliderWidth || "40%";
          $rootScope.$on("slider.show", show)
          $rootScope.$on("slider.hide", hide)
          $rootScope.$on("slider.showAfterHide", showAfterHide)
        }
      }
    })







