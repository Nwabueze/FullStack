const mongoose = require("mongoose");

const con = {};
const LOCAL = process.env.LOCAL_MONGODB_URI;
const LIVE = process.env.MONGO_CONN_STR;
con.start = async (hostname) => {
    if(con.isConnected){
        console.log("connection already exists");
        return;
    }

    const host = hostname === "localhost" ? LOCAL : LIVE;
    const cn = await mongoose.connect(host, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    console.log("Con state is now " + cn.connections[0]._readyState)
    con.connection = cn;
    con.isConnected = true;
    return cn;
}

con.stop = async () => {
    await mongoose.disconnect();
    con.isConnected = false;
}


module.exports = con;


