$(function(){
	
let grcard=document.querySelector('.grcard');
console.log(grcard);
let w = grcard.offsetWidth;
let h = grcard.offsetHeight;
let sid;
let duid;
$(".carduser-name").on("mouseover",function(event){
	$(".grcard").css("display","block");
	var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    grcard.style.left=x-w/2 +'px';
    grcard.style.top=y+h-50+'px';
    
    duid = $(this).attr('data-id');
    console.log(duid);
	$.ajax({
		url:'/index/fans',
		type:'POST',
		data:{duid:duid},
		async: true,
		dataType: "JSON",
		success: function(data) {
			let pinner = data.arr.uname;
			let imgsrc = data.arr.uhead;
			$('.gr_card_foot .name').html(pinner);
			$('.gr_card_photo img').attr('src',imgsrc);
			
			if(data.arr1.length){
				$(".canorfans").html('取消关注');
			}
		}		
	})
		
})

$('.carduser-name').eq(0).off('mouseover');

$(".carduser-name").on("mouseleave",function(){
	sid = setTimeout(function(){
		$(".grcard").css("display","none");
	},300)
	
	
})
$(".grcard").on("mouseover",function(){
	clearTimeout(sid)
})
$(".grcard").on("mouseleave",function(){
	$(".grcard").css("display","none");
	
	
})
$(".canorfans").on("click",function(){
	if($(this).html()=="关注"){
		$.ajax({
		url:'/index/guanzhu',
		type:'POST',
		data:{guid:duid,guidhead:$('.gr_card_photo img').eq(0).attr('src')},
		async: true,
		dataType: "JSON",
		success: function(data) {
			if(data.r=="ok"){
				alert("关注成功");
			}
			if(data.r=="nouid"){
				alert("请先登录	");
			}
		}		
	})
		
		
	}
	
		if($(this).html()=="取消关注"){
		$.ajax({
		url:'/index/cancel',
		type:'POST',
		data:{cuid:duid},
		async: true,
		dataType: "JSON",
		success: function(data) {
			if(data.r=="ok"){
				alert("取关成功");
			}
		}		
	})
		
		
	}
	
	
})
})


