const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const request=require("request");
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  var fname=req.body.fname;
    var lname=req.body.lname;
      var email=req.body.email;

      console.log(fname+" "+lname+" "+email);
      var data={
        members:[
          {
            email_address: email,
            status:"subscribed"
          }
        ]
      };

        var jsondata=JSON.stringify(data);

      var option={
      url: "https://us20.api.mailchimp.com/3.0/lists/0461a05c16",
      method: "POST",
      headers:{
        "Authorization":"Sai d34e579dc1bcac0ed51adb56571d04d6-us20",
      body: jsondata
      }

      };
      request(option,function(error,response,body){
      if(error){
        res.sendFile(__dirname+"/failure.html");
        console.log(error);
      }else{
    if(response.statuscode===200)
    res.sendFile(__dirname+"/success.html");
    else{console.log(response.statuscode);
        res.sendFile(__dirname+"/failure.html")
    }
      }
      });
});

app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT||3000,function(req,res){
  console.log("server started!");
});
//d34e579dc1bcac0ed51adb56571d04d6-us20
//5a4c73b342
//'https://usX.api.mailchimp.com/3.0/lists'
//https://us20.admin.mailchimp.com/lists/members/add?id=55417
//0461a05c16
