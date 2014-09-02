	$(function(){

		//点击弹出 已经存在的dialog
		$('#btn1').on('click', function(e){
			
			$.maskUI.open({
				elem: $('#maskuiDialog1')
			});
		});

    //点击弹出 已经存在的dialog
    $('#btn1-2').on('click', function(e){

      $.maskUI.open({
        elem: $('#maskuiDialog1'),
        pos: 'absolute'
      });
    });



		//这是动态添加的HTML
		$('#btn2').on('click', function(e){
			$.maskUI.open({
				content: '<h3>这是动态的内容</h3><div>随意放置HTML</div><p><a href="javascript:;" class="maskui_close">确定</a></p>'
			});
		});

    //关闭时不删除
    $('#btn2-2').on('click', function(e){
        $.maskUI.open({
          content: '<h3>这是动态的内容</h3><div>随意放置HTML</div><p><a href="javascript:;" class="maskui_close">确定</a></p>',

          //id + destroy=false
          id: 'remainDialog',
          destroy: false
        });
    });

    //dialog高度超出
    $('#btn2-3').on('click', function(e){
      $.maskUI.open({
        content: '<h3>这是动态的内容</h3><div style="height: 1000px;">随意放置HTML</div><p><a href="javascript:;" class="maskui_close">确定</a></p>'
      });
    });

		//alert
		$('#btn3').on('click', function(){
			$.maskUI.alert('热烈庆祝中华人民共和国');
		});


		//confirm
		$('#btn4').on('click', function(){
			//传入confirm的内容 和 点击确定后执行的事件 callback里this为jquery对象 指向弹出层
			$.maskUI.confirm({
				msg: 'Are you sure to delete this item!',
				callback: function(){
					alert('ok');
				}
			})
			
		});

    //onOpen
    $('#btn5').on('click', function(e){
      $.maskUI.open({
        content: '<h1>onOpen</h1><h4>打开dialog之前的回调方法</h4><p class="t-center"><a href="javascript:;" class="dialog_btn maskui_close">确定</a></p><p>&nbsp;</p>',
        onOpen: function(_this){
          this.css('width', '600');
          alert('before opening dialog ！');
          alert('this为dialog的jquery对象： ' + this.jquery + '\n' + '_this为当前的实例，属性有：' + Object.keys(_this));
        }
      });
    });

    //onClose
    $('#btn6').on('click', function(e){
      $.maskUI.open({
        content: '<h1>onClose</h1><h4>关闭dialog时的回调方法</h4><p class="t-center"><a href="javascript:;" class="dialog_btn maskui_close">确定</a></p><p>&nbsp;</p>',
        onClose: function(_this){
          alert('after closing dialog ！');
          alert('this为dialog的jquery对象： ' + this.jquery + '\n' + '_this为当前的实例，属性有：' + Object.keys(_this));
        }
      });
    });

    $('#btn7').on('click', function(e){
      $.maskUI.open({
        content: '<div>点击overlay关闭dialog</div><p><a href="javascript:;" class="maskui_close">确定</a></p>',
        overlayClick: true
      });
    });

    $('#btn8').on('click', function(e){
      $.maskUI.open({
        content: '<div>点击overlay关闭dialog</div><p><a href="javascript:;" class="maskui_close">确定</a></p>',
        needOverlay: false
      });
    });


	});
