const express=require("express");
const cors=require("cors");
const nodemailer=require("nodemailer");
const bodyparser=require("body-parser");
const emailExistence=require("email-existence")



const app=express();
app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));



app.post("/api/send",(req,res)=>{
emailExistence.check(req.body.user,(err,data)=>{


if(data===false){
  res.send({"err":"**sender email doesn't exists"})
}
else{
  

  
var transporter = nodemailer.createTransport({
  service: req.body.service,
  auth: {
    user: req.body.user,
    pass: req.body.pass
  }
});

var mailOptions = {
  from: req.body.user,
  to: req.body.to,
  subject: req.body.subject,
  html: req.body.html
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    res.send({"err":"**not send"})
  } else {
    res.send("mail sent successfully!!")
  }
});


  
  
  
  
}



})
})


app.listen(2000,(err)=>{
  if(err){
    return err
    
  }
  else{
    console.log("running😃")
    
  }
  
  
})


