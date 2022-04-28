
module.exports = {
    initSocketConnection : io =>{
        io.on("connection", socket => {
            
            socket.on("disconnect", ()=>{
                
            })
        })
    }
}