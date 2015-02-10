angular.module("changeNotification", [])
    .directive('onDocumentMousedown', ['$document',
      function ($document) {
        return {
          restrict: 'A',
          link: function (scope, element, attrs) {

            var onMousedown = function () {
              scope.$apply(function () {
                scope.$eval(attrs.onDocumentMousedown);
              });
            };

            $document.on('mousedown', onMousedown);

            scope.$on('$destroy', function () {
              $document.off('mousedown', onMousedown);
            });
          }
        };
      }
    ]);