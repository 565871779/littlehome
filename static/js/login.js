$(function() {
	$('#codeimg').click(function () {
        $(this).attr('src', '/coder?' + new Date());
    });
    
	$("input[name=submit]").click(function() {
		$.ajax({
			type: "post",
			url: "/login/login",
			async: true,
			dataType: "JSON",
			data: $("#denglu").serialize(),
			success: function(data) {
				if(data.r == 'ok') {
					window.location.href = '/list.html';
				} else {
					console.log(data);
				}
			},
			fail: function(err) {
				console.log(err);

			}
		});

	})

})