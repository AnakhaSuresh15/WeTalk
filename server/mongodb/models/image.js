import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    username: String,
    url: String
});

const imageModel = mongoose.model('Image', ImageSchema);

export default imageModel;