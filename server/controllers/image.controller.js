import User from '../mongodb/models/user.js';

const setImageId = async (req, res) => {
    try {
        const url = req.body.url;
        const username = req.params.username;
        let update = await User.updateOne(
            { "uname": username }, 
            {"$set": {"profilepic": url}},
            {"upsert": true}
        );
        return res.send(update);
    } catch (error) {
        res.status(500).json({ message : error.message});
    }
    
    
};

export {
    setImageId
}