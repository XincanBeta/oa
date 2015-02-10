/*
*
* 实际应用场景：发文应用，折叠显示/隐藏子菜单
* * */

angular.module('angularSlideables', [])
    .directive('slideToggle', function () {
      return {
        restrict: 'A',
        scope: {
          slideExpanded: "=" // 对外暴露状态
        },
        link: function (scope, element, attrs) {
          var selector = attrs.slideToggle, target;

          // 链接阶段 比 scope上的方法先执行，所以把对 dom 的操作放到 click 事件内。
          element.bind('click', function () {
            if(!selector) {
              target = element.parents("li").find("[slideable]"); // 默认值
              if(!target.length) {
                return ; // 允许找不到
              }
            } else {
              target = $(selector)
            }
            target = target[0];
            var content = target.querySelector('.slideable_content');
            // 注： var expanded = scope.slideExpanded， 此种对 expanded 的操作，不会对 scope.slideExpanded 有影响
            if(!scope.slideExpanded) {
              content.style.border = '1px solid rgba(0,0,0,0)';
              var y = content.clientHeight;
              //console.log("y",y)
              content.style.border = 0;
              target.style.height = y + 'px';
            } else {
              target.style.height = '0px';
            }
            scope.slideExpanded = !scope.slideExpanded;

          });
        }
      }
    })
    .directive('slideable', function () {
      return {
        restrict: 'A',
        scope: {
          initSlideExpanded: "=" // 与外联通的状态
        },
        compile: function (element, attr) {
          var contents = element.html(); // 注：获取元素内部的 html，而非本身的
          element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');
          return function postLink(scope, element, attrs) {
            var obj;
            // default properties （可以在元素标签上直接设置，或者用默认值）
            attrs.duration = (!attrs.duration) ? '0.3s' : attrs.duration;
            attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
            obj = {
              'overflow': 'hidden',
              'height': '0',
              'transitionProperty': 'height',
              'transitionDuration': attrs.duration,
              'transitionTimingFunction': attrs.easing
            }
            scope.initSlideExpanded ? obj.height= 'auto' : '';
            //scope.initSlideExpanded ? obj.height= attrs.height : '';
            element.css( obj );
          };
        }
      };
    })

