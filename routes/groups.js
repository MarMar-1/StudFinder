var db = require('../mongoDB.js')

exports.post = function(req,res){
	console.log('POST groups')
	var groups = req.body
	groups.image = req.files.image.name
	db.saveReport(groups, function(){return res.redirect('/')})
}