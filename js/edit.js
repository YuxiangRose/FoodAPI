$(document).ready(function(){
	function GetURLParameter(sParam){
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++)
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam)
	        {
	            return sParameterName[1];
	        }
	    }
	};
	var id = GetURLParameter('id');
	if (id){
		$(".title").text('Update Restaurant');
		$(".create").hide();
		$.ajax({
			url:"https://imhungry-app.herokuapp.com/restaurant/"+id,
			success:function(result){
				console.log(result);
				$("input[name='name']").val(result.name);
				$("input[name='type']").val(result.type);
				$("input[name='address']").val(result.address);
				if (result.image) {
					$("input[name='url']").val(result.image);
					$(".preview").attr('src',result.image);
				}
			}
		});
	} else {
		$(".update").hide();
	}

	$("input[name='url']").change(function() {
		if($("input[name='url']").val()) {
			//if(imageExist($("input[name='url']").val())){
				$(".preview").attr('src', $("input[name='url']").val());
			// } else {
			// 	$("input[name='url']").val('wrong Url');
			// 	$(".preview").hide()
			// }
		} else {
			$(".preview").hide();
		}
	});

	function imageExist(url) {
		var img = new Image();
		img.src = url; 
		console.log(img.height);  
		if (img.height != 0) {
		 return true;
		} else {
		 return false ;
		}
	}

	$(".create").click(function() {
		if($("input[name='name']").val() 
			&& $("input[name='type']").val() 
			&& $("input[name='address']").val()
			&& $("input[name='url']").val()
		){
			var restaurant = {
				name: $("input[name='name']").val(),
				type: $("input[name='type']").val(),
				address: $("input[name='address']").val(),
				image: $("input[name='url']").val(),
			}

			$.ajax({
				url:"https://imhungry-app.herokuapp.com/restaurant/",
				method: "POST",
				data: JSON.stringify(restaurant),
				contentType: 'application/json',
				success:function(result){
					window.location.replace("index.html"); 
				}
			});
		} else {
			alert('please check the input, some thing invalid');
		}
	});

	$(".update").click(function() {
		if($("input[name='name']").val() 
			&& $("input[name='type']").val() 
			&& $("input[name='address']").val()
			&& $("input[name='url']").val()
		){
			var restaurant = {
				id: id,
				name: $("input[name='name']").val(),
				type: $("input[name='type']").val(),
				address: $("input[name='address']").val(),
				image: $("input[name='url']").val(),
			}

			$.ajax({
				url:"https://imhungry-app.herokuapp.com/restaurant/"+id,
				method: "PUT",
				data: JSON.stringify(restaurant),
				contentType: 'application/json',
				success:function(result){
					window.location.replace("index.html"); 
				}
			});
		} else {
			alert('please check the input, some thing invalid');
		}
	});
});









