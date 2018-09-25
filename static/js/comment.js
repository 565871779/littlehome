$(function(){
	var E = window.wangEditor;
			var editor = new E('.publish-text');
			editor.customConfig.uploadImgServer = '/uploads';
			editor.customConfig.uploadFileName = 'images';
			editor.create();
			console.log($(".publish-text").attr('data-tid'))
			$(".publish-text").click(function() {
				$(".publish-text span").remove();
			})
			$("#publish").click(function() {
				$(".publish-text span").remove();
				data1 = {
					content: editor.txt.html(),
					tid:$(".publish-text").attr('data-tid')
				};
				$.ajax({
					type: "post",
					url: "/comment/publish",
					async: true,
					dataType: "JSON",
					data: data1,
					success: function(data) {
						if(data.r=="No one"){
						alert("请先登录");
					}
					if(data.r == 'ok') {
						window.location.reload();
						alert("评论成功！")
					}
				},
				fail: function(err) {
					console.log(err);

				}
			});	
})
			
			$('.comment-text img').width('300px');
})