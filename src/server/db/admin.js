const db = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createAdmin = async({ name='first last', email, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [admin ] } = await db.query(`
        INSERT INTO admin(name, email, password)
        VALUES($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword]);

        return admin;
    } catch (err) {
        throw err;
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
            return;
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
};