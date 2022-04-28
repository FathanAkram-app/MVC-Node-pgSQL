const { clientAuthentication, auth, checkRequirements } = require('../helpers/helper');
const bcrypt = require('bcrypt');
const { registerDB, logoutDB, updateTokenDB, findUserByUsernameDB, loginDB } = require('../models/auth_db');
const { loginFailedResponse } = require('../views/json_responses/auth_response');
const { successWithMessageAndResultResponse, clientAuthFailedResponse, successWithMessageResponse, failedWithMessageResponse } = require('../views/json_responses/response');
module.exports = {
    loginController : (req, res) =>{
        // Membuat token dengan library crypto
        require('crypto').randomBytes(48, function(err, buffer) {
            const token = buffer.toString('hex');
            
            if(clientAuthentication(req)){
                loginDB(req.body.username,req.body.password,token).then(data =>{
                    if (typeof data == "string") {
                        res.send(failedWithMessageResponse(400,data))
                    }else{
                        res.send(successWithMessageAndResultResponse("successfully logged-in", data))
                    }
                })
            }else{
                res.send(clientAuthFailedResponse)
            }
        });
    },
    registerController : (req, res) => {
        
        if(clientAuthentication(req)){
            bcrypt.genSalt(10, function(err, salt) {
                const data = req.body
                bcrypt.hash(data.password, salt, function(err, hash) {
                    if (!err) {
                        if (checkRequirements(data)[0]) {

                            registerDB({...data, password: hash}).then((result)=>{
                                if (result == null) {
                                    res.send(successWithMessageResponse("successfully registered an account"))
                                }else{
                                    if (result.detail && result.detail.search("already exists.")){
                                        res.send(failedWithMessageResponse(400,"username is not available"))
                                    }else{
                                        res.send(failedWithMessageResponse(400,result))
                                    }
                                }
                                
                            })
                        }else{
                            res.send(failedWithMessageResponse(400,checkRequirements(data)[1]))
                        }
                    }else{
                        res.send(failedWithMessageResponse(400,err))
                    }
                    
                    
                });
            });
        }else{
            res.send(clientAuthFailedResponse)
        }
    },
    logoutController : (req, res) => {
        if(clientAuthentication(req)){
            logoutDB(req.body.token).then((data)=>{
                if (data.rowCount > 0){
                    res.send(successWithMessageResponse("successfully logged-out"))
                }else{
                    res.send(failedWithMessageResponse(400, "session not found or user has already logged out"))
                }
                
            })
        }else{
            res.send(clientAuthFailedResponse)
        }
    }
}

