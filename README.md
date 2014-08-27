#maskui

A jquery dialog plugin

##API:

* $.maskUI.open(options);
    * options:
        * `elem:` dialog对象，可以传id、DOM对象或jquery对象   [必填]
        * `css:` {} dialog的css样式, 使用$.fn.css语法    [可选]
        * `overlayCss:` {} overlay的css样式， 使用$.fn.css 语法   [可选]
        * `pos:` '' 定义dialog的position，默认是fixed, 可设置为absolute  [可选]
        * `overlayClick:` boolean 是否点击overlay可以关闭dialog,默认false [可选]
        * `needOverlay:` boolean 是否需要显示overlay,默认true   [可选]
        



