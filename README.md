#maskui

A jquery dialog plugin

##API:

* $.maskUI.config = {}
    * config的作用是自定义dialog的样式，覆盖默认的样式，自定义的dialog无需引入maskui.less
    * options:
        * `wrap`: 基本的结构，包括dialog框和关闭按钮
        * `alert:` 基于wrap的alert 结构，包含“确定”按钮
        * `confirm:` 基于wrap的confirm 结构，包含“确定”和“取消”按钮

* $.maskUI.open(options) （自己定制）
    * options [Object]:
        * `elem:` [String/DOM/jQueryObject] dialog对象，传String视为id，不使用config定义的样式   [和content二选一]

        * `content:` 动态添加一段HTML，使用config定义的样式 [和elem二选一]
        * `id:` [String] content时使用，为dialog添加id，配合destroy=false实现动态添加且关闭后不删除

        * `css:` [Object] dialog的css样式, 使用$.fn.css语法
        * `overlayCss:` [Object] overlay的css样式， 使用$.fn.css 语法
        * `pos:` [String] 定义dialog的position，默认是fixed, 可设置为absolute
        * `overlayClick:` [Boolean] 是否点击overlay可以关闭dialog,默认false
        * `needOverlay:` [Boolean] 是否需要显示overlay,默认true
        * `zIndex:` [Number] overlay的z-index值，默认为100，dialog的z-index为overlay的+1
        * `onOpen:` function(_this){}  打开dialog之前触发，this = $(dialog)， _this为maskui实例
        * `onClose:` function(_this){}  关闭dialog之后触发，this = $(dialog)， _this为maskui实例
        * `resetForm:` [Boolean] 重置dialog内的表单
        * `destroy:` [Boolean] dialog关闭后是否删除，elem默认不删除，content默认删除

* $.maskUI.alert(options) （简单的alert提示，关闭后dialog自动删除）
    * options（两种方式）:
        * 第一个参数为String. (msg, btnValue)
            * `msg:` [String] 要alert的文本或html
            * `btnValue:` [String] alert提示框的按钮，默认为‘确定’

        * 第一个参数为Object. (object, btnValue)
            * `object:` {msg: string, ...}  msg参数同1，还可以传入更多参数，同$.maskUI.open的options
            * `btnValue:` 同1


* $.maskUI.confirm(options) （简单的confirm提示，关闭后dialog自动删除）
    * options [Object]:
        * `msg:` [String]  要confirm的文本或html
        * `callback:` function(){} 点击确定时的回调, this = $(dialog)
        * `更多参数同$.maskUI.open的options`


* $.maskUI.close() 关闭
    * `.maskui_close` 在dialog内部的这些className 默认绑定了close事件



