const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const { send } = require("process");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})




app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
       members: [
            {
                email_address: email,
                status: "subscribed",
                merge_field: {
                    FNAME: firstName,
                    LNAME: lastName,

                }
            }
        ]
    };

    const jasonData = JSON.stringify(data);

    const url = "https://us3.api.mailchimp.com/3.0/lists/8636529fef";

    const option = {
        method: "POST",
        auth: "princelee:14bb1690c04c7f42bdca591863f10ba0-us3",
    }

    const request = https.request(url, option, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jasonData);
    request.end();

   

})

app.post("/failure.html", function(req, res){
    res.redirect("/");
})

// 20f9de8614ebb1fcd75379925001e188-us13

// 8636529fe 8636529fef






app.listen(process.env.PORT || 3000 , function(){
    console.log("server is running on port 3000")
})