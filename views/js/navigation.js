$(document).ready(function(){
	console.log('ready')

	$('#create_new_group').click(function(){
		$('.main_nav').css("left", "-200%")
		$('.new_group_form').css("left", "15%")
	})
}