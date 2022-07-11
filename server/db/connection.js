const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("----- MongoDb Connection Successful. ------ ")
    })
    .catch((error) => {console.error("MongoDb connection error: " , error)})
}

module.exports = connectDatabase;