const UserModel = require('../models/User.model')
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