const mongoose = require("mongoose");
const DB = process.env.SERVER_DB  //"auth-app";
const URI = process.env.SERVER_URI //"mongodb://localhost:27017/";

const createConnection = async () => {
    try {
        mongoose.connect(URI, { dbName: DB }).then(() => {
            console.log("[+] Database Connected Successfully\n");
        });
    } catch (error) {
        console.error(
            "\n[!] Error While Connecting Database : ",
            error.message
        );
    }
};

module.exports= createConnection