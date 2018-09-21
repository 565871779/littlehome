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
