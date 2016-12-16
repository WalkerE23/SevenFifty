module.exports.showAllWholesalers = function(req,res){
	//return all of the records in the user table
	res.send([{firstName:"Elliott"},{firstName:"Weldon"},{firstName:"Esten"},{firstName:"Rosamond"}]);
}
module.exports.showAllBlacklist = function(req,res){
	//return all of the records in the user table
	res.send([{firstName:"Elliott"},{firstName:"Weldon"},{firstName:"Esten"},{firstName:"Rosamond"}]);
}
module.exports.addToBlacklist = function(req,res){
	console.log(req.body)
}

module.exports.removeFromBlacklist = function(req,res){
	console.log(req.body)
}
