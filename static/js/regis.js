$(function(){
	
//点击登录按钮跳转到登录页面
	$("#href_login").click(function(){
		window.location.href='/login';
	});
		let form = layui.form;
		let err1=0;
		let err2=0;
		let err3=0;
		$('.coder').click(function(){
			//设置验证码点击变换
			$(this).children().attr('src','/coder?'+new Date()+Math.random());
		})
		$("input[name=username]").on("focus",function(){
			let This=this;
			$(This).parent().next().removeClass("red");
			$(This).parent().next().html('字母，数字，下划线，减号，4到16位');
			$(This).parent().next().css("font-size","12px")
			$(".right").eq(0).css("display","none");
		})
		$("input[name=username]").on("blur",function(){
			let This = this;
//				let passwd = 'A1a23%456';
//      		let regpasswd = /^(?=.*\W+)(?=.*[a-z]+)(?=.*[A-Z]+).{6,16}$/;
//      		console.log(passwd.match(regpasswd));
//     			 //test
//      		console.log(regpasswd.test(passwd));

        		let regnum = /^[a-zA-Z0-9_-]{4,16}$/;
     
        		let regtwo = regnum.test($(This).val());
					if(!regtwo){
        			$(This).parent().next().addClass("red");
        			$(This).parent().next().html('用户名格式不对');
        			err1++
        		}else {
        			$(This).parent().next().html('');
        			$(".right").eq(0).css("display","inline-block");
        			err1=0
        		}
				
		})
		$("input[name=password]").on("focus",function(){
			let This=this;
			$(This).parent().next().removeClass("red");
			$(This).parent().next().html('密码位6-16位,可为数字，字母');
			$(This).parent().next().css("font-size","12px");
			$(".right").eq(2).css("display","none");
		})
		$("input[name=password]").on("blur",function(){
			//6-12位数字加字母组成
			let regpasswd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
			
			if(!(regpasswd.test($(this).val()))){
				
				$(this).parent().next().addClass("red");
        		$(this).parent().next().html('密码格式不对');
				err2++
			}else {
				$(this).parent().next().html(" ");
				$(".right").eq(2).css("display","inline-block ");
				err2=0
			}	
		})
		$("input[name=tel]").on("focus",function(){
			let This=this;
			$(This).parent().next().removeClass("red");
			$(This).parent().next().html('只支持大陆手机号');
			$(This).parent().next().css("font-size","12px");
			$(".right").eq(1).css("display","none");
		})
		$("input[name=tel]").on("blur",function(){
			
			let regtel= /^[1][3,4,5,7,8][0-9]{9}$/;
			
			if(!(regtel.test($(this).val()))){
				$(this).parent().next().addClass("red");
        		$(this).parent().next().html('手机号格式不对');
        		err3++;
				return;
			}else {
				$(this).parent().next().html(" ")
				$(".right").eq(1).css("display","inline-block ");
				err3=0;
				
			}
		})
		
	    form.on('submit(loginnoe)', function(data){
	    	if(err1||err2||err3){
	    		return
	    	}
	    	
	    	
        $.ajax({
            url: '/register',
            type: 'POST',
            dataType: 'JSON',
            data: $('#loginnoe').serialize(),
            // data:data.field,
            success: function (result) {
            	console.log(result)
                if(result.r == 'coder is wrong'){
                	alert('验证码错误');	
                }
                if(result.r == 'ok'){
                    alert("注册成功");
                    window.location.href = '/index';
                    
                }
                if(result.r == 'user_existed'){
                	alert("用户名已存在");
                }
            }
        })
        return false; 
      })
  
})

