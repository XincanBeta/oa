/**
 * 使用方法：
 * on-document-hotkeys="{type:'keydown', key:'ctrl+n', handler:test}"
 */

angular.module("hotkeys", [])
    .directive('onDocumentHotkeys', ['$document',
      function ($document) {
        return {
          restrict: 'A',
          link: function (scope, element, attrs) {
            var hotkey = scope.$eval(attrs.onDocumentHotkeys);
            $document.bind(hotkey.type, hotkey.key, hotkey.handler);

            scope.$on('$destroy', function () {
              $document.off(hotkey.type, hotkey.handler);
            });
          }
        };
      }
    ]);