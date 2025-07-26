const bcrypt = require("bcryptjs");

const createHash = async password => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hashed = await bcrypt.hashSync(password, salt);
        return hashed;
    } catch (error) {
        console.log("\n[!] Error While Hashing Password - ", error.message);
        return null;
    }
};

const compareHashed = async (password, hashed) => {
    try {
        return await bcrypt.compareSync(password, hashed);
    } catch (error) {
        console.log("\n[!] Error Ehile Comparing Hashed -- ", error.message);
        return false;
    }
};


module.exports = {createHash,compareHashed}