$(function() {
	$('#codeimg').click(function () {
        $(this).attr('src', '/coder?' + new Date());
    });
    
	$(".denglu").click(function() {
		$.ajax({
			type: "post",
			url: "/login/login",
			async: true,
			dataType: "JSON",
			data: $("#denglu").serialize(),
			success: function(data) {
				if(data.r == 'ok') {
					window.location.href = '/index';
					alert("登录成功！")
				} else if(data.r == 'u_not'){
					alert("用户名不存在")
				} else if(data.r == 'p_err'){
					alert("密码错误")
				}else if(data.r == "coder_err"){
					alert("验证码错误")
				}
			},
			fail: function(err) {
				console.log(err);

			}
		});

	})

})