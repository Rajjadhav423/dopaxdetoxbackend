const generateMessage = (res, statusCode, message,data = null,token=null) => {
    const response = {
        statusCode: statusCode,
        message: message,
    };
    if (data) {
        response.data = data;
    }
    if(token){
        response.token=token
    }
    return res.status(statusCode).json(response);
};

module.exports = generateMessage;