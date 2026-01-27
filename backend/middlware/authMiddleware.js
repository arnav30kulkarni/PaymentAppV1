const jwt=require("jsonwebtoken");
const secretKey=process.env.JWT_SECRET;


const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({
            msg:"Bad authorization header"
        })
    }

    const token=authHeader.split(" ")[1];
    try {
        const decoded=jwt.verify(token,secretKey);
        if(decoded.userId){
            req.userId=decoded.userId;
            next();
        } else{
            return res.status(403).json({
                msg:"Invalid token"
            })
        }
    } catch (error) {
        console.error("Error in auth middleware",error);
        return res.status(403).json({
            msg:"Invalid token"
        })
    }
}

module.exports={
    authMiddleware
};