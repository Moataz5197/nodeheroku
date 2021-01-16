const http = require("http");

// destruction create read stream 

const { createReadStream } = require("fs");


const { decode } = require("querystring");


const sendFile =  (res,status,type,filePath)=>{

    res.writeHead(status, {"Content-Type": type});

    createReadStream(filePath).pipe(res);

}

http.createServer((req,res)=>{


    if(req.method === "POST"){


        let body = "";    // why is the req obj is a stream ? cause you may collect so many data life file uploads etc

        req.on("data",data=>{


            body+=data;
        });
        req.on("end",()=>{
            

            const { name , email , msg } = decode(body);  // ensure your destruct a valid name
            console.log("ended", name,email,msg);
        
        
        });
    }

    console.log("hi",req.url);
    switch (req.url){
        case "/":
            return sendFile(res,200,"text/html","./index.html");
        case "/contact":
            return sendFile(res,200,"text/html","./contact.html");
        case "/img/130241592_858272598255577_6374856912854499874_o.jpg":
            return sendFile(res,200,"image/jpg","./img/130241592_858272598255577_6374856912854499874_o.jpg");
        case"/styles.css":
            return sendFile(res,200,"text/css","./styles.css");
        default:
            return sendFile(res,404,"text/html","./404.html");

    }







}).listen(3000);

console.log("Server is listening");