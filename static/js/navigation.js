$(document).ready(function(){
	console.log('ready')

	$('#create_new_group').click(function(){
		console.log('create_new_group pressed')
		$('.quick_serach_div').css("left", "-999em")
		$('.new_group_form').css("left", "15%")
	})
})