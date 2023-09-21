import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config()

export default function refreshToken (req, res) {
    const refToken = sessionStorage.getItem('refresh')
    if(refToken){
        jwt.verify(refToken, process.env.REFRESH, (err, decoded) =>{
            console.log(decoded.user)
            if(err){
                return res.status(401).send("You are unauthorized")
            } else {
                const accToken = jwt.sign(decoded.user, process.env.MY_SECRET, { expiresIn: 60 })
                return res.send(accToken)
            }
        })
    } else {
        return res.status(401).send("You are unauthorized")
    }
}