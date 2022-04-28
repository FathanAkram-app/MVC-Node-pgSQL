module.exports = {
    successWithMessageResponse: (msg) => {
        return {
            status: "success", 
            status_code: 200,
            message: msg
        }
    },
    successWithResultResponse: (result)=>{
        return {
            status: "success", 
            status_code: 200,
            result: result
        }
    },
    successWithMessageAndResultResponse: (msg,result)=>{
        return {
            status: "success", 
            status_code: 200,
            result: result,
            message: msg
        }
    },
    
    failedWithMessageResponse: (errorCode, msg)=>{
        return {
            status: "failed", 
            status_code: errorCode,
            message: msg
        }
    },
    
    clientAuthFailedResponse: {
        status: "failed", 
        message: "Unauthorized Client", 
        status_code: 401
    }

}