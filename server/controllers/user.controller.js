import User from '../mongodb/models/user.js';
import mongoose from 'mongoose';

const addUser = async (req, res) => {
    try {
        const { fname, lname, uname, pword1, profilepic } = req.body;
        const newUser = await User.create({
            fname,
            lname,
            uname,
            pword1,
            profilepic
        })
        res.status(200).json(newUser);
    } catch(error) {
        res.status(500).json({ message : error.message});
    }
};
const getUser = async (req, res) => {
    try {
        let users = await User.find({}, { "pword1" : 0 });
        if (!users) return res.status(400).send("Something's wrong!");
        else return res.status(200).send(users);
    }   catch(error) {
        res.status(500).json({ message : error.message});
    }
};
const getUserValidation = async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ uname: username  });
        if (!user) return res.status(400).send("User not found");
        console.log(password);
        console.log(user.pword1);
        const validPassword = (password === user.pword1);
        if (!validPassword) return res.status(400).send(false);
        else {
            const session = await mongoose.startSession();
            session.startTransaction();

            return res.status(200).send(true);
        } 

    } catch(error) {
        res.status(500).json({ message : error.message});
    }
};

export {
    addUser,
    getUser,
    getUserValidation
}