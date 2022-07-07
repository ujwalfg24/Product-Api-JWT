const Customer =require('../model/customer')
const bcrypt =require("bcrypt")
const Product =require('../model/product')

const postLogin = async (req, res, next) => { try {
    const { email, password } = req.body;

    const validCustomer = await Customer.find({ email: email });

    const matched = await bcrypt.compare(password, validCustomer[0].password);
    if (matched) {
        return res.status(400).json({ message: "logged in successfully" });
      
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
    const { fname,lname,email, password} = req.body;
    if (
        fname.length < 1 ||
        lname.length < 1 ||
         email.length < 1 ||
         password.length < 1 
    ) {
        return res.status(400).json( {
            message: "Invalid Name or Password did not match",
        });}
    const alreadyCustomer = await Customer.find({ email: email });
    if (alreadyCustomer.length > 0) {
        return res.status(400).json({ message: "Already registered user, login" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newCustomer = new Customer ({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashPass,
       
    });
    newCustomer
        .save()
        .then(() => {
           return res.status(400).json({ message: "Registered successfully, login" });
        })
        .catch((err) => console.log(err));
};


const getProducts = async (req, res, next) => {

  try {
    let productlist = await Product.find()
   console.log(productlist)
   res.json(productlist)
   } catch (err) {
     console.log(err.message)
  }
        
  } ;




module.exports = {
  
   getProducts,
    postLogin,
    postRegister,
   
};