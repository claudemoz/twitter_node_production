const UserModel = require('../models/User.model')
const {findUserPerUsername, searchUsersPerUsername,addUserIdToCurrentUserFollowing,removeUserIdToCurrentUserFollowing, findUserPerId} = require('../queries/users.queries')
const {getUserTweetsFromAuthorid} = require('../queries/tweets.queries')
const path = require('path')
const multer = require('multer');
const upload = multer({storage: multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, path.join(__dirname, '../public/images/avatars'))
  },
  filename: (req, file, cb)=>{
    cb(null, `$${Date.now()}-${file.originalname}`)
  }
})})

exports.userList = async  (req, res, next)=>{
  try {
    const search = req.query.search;
    const users = await searchUsersPerUsername(search)
    // res.json(users)
    res.render('includes/search-menu.pug', {users})
  } catch (e) {
    next(e)
  }
},

exports.userProfile = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await findUserPerUsername(username);
    if(user){
      const tweets = await getUserTweetsFromAuthorid(user._id);
      if(tweets) res.render('tweets/tweet', {
        tweets, 
        isAuthenticated: req.isAuthenticated(), 
        currentUser: req.user,
        user, 
        editable: false
      });
    }
  } catch (err) {
    next(err)
  }
}

exports.signupForm = (req, res, next) => {
  res.render('users/user-form.pug', { errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
}

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await UserModel.hashPassword(password)
    const user = await UserModel.create({ username: username, local: { email: email, password: hashPassword } })
    if (user) {
      res.redirect('/');
    }
  } catch (e) {
    res.render('users/user-form', { errors: e , isAuthenticated: req.isAuthenticated(), currentUser: req.user});
  }
}

exports.uploadeImage = [
  upload.single('avatar'),
  async (req, res, next) => {
  try {
    const user = req.user;
     user.avatar = `/images/avatars/${req.file.filename}`;
     await user.save();
     res.redirect('/')
  } catch (e) {
    next(e)
  }
}
]


exports.followUser = async (req, res, next)=>{
 try {
  const userId = req.params.userId;
  const [, user] = await Promise.all([addUserIdToCurrentUserFollowing(req.user, userId), findUserPerId(userId)])
  res.redirect(`/users/${user.username}`)
 } catch (e) {
  next(e)
 }
}

exports.unFollowUser = async (req, res, next)=>{
  try {
    const userId = req.params.userId;
    const [, user] = await Promise.all([removeUserIdToCurrentUserFollowing(req.user, userId), findUserPerId(userId)])
    res.redirect(`/users/${user.username}`)
   } catch (e) {
    next(e)
   }
}