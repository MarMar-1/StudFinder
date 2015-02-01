var mongoose = require('mongoose')
var options = {
	user: 'admin',
	pass: 'uhn5IbWwNsS4'
}
var ip_addr = process.env.OPENSHIFT_MONGODB_DB_HOST   || '127.0.0.1';
var port    = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';
var groupsList = null

var groupsModel

var groupsFormat = new mongoose.Schema({

	datetime: Array,
	class_name: String,
	teacher: String,
	location: String,
	max_people: Number,
	user_name: String,
	start_time: String,
	end_time: String
})

if(ip_addr == '127.0.0.1'){
	var uri = ip_addr + ':' + port + '/groups'
	var db = mongoose.createConnection(uri)	
}
else{
	var uri = ip_addr + ':' + port + '/studyfinder'
	var db = mongoose.createConnection(uri, options)
}

db.on('connected', function callback(){
	groupsList = db.collection('groupsList')
	groupsModel = db.model('groupsModel',groupsFormat, groupsList.name)

	console.log('connected to db: ' + groupsList.name);
})

exports.updateGroupsStatus = function(images,newStatus,callback){
	console.log(images)
	groupsList.findOne({images:images},function(err,data){
		if(err) return console.log(err)
		var groups = data
		groups.status = newStatus

		groupsList.update(
				{images:groups.images},
				{
					datetime: groups.datetime,
					class_name: groups.class_name,
					teacher: groups.teacher,
					location: groups.location,
					max_people: groups.max_people,
					user_name: groups.user_name,
					start_time: groups.start_time,
					end_time: groups.end_time
				},
				function(err,affected){
					if(err) return console.log('err updating db @ mongoDB.js > updateGroupsStatus()')
					console.log('updated ' + affected + ' entries')
					return callback()
				})
	})
}
exports.removeEntry = function(images,callback){
	groupsList.findOne({images:images},function(err,data){
		if(err) return console.log(err)
		var groupsId = data._id

		groupsList.remove({_id:groupsId},function(err){
			if(err) return error
			return callback()
		})
	})
}
exports.getAllEntries = function(callback){
	groupsList.find(function(err,data){
		if(err) return console.log('error')
		data.toArray(function(err, array){
			return callback(array)
		})
	})
}
exports.saveGroups = function(params,callback){

	var groups = new groupsModel({
		datetime: [Date.now()],
		class_name: params.class_name,
		teacher: params.teacher,
		location: params.location,
		max_people: params.max_people,
		user_name: params.user_name,
		start_time: params.start_time,
		end_time: params.end_time
	})

	save(groups, callback)
	
	// groupsList.count({
	// 	groupsType: groups.groupsType,
	// 	compLocation: groups.compLocation,
	// 	status: groups.status
	// },function(err, count){
	// 	if(err) 
	// 		return console.log('whelp')
	// 	if(count == 0){
	// 		return save(groups, callback)
	// 	}
	// 	else{
	// 		console.log('groups already exists')
	// 		return update(groups, callback)
	// 	}
	// })
}
function save(groups, callback){
	groups.save(function(err){ 
		if(err) return console.log('whoops an error')

		console.log('saved groups')

		return callback()
	})
}
function update(groups, callback){
	groupsList.findOne(
		{groupsType:groups.groupsType, compLocation: groups.compLocation, status: groups.status},
		function(err,data){
			if(err) return console.log('error finding groups')
			var newCount = data.groupsCount + 1

			var newDescription = data.description
			newDescription.push(groups.description[0])

			var newImages = data.images
			newImages.push(groups.images[0])
			
			var newDates = data.datetime
			newDates.push(groups.datetime[0])

			groupsList.update(
				{
					groupsType:groups.groupsType, 
					compLocation: groups.compLocation, 
					status: groups.status},
				{
					datetime: newDates,
					description: newDescription,
					compLocation: groups.compLocation,
					location: groups.location,
					images: newImages,
					groupsTo: groups.groupsTo,
					groupsType: groups.groupsType,
					groupsCount: newCount,
					status: groups.status},
				function(err,affected){
					if(err) return console.log('err updating db @ mongoDB.js > update()')
					console.log('updated ' + affected + ' entries')
					return callback()
				})
		})
}