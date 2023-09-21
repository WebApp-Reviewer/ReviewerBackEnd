const db = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

async function getAllAdmin() {
    try {
        const {rows} = await db.query(`
        SELECT * FROM admin;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

const getAdmin = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const admin = await getAdminByEmail(email);
        if(!admin) return;
        const hashedPassword = admin.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete admin.password;
        return admin;
    } catch (err) {
        throw err;
    }
}

const getAdminByEmail = async(email) => {
    try {
        const { rows: [ admin ] } = await db.query(`
        SELECT * 
        FROM admin
        WHERE email=$1;`, [ email ]);

        if(!admin) {
            throw {
                name: "AdminNotFoundError",
                message: "An Admin with that email does not exist."
            }
        }
        return admin;
    } catch (err) {
        throw err;
    }
}


module.exports = {
    createAdmin,
    getAdmin,
    getAdminByEmail,
    getAllAdmin
};