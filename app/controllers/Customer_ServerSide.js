var pg = require('pg');
var db = require('../../config/db.js');
module.exports.fetchCustomer = function(req,res){
	
}
module.exports.validateEmail = function(req,res){
	var domain = scrubEmailForDomain(req.body.email);
	var email = req.body.email;
	console.log(domain,email);

	const client = new pg.Client(db);
	client.connect(function(err){
		if(!err){
			findOnBlacklist(client,domain,function(found,err){
				if(!found && !err){
					findIfUnique(client,email,function(unique,err){
						if(unique && !err){

							res.send({success:true});
						}
						else{
							res.send({success:false,error:err});
						}
					});
				}
				else{
					res.send({success:false,error:err});
				}
			})
		}	
		else{
			res.send({success:false,error:err});
		}
	});
}
module.exports.addCustomer = function(req,res){
  const data = req.body;
  console.log(data);
  const client = new pg.Client(db);
	client.connect(function(err){
		if(!err){
			client.query('INSERT INTO buyers(firstname,lastname,email) values ($1,$2,$3)',
				[data.firstName,data.lastName,data.email],
				function(err, result){
				if(!err){
					console.log("-----")
					console.log(result);
					console.log("-----")
					res.send({success:true});
				}
				else{
					res.send({success:false,error:err});
				}
			});
		}
		else{
			res.send({success:false,error:err});
		}
	});
}

function findOnBlacklist(client,domain,callback){
	
	client.query('SELECT * FROM blacklist WHERE domain=($1)',[domain],function(err, result){
		if(!err){
			if(result.rows.length <= 0){
				//empty
				console.log("not found on blacklist, domain is valid");
				callback(false);
			}
			else{
				callback(true);
			}
		}
		else{
			callback(null,err);
		}
	});
}
function findIfUnique(client,email,callback){
	client.query('SELECT * FROM buyers WHERE email=($1)',[email],function(err, result){
		if(!err){
			if(result.rows.length <= 0){
				//empty
				console.log("email has not been used before, is unique");
				callback(true);//is unique!
			}
			else{
				callback(false);
			}
			
		}
		else{
			callback(null,err);
		}
	});
}


function scrubEmailForDomain(email){
	var temp = email.split('@');
    var domain = temp[temp.length - 1];
    return domain;
}