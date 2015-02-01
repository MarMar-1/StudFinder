//.class and # id
$(document).ready(function(){
	console.log('ready')

	$('#create_new_group').click(function(){
		console.log('create_new_group pressed')

		$('.new_group_form').css("left", "43%")
		$('.new_group_form').css("top", "50%")
		$('#create_new_group').css("display", "none")
		$('#advanced_search').css("display", "none")
		$('.quick_search_div').css("display", "none")
	})

	$('#advanced_search').click(function(){
		console.log('advanced_search pressed')
		$('.advanced_search_form').css("left", "43%")
		$('.advanced_search_form').css("top", "50%")
		$('#create_new_group').css("display", "none")
		$('#advanced_search').css("display", "none")
		$('.quick_search_div').css("display", "none")
		$('.new_group_form').css("display", "none")
		$('#form form').css("display", "none")
	})

	$('#new_group_form_submit').click(function(){
		console.log('new_group_form pressed')
		$('.text_box').css("left", "43%")
		$('.text_box').css("top", "50%")
		$('#create_new_group').css("display", "none")
		$('#advanced_search').css("display", "none")
		$('.quick_search_div').css("display", "none")
	})
})