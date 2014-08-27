#maskui

A jquery dialog plugin

##API:

* $.maskUI.config = {}
    * config的作用是自定义dialog的样式，覆盖默认的样式，自定义的dialog无需引入maskui.less
    * options:
        * `wrap`: 基本的结构，包括dialog框和关闭按钮

* $.maskUI.open(options) （自己定制）
    * options [Object]:
        * `elem:` dialog对象，可以传id、DOM对象或jquery对象，不使用$.maskUI.config定义的默认dialog结构   [必填]
        * `content:` 传入一段

        * `css:` Object dialog的css样式, 使用$.fn.css语法
        * `overlayCss:` Object overlay的css样式， 使用$.fn.css 语法
        * `pos:` String 定义dialog的position，默认是fixed, 可设置为absolute
        * `overlayClick:` Boolean 是否点击overlay可以关闭dialog,默认false
        * `needOverlay:` Boolean 是否需要显示overlay,默认true
        * `zIndex:` Number overlay的z-index值，默认为100，dialog的z-index为overlay的+1
        * `onOpen:` function(_this){} 打开dialog之前触发，this为dialog, _this为maskui实例
        * `onClose:` function(){} 关闭dialog之后触发，this为dialog
        * `resetForm:` Boolean 调动form.reset方法重置表单

* $.maskUI.alert(options) （简单的alert提示）
    * options（两种方式）:
        * 1. (msg, btnValue)
            * `msg:` String 要alert的文本
            * `btnValue:` String alert提示框的按钮，默认为‘确定’

        * 2. (object, btnValue)
            * `object:` {msg: string, ...}  msg参数同1，还可以传入更多参数，同$.maskUI.open的options
            * `btnValue:` 同1


* $.maskUI.confirm(options) （简单的confirm提示）
    * options [Object]:
        * `className:`
        * `msg:` String 要confirm的文本
        * `callback:` function(){} 点击确定时的回调


* $.maskUI.close() 关闭
    * `.maskui_close` 在dialog内部这些className 默认绑定了close事件



