module.exports = {
    fMsg : (res,msg="",result)=>{
        res.status(200).send({con:true,msg,result})
    }
}