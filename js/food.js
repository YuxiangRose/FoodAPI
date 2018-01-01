$(document).ready(function(){
	$.ajax({
		url:"https://imhungry-app.herokuapp.com/restaurant",
		success:function(result){
			result.forEach(function(restaurant){
				// if(!restaurant.image){
				// 	$.ajax({
				// 		url:"https://imhungry-app.herokuapp.com/restaurant/" + restaurant._id,
				// 		method:"DELETE",
				// 		success:function(result){
				// 			console.log(result);
				// 		}
				// 	});
				// }
				var foodBox = '<div class = "container" id="'+restaurant._id +'">';
				foodBox += '<div class="food-box row-2"';
				foodBox += 'style="background-image:url('+ restaurant.image +')"';
				foodBox += '>';
				foodBox += '<h5>' + restaurant.name +'</h5>';
				foodBox += '<h6>' + restaurant.type +'</h6>';
				foodBox += '<p>' + restaurant.address +'</p>';
				foodBox += '</div>';
				foodBox += '<div class="btn edit">EDIT</div>';
				foodBox += '<div class="btn delete">DELETE</div>';
				foodBox += '</div>';
				$(".food-container").append(foodBox);
			});
		}
	});
	$("div").on('click','.edit',function(){
		var id = $(this).parent('.container').attr('id');
		window.location.replace("edit.html?id="+id); 
	});


	$("div").on('click','.delete',function(){
		console.log('23232');
		var id = $(this).parent('div').attr('id');
		$.ajax({
			url:"https://imhungry-app.herokuapp.com/restaurant/" + id,
			method:"DELETE",
			success:function(result){
				$('#'+id).remove();
			}
		});
	});
});









