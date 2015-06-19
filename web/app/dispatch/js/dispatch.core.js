dispatch.controller("DraftCtrl",
    function ($scope, $timeout, $state, $stateParams, $rootScope, sliderService, requestService, $modal) {
      requestService.faWenList().success(function (data, httpStatus) {
        $timeout(function () {
          $scope.itemList = data;
        }, 0)
      });

      sliderService.initPath("dispatch.itemDetail.json"); // be mock
      $scope.mySliderToggle = function (item) {
        sliderService.setParams({flowinstid: item.flowinstid})
        if(!$scope.selected) {
          $scope.selected = item;
          sliderService.show()
        } else if($scope.selected && $scope.selected === item) {
          $scope.selected = "";
          sliderService.hide()
        } else {
          $scope.selected = item;
          sliderService.showAfterHide()
        }
      }

      $rootScope.$on("row.clearSelected", function () {
        $scope.selected = "";
        $scope.$apply();
      })
      $rootScope.$on("entity.update", function (event, item) {
        $scope.item = item;
      })

      $scope.isSelected = function (item) {
        return $scope.selected === item ? "active" : "";
      }

      $scope.selectAllItem = function () {
        var bool = $scope.selectAllCheckbox.isChecked;
        _.each($scope.itemList, function (item) {
          item.selected = bool
        });
      }

      $scope.selectItem = function ($event) {
        $event.stopPropagation();
      }

      $scope.batchIsActived = function () {
        var found = _.find($scope.itemList, function (item) {
          return item.selected === true
        });
        return found;
      }

      $scope.deleteItems = function () {
        var selectedItems = _.filter($scope.itemList, function (item) {
          return item.selected === true
        });
        console.log(selectedItems)
      }

      $scope.openModal = function () {
        var modalInstance = $modal.open({
          backdrop: "static",
          keyboard: false,
          size: "lg",
          templateUrl: 'templates/body-edit.html', // scope is in ModalInstanceCtrl
          controller: 'BodyCtrl'
          /*, resolve: {
           user: function () {
           return scope.user // 指令内部控制器，不能访问到外部 scope
           }
           }*/
        })

        modalInstance.result.then(function () {
          sliderService.startAutoHide();
        }, function () {
          sliderService.startAutoHide();
        });

        modalInstance.opened.then(function () {
          sliderService.stopAutoHide();
        })
      }
    })

dispatch.controller('EntityPanelCtrl', function ($scope, $modal, sliderService) {
  $scope.selectApprovalForm = function () {
    $scope.tab = {
      content: "templates/approval-form-content-detail.html",
      operator: "templates/approval-form-operator.html"
    }
  }

  $scope.selectBody = function () {
    $scope.tab = {
      content: "templates/body-detail.html",
      operator: "templates/body-operator.html"
    }
  }

  $scope.editApprovalForm = function () {
    var modalInstance = $modal.open({
      backdrop: "static",
      keyboard: false,
      size: "lg",
      templateUrl: 'templates/approval-form-content-edit.html',
      controller: 'ApprovalFormCtrl'
      /*, resolve: {
       user: function () {
       return scope.user // 指令内部控制器，不能访问到外部 scope
       }
       }*/
    })

    modalInstance.result.then(function () {
      sliderService.startAutoHide();
    }, function () {
      sliderService.startAutoHide();
    });

    modalInstance.opened.then(function () {
      sliderService.stopAutoHide();
    })
  }

  $scope.fullscreenBody = function () {
    var $indexScope = parent.angular.element('#indexMain').scope();
    $indexScope.openModal({
      templateUrl: 'app/dispatch/templates/body-detail-fullscreen.html',
      size: 'fullscreen',
      keyboard: true
    })
  }

  $scope.submitItem = function () {
    var modalInstance = $modal.open({
      backdrop: "static",
      templateUrl: 'templates/submit.html',
      size: 'middle',
      keyboard: true,
      controller: 'SubmitCtrl'
    })

    modalInstance.result.then(function () {
      sliderService.startAutoHide();
    }, function () {
      sliderService.startAutoHide();
    });

    modalInstance.opened.then(function () {
      sliderService.stopAutoHide();
    })
  }
})

dispatch.controller('ApprovalFormCtrl', function ($scope, $modalInstance, requestService) {
  $scope.submit = function () {
    console.log("submit")
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})

dispatch.controller('SubmitCtrl', function ($scope, $modalInstance, requestService) {
  $scope.submit = function () {
    console.log("submit")
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})



dispatch.controller('BodyCtrl', function ($scope, $modalInstance, requestService) {

})



