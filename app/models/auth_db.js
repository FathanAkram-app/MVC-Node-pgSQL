const res = require('express/lib/response')
const { client } = require('../helpers/helper')
const bcrypt = require('bcrypt');

module.exports = {
    loginDB: async (username,password,token)=>{
        const conn = client()
        // Connect ke database
        await conn.connect()
        // Query get user by username
        const user = await conn.query("SELECT * FROM users WHERE username = '"+username+"'")
        
        if (user.rowCount>0) {
            const userData = user.rows[0]
            // Blowfish Encryption membandingkan password
            bcrypt.compare(password, userData.password, async function(err, result) {
                if (result){
                    // Query update
                    await conn.query("UPDATE users SET token = '"+token+"' WHERE username = '"+username+"'")
                    // Query get by token
                    const res = await conn.query("SELECT * FROM users WHERE token = '"+token+"'")
                    await conn.end()
                    return res
                    
                }
                else{
                    // Memutuskan koneksi dari databse
                    await conn.end()
                    return "password is wrong"
                }
            })
            
            
        }else{
            // Memutuskan koneksi dari databse
            await conn.end()
            return "username is wrong"
        }
        
    },

    registerDB: async (data) =>{
        const conn = client()
        // Connect ke database
        await conn.connect()
        // mencoba query jika ada error seperti "Username Already Exist." akan langsung me-return dan memutuskan koneksi database
        try {
            await conn.query("INSERT INTO users (username, password, email, nama) VALUES ('"+data.username+"', '"+data.password+"', '"+data.email+"', '"+data.nama+"');")
        } catch (error) {
            await conn.end()
            return error
        }
        // jika berhasil akan me-return null
        await conn.end()
        return null
    },
    logoutDB: async (token) => {
        const conn = client()
        await conn.connect()
        // query update token
        const res = await conn.query("UPDATE users SET token = NULL WHERE token = '"+token+"';")
        await conn.end()
        return res
    }
}