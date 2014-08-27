	$(function(){
//		$.maskUI.config = {
//			wrap: '<section class="maskui_dialog"><div class="dialog_con"><a href="javascript:;" class="maskui_close"></a>{0}</div></section>',
//			alert: '<section class="maskui_dialog"><div class="dialog_con"><a href="javascript:;" class="maskui_close"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskui_close">{1}</a></p></div></div></section>',
//			confirm: '<section class="maskui_dialog"><div class="dialog_con"><a href="javascript:;" class="maskui_close"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskui_close">取消</a></p></div></div></section>'
//		};

		//点击弹出 已经存在的dialog
		$('#btn1').on('click', function(e){
			e.preventDefault();
			$.maskUI.open({
				elem: $('#maskuiDialog1'),
				overlayClick:  true
			});
		});


		//动态DIALOG

		//这是动态添加的HTML
		var html = '<h3>这是动态的内容</h3><div>随意放置HTML</div><p><a href="javascript:;" class="maskui_close">确定</a></p>'
		
		$('#btn2').on('click', function(e){
			e.preventDefault();
			$.maskUI.open({
				content: html
			});
		});

		//alert
		$('#btn3').on('click', function(){
			//传入alert的内容
			$.maskUI.alert('热烈庆祝中华人民共和国');
		});


		//confirm
		$('#btn4').on('click', function(){
			//传入confirm的内容 和 点击确定后执行的事件 callback里this为jquery对象 指向弹出层
			$.maskUI.confirm({
				msg: 'Are you sure to delete this item!',
				callback: function(){
					alert(this.html())
				}
			})
			
		});

    var html2 = '<h3>修改个人信息</h3><p class="center_p"><i class="err_p"></i>修改密码成功！</p><p class="t-center"><a href="javascript:;" class="btn_grey_s maskui_close">确定</a></p><p>&nbsp;</p>'

    $('#btn5').on('click', function(e){
      e.preventDefault();
      $.maskUI.open({
        content: html2,
        onClose: function(){
          alert('will reload page');
          window.location.reload();
        }
      });
    });


	});
