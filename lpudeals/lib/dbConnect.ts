import mongoose from "mongoose";
type ConnectionObject ={
    isConnected?: number 
}
const connection : ConnectionObject = {}
async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already ")
        return
    }
    try{
        const db = await mongoose.connect(process.env.DB_URI || '',{})
        connection.isConnected = db.connections[0].readyState
        console.log('DB Connected Succes ')
    }catch(error){
        console.log('db Connecttion faild ' , error)
        process.exit(1)
    }

}
export default dbConnect;