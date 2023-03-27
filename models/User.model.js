const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    local: {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    avatar: {type: String, default:"/images/default-profile.png"}
});

userSchema.statics.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password, salt)
    } catch (e) {
        throw e
    }
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.local.password)
}

const User = mongoose.model('user', userSchema);

module.exports = User;