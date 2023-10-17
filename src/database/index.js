import mongoose from 'mongoose';


const connectToDB = async () => {
    try {
       await mongoose.connect('mongodb+srv://alton:12345@cluster0.b5a5yl4.mongodb.net/?retryWrites=true&w=majority');

       console.log('MONGODB IS CONNECTED')
    } catch (e) {
        console.log(e);
    }
};

export default connectToDB;