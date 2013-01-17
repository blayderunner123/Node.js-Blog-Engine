var db = require('../db')
exports.index = function(req, res){
	if (req.user) {
		console.log('User is logged in as '+req.user.displayName);
	}
	db.posts.findAll({order: 'createdAt DESC'}).success(function(posts) {
		res.render('index', {posts: posts, user: req.user});
	});
};

exports.post = function(req, res) {
	db.posts.find({where: {title:req.params.title}}).success(function(post) {
		res.render('post', {post: post, user: req.user});
	});
};

exports.newPost = function(req, res) {
	res.render('editPost', {user: req.user, post:{
		content: '',
		title: ''
	}});
};

exports.editPost = function(req, res) {
	db.posts.find({where: {title:req.params.title}}).success(function(post) {
		switch(req.params.mode) {
			case "edit":
				res.render('editPost', {post: post, user: req.user});
			break;
			case "confirm-deletion":
				res.render('confirmDeletePost', {post:post, user: req.user});
			break;
			case "delete":
				post.destroy().success(function() {
					res.redirect('/');
				});
			break;
		}
	});
};

