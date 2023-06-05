import mongoose from 'mongoose';
import dotEnv from 'dotenv'
dotEnv.config()

const db = mongoose.createConnection(process.env.MONGODB_URL);
    
db.on('error',(error) => console.log(error))

db.once('open',() => console.log('Database connected'))

export default db
 
