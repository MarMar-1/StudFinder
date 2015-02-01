$(document).ready(function(){
	console.log('ready')

	$('#create_new_group').click(function(){
		console.log('create_new_group pressed')
		$('.main_nav').css("left", "100%")
		$('.new_group_form').css("left", "15%")
	})
})