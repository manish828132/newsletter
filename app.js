const express=require("express");
const bodyParser=require('body-parser');
const request=require('request');
const https=require('https');
const app=express();

app.use(bodyParser.urlencoded({extends:true}))
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    var email=req.body.email;

    var data=
    {
        members:
        [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:
                {
                FNAME:firstname,
                LNAME:lastname
                }
            }
        ]
    };
    var jsonData=JSON.stringify(data);
    const url="https:/us8.api.mailchimp.com/3.0/lists/aa58e613d0"

    const options={
        method:"POST",
        auth:"manish:2c6ffbab6108c13ecf06615c69cd8cdf-us8"


    }

    const request=https.request(url,options,function(response){
       


       var error;

        response.on("data",function(data){
            console.log(JSON.parse(data));
            error=Number(JSON.parse(data).error_count);
        })
//console.log(typeof (error))

        if(error==1)
        {
            res.send("data already exist");

        }

        else if((response.statusCode)===200)
        {
           res.sendFile(__dirname+"/success.html");
        }
       
        else
        {
            res.sendFile(__dirname+"/failure.html");
        }

    })


   request.write(jsonData) ;
   request.end();


});


app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 5000,function()
{
    console.log("your server is started at 5000");
});


//API KEY 931906d4ff39c5b1381983f0f0ce5039-us8

// Some plugins and integrations may request your Audience ID.

// Typically, this is what they want: aa58e613d0.
