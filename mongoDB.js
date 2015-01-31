var mongoose = require('mongoose')
var options = {
	user: 'admin',
	pass: 'r9Ptnm4zL6a3'
}
var ip_addr = process.env.OPENSHIFT_MONGODB_DB_HOST   || '127.0.0.1';
var port    = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';

if(ip_addr == '127.0.0.1'){
	var uri = ip_addr + ':' + port + '/reports'
	var db = mongoose.createConnection(uri)	
}
else{
	var uri = ip_addr + ':' + port + '/broncohacks'
	var db = mongoose.createConnection(uri, options)
}

db.on('connected', function callback(){
	// reportList = db.collection('reportList')
	// userList = db.collection('userList')
	// reportModel = db.model('reportModel',reportFormat, reportList.name)
	// userModel = db.model('userModel',userFormat, userList.name)

	// console.log('connected to db: ' + reportList.name + ' and ' + userList.name);
})