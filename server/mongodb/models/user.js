import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    uname: String,
    pword1: String,
    profilepic: String
});

const userModel = mongoose.model('User', UserSchema);

export default userModel;