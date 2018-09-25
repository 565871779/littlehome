$(function(){
	let mtj = document.querySelector('.menu-title-j');
	let mtg = document.querySelector('.menu-title-g');
	let art2 = document.querySelector('#art-r2');
	let art1 = document.querySelector('.art-right1');
	let err=1;
	let err2=1;
	mtg.onclick = function(){
		art2.style.display='block';
		art1.style.display='none';
		this.style.backgroundColor='white'
		mtj.style.backgroundColor='ghostwhite'
	}
	mtj.onclick = function(){
		art2.style.display='none';
		art1.style.display='block';
		this.style.backgroundColor='white'
		mtg.style.backgroundColor='ghostwhite'
	}
	
	//修改的时候判断修改的密码格式和确认密码是否一致
	$("input[name=password]").eq(0).on("focus",function(){
			let This=this;
			$(This).parent().next().removeClass("red");
			$(This).parent().next().html('密码位6-16位,数字字母组合');
			$(This).parent().next().css("font-size","12px");
			$(".right").eq(0).css("display","none");
		})
	$("input[name=password]").eq(0).on("blur",function(){
			//6-12位数字加字母组成
		let regpasswd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
		if(!(regpasswd.test($(this).val()))){
			$(this).parent().next().addClass("red");
        	$(this).parent().next().html('密码格式不对');
			err2++;
		} else {
			$(this).parent().next().html(" ");
			$(".right").eq(0).css("display","inline-block ");
			err2=0;
			if($("input[name=password]").eq(0).val()==$("input[name=password1]").eq(0).val()){
					$("input[name=password1]").eq(0).parent().next().html(" ");
					$(".right").eq(1).css("display","inline-block ");
					err=0;
				}
			}	
		})
	$("input[name=password1]").eq(0).on("focus",function(){
			let This=this;
			$(This).parent().next().removeClass("red");
			$(".right").eq(1).css("display","none");
			err=0;
		})
	$("input[name=password1]").eq(0).on("blur",function(){
		let This = this;
		if($(this).val()!=$("input[name=password]").eq(0).val()){
			$(This).parent().next().addClass("red");
        		$(this).parent().next().html('两次密码输入不一致');
				err++;
		}else {
			$(this).parent().next().html(" ");
			$(".right").eq(1).css("display","inline-block ");
			err=0;
		}
		
	})
	
	
	$('.getbtn').click(function(){
		if(err2||err){
			return;
		}
		 $.ajax({
            url: '/edit/update',
            type: 'POST',
            dataType: 'JSON',
            data: $('#loginnoe').serialize(),
            // data:data.field,
            success: function (result) {
                if(result.r == 'ok'){
                    alert("修改成功");
                    window.location.href = '/userCenter';                   
                }
                if(result.r == 'err'){
                	alert("修改失败，请稍候再试");
                }
            }
       })
	})
	$("#touxiang").on("change",function(){
		console.log(this.files[0]);
		let This = this;
		let formdata = new FormData();
		formdata.append("images",This.files[0]);
		$.ajax({
            url: '/uploads',
            type: 'POST',
            dataType: 'JSON',
            data: formdata,
	        cache: false,
	        contentType: false,
	        processData: false,
            // data:data.field,
            success: function (result) {
            	console.log(result.data);
                if(!result.errno){
                    $('.big_photo img').attr('src',result.data[0]);
                    $('.mall_photo img').attr('src',result.data[0]);
                }
                else{
                	alert("修改失败，请稍候再试");
                }
            }
        })

	})
	
	$('#submitu').click(function(){
		if(!$("#touxiang").val()){
			alert("请选择你要上传的头像");
			return;
		}
		let imgdata = $('.big_photo img').attr('src');
		$.ajax({
			url:'/edit/head-img',
			type:'POST',
			data: {newhead:imgdata},
			dataType: 'JSON',
			success: function (result){
				console.log(result.data);
				if(result.r == "ok"){
//					console.log("success");
					window.location.href = './userCenter';
				}
			}
		})
	})
})

