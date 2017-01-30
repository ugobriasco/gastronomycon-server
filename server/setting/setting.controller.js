var Setting = require('./setting.model');

exports.postSetting = function(req, res){
	let setting = new Setting();
	setting.name = req.body.name;
	setting.value = req.body.value;

	setting.save(function(err){
		if(err) throw err;
		res.json({message: 'new setting', data: setting});
	});
}

exports.putSetting = function(req, res){
	Setting.findOne({'name': req.params.name}, function(err, setting){
		if(err) throw err;
		setting.value = req.body.value;

		setting.save(function(err){
			if(err) throw err;
			res.json({message: 'setting updated', data: setting});
		});

	});
}

exports.getAllSettings = function(req, res){
	Setting.find(function(err, settings){
		if(err) throw err;
		res.json({data: settings});

	});
}


exports.getSetting = function(req, res){
	Setting.findOne({'name': req.params.name}, function(err, setting){
		if(err) throw err;
		res.json({data: setting});
	});
}



exports.deleteSetting = function(req, res) {

    Setting.findByIdAndRemove(req.params.objID, function(err, user){
        if(err) res.send(err);
        res.json("setting: " +req.params.objID +' removed');
    });
}

