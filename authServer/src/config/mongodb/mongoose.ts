import mongoose from 'mongoose';
import dotEnv from 'dotenv'
dotEnv.config()

const options:any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:"dochub-auth"
  };

const db = mongoose.createConnection(process.env.MONGODB_URL,options);
    
db.on('error',(error) => console.log(error))

db.once('open',() => console.log('Database connected'))

export default db
 
