import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    username: String,
    contact: String
});

const contactModel = mongoose.model('Contact', ContactSchema);

export default contactModel;