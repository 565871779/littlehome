$(function() {


	layui.use('element', function() {
		var element = layui.element;
	});
	layui.use('form', function() {
		var form = layui.form;
	});
	window.onscroll = function() {
		let stop = document.documentElement.scrollTop || document.body.scrollTop;
		if(stop >= 100) {
			$(".layui-nav").css("position", "fixed");
			$(".layui-nav").css("width", "100%");
			$(".layui-nav").css("top", "0");
		} else {
			$(".layui-nav").css("position", "relative");
		}
	}

	//首页的搜索功能
	$('.search-btn').click(function() {
		//$.ajax({
		//	url: '/search',
		//	type: 'get',
		//	dataType: 'JSON',
		//	data:{keyword:$("#layui-input").val()},
		//	success: function(result) {
		//		window.open('/search.html');
		//	}
		//	})
		window.location.href = "http://localhost:8088/search?keyword=" + $("#layui-input").val();
	})
})