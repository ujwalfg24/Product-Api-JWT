

const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt =require('jsonwebtoken');  

  








const postLogin = async (req, res, next) => { try {
    const { email, password } = req.body;

    const validUser = await User.find({ email: email });

    const matched = await bcrypt.compare(password, validUser[0].password);
    if (matched) {
        let token = jwt.sign({email:req.body.email}, 'secretkey');
        res.send({message:"sucess",data:{token}});
      
    } else {
        res.json({ message: "Password not matched" });
    }
    
 
}
catch (err){
    console.log(err);
    res.status(500).json({message : "something went wrong"})
};
}




const postRegister = async (req, res, next) => {
    const { fname,lname,email, password, password2 } = req.body;
    if (
        fname.length < 1 ||
        lname.length < 1 ||
         email.length < 1 ||
         password.length < 1 ||
        password != password2
    ) {
        return res.status(400).json( {
            message: "Invalid Name or Password did not match",
        });}
    const alreadyUser = await Users.find({ email: email });
    if (alreadyUser.length > 0) {
        return res.status(400).json({ message: "Already registered user, login" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User ({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashPass,
       
    });
    newUser
        .save()
        .then(() => {
           return res.status(400).json({ message: "Registered successfully, login" });
        })
        .catch((err) => console.log(err));
};


function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') { 

      const bearer = bearerHeader.split(' ');

      const bearerToken = bearer[1];
      req.token = bearerToken;  

      next();

    } else {
      res.sendStatus(403);
    }
  
  }





module.exports = {
  
   
    postLogin,
    postRegister,
    verifyToken
};