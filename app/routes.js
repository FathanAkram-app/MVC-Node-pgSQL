
const { loginController, registerController, logoutController } = require("./controllers/auth_controller")

module.exports = {
    initRoutes: (app)=>{
        app.get('/', (req, res) => {
            res.sendFile(__dirname+'/views/index.html')
        })
        // Auth
        app.post('/api/login', loginController)
        app.post('/api/register', registerController)
        app.post('/api/logout', logoutController)


        
    }
}
