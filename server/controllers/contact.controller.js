import Contact from '../mongodb/models/contact.js';

const addContacts = async (req, res) => {
    try {
        const { username, contact } = req.body;
        const newContact = await Contact.create({
            username,
            contact
        })
        res.status(200).json(newContact);
    } catch(error) {
        res.status(500).json({ message : error.message});
    }
};
const getContacts = async (req, res) => {
    try {
        const username = req.params.username;
        let contacts = await Contact.find({ username }, { "username" : 0});
        if (!contacts) return res.status(400).send("Something's wrong!");
        else return res.status(200).send(contacts);
    } catch(error) {
        res.status(500).json({ message : error.message});
    }
};
export {
    addContacts,
    getContacts
}