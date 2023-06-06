const UserModel = require('../models/User.model')

exports.findUserPerId = (id)=>{
    return UserModel.findById(id).exec();
}

exports.findUserPerUsername = (username)=>{
    return UserModel.findOne({ username }).exec();
}

exports.searchUsersPerUsername = (search)=>{
    const regExp = `^${search}`;
    const reg = new RegExp(regExp);
    return UserModel.find({ username: { $regex: reg } }).exec();
}

exports.addUserIdToCurrentUserFollowing = (currentUser, userId)=>{
    currentUser.following = [...currentUser.following, userId];
    return currentUser.save();
}

exports.removeUserIdToCurrentUserFollowing = (currentUser, userId)=>{
    currentUser.following = currentUser.following.filter(objId => objId.toString() !== userId);
    return currentUser.save();
}