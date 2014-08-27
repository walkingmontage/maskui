/*
 author: montage  date: 2012/08/01
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory); // AMD support for RequireJS etc.
  } else {
    factory();
  }
}(function () {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d)\}/g, function () {
      return args[arguments[1]];
    });
  };

  var doc = window.document,
    defaults = {
      //message: 'Loading...',
      zIndex: 100,
      css: {
        position: 'fixed',
        left: '50%',
        top: '50%'
      },
      overlayCss: {
        backgroundColor: '#000',
        opacity: 0.4,
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      },
      pos: 'fixed',
      overlayClick: false,
      needOverlay: true,
      onOpen: null
    },

    isIE6 = navigator.userAgent.toLowerCase().indexOf('msie 6.0') != -1;

  var maskui = function () {
  };

  maskui.queue = [];		//存放弹出层
  maskui.queueClear = function () {
    $.each(maskui.queue, function (i, v) {
      v.hide();
    });
    maskui.queue = [];
  };

  maskui.prototype = {
    open: function (o) {
      //深度合并 注意这里的extend如果不加第2个参数{} 就会修改defaults
      var opts = $.extend(true, {}, defaults, o);
      var _ui, el = opts.elem;

      if (typeof el === 'string') {
        _ui = $('#' + el);
      } else if (typeof el === 'object' && el.nodeType && el.nodeType == 1) {
        _ui = $(el);
      } else if (typeof el === 'object' && el.selector !== undefined && el.length > 0) {
        _ui = el;
      } else if (opts.content !== undefined) {
        _ui = $($.maskUI.config.wrap.format(opts.content));
        this.destroy = true;
      } else {
        return false;
      }

      this.ui = _ui;
      this.css = opts.css;
      this.overlayCss = opts.overlayCss;
      this.zIndex = opts.zIndex;
      this.onClose = opts.onClose;
      this.resetForm = opts.resetForm || false;

      if ($.isFunction(opts.onOpen)) {
        opts.onOpen(this);
      }

      if (opts.needOverlay) {
        this.createOverlay();
      }
      this.createContent(opts.pos, opts.overlayClick);
    },

    alert: function (param, btnValue) {
      this.destroy = true;

      if(typeof param === 'string'){
        this.open({
          elem: $($.maskUI.config.alert.format(param, btnValue || '确定'))
        });
      }else if($.isPlainObject(param)){

        param.elem = $($.maskUI.config.alert.format(param.msg, btnValue || '确定'));
        param.overlayClick = false;
        this.open(param);
      }

    },

    confirm: function (o) {
      var _this = this;
      this.destroy = true;
      this.createCallback = function () {
        var ui = this;
        ui.on('click', 'a.confirm_ok', function (e) {
          e.preventDefault();
          o.callback.call(ui);
          $.maskUI.close.call(ui, _this);
        });
      };


      o.elem = $($.maskUI.config.confirm.format(o.msg, o.className));
      o.overlayClick = false;
      this.open(o);
    },

    createOverlay: function () {
      var exCSS = {'z-index': this.zIndex};
      if (isIE6) {
        exCSS = {'z-index': this.zIndex, 'position': 'absolute', 'width': $(document).width(), 'height': $(document).height()};
      }
      if (maskui.overlay) {
        maskui.overlay.css($.extend({}, this.overlayCss, exCSS)).show();
      } else {
        maskui.overlay = $('<div/>').attr('id', 'maskOverlay').css($.extend({}, this.overlayCss, exCSS)).prependTo($('body'));
      }
      maskui.queueClear();
    },
    createContent: function (pos, bool) {
      var ui = this.ui, _this = this;

      maskui.queueClear();
      if (!$.contains(document.body, ui[0])) {
        ui.appendTo($('body'));
      }

      var _pos = isIE6 ? 'absolute' : pos;
      var _css = {
        'margin-left': -1 * Math.floor(ui.outerWidth() / 2) + 'px',
        'margin-top': -1 * Math.floor(ui.outerHeight() / 2) + 'px',
        'position': _pos,
        'z-index': parseInt(this.zIndex, 10) + 1,
        'display': 'block'
      };

      //absolute时 控制dialog居中
      if(_pos === 'absolute'){
        _css.top = parseInt($(window).scrollTop()) + parseInt($(window).height()/2);
      }

      ui.css($.extend({}, this.css, _css));
      maskui.queue.push(ui);

      if (bool) {
        $('#maskOverlay').on('click', function () {
          $.maskUI.close.call(ui, _this);
        });
      }

      ui.find('.maskui_close,.maskuiclose, #dialogClose, a.dialog_close').on('click', function (e) {
        e.preventDefault();
        $.maskUI.close.call(ui, _this);
      });

      if (this.createCallback) {
        this.createCallback.call(ui);
      }
    }
  };

  $.maskUI = {
    config: {
      wrap: '<section class="maskui_dialog"><div class="dialog_con"><a href="javascript:;" class="maskui_close"></a>{0}</div></section>',
      alert: '<section class="maskui_dialog"><div class="dialog_con"><a href="javascript:;" class="maskui_close"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskui_close">{1}</a></p></div></div></section>',
      confirm: '<section class="maskui_dialog"><div class="dialog_con"><a href="javascript:;" class="maskui_close"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskui_close">取消</a></p></div></div></section>'
    },
    open: function (o) {
      var m = new maskui();
      m.open(o);
      return m;
    },
    alert: function (msg, btnValue) {
      var m = new maskui();
      m.alert(msg, btnValue);
      return m;
    },
    confirm: function (o) {
      var m = new maskui();
      m.confirm(o);
      return m;
    },
    close: function (t) {
      t = t || {};
      //t 为jquery对象时做为内部参数使用
      $('#maskOverlay').fadeOut(200).off('click');

      if (t.closeCallback) {
        t.closeCallback.call(this);
      }

      //
      if (t.onClose) {
        t.onClose.call(this);
      }

      if(t.resetForm){
        var innerForm = this.find('form').eq(0);
        if(innerForm.length){
          innerForm[0].reset();
        }
      }

      if (t.destroy) {
        this.remove();
      }

      if (this && this.selector) {
        this.find('.maskui_close,.maskuiclose, #dialogClose, a.dialog_close').off('click');
      }
      maskui.queueClear();
    }
  };
}));