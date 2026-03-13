
import nodemailer from 'nodemailer'

export const submitBlog = async(req,res)=>{

try{

const {title,category,tags,content,readingTime} = req.body;
const image = req.file?.filename;

const transporter = nodemailer.createTransport({

service:"gmail",

auth:{
 user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
}

});

await transporter.sendMail({

from:"Blog Platform",
to:"homedecorimlaiba@gmail.com",
subject:"New Blog Submission",

html:`

<h2>New Blog Submitted</h2>

<p><b>Title:</b> ${title}</p>
<p><b>Category:</b> ${category}</p>
<p><b>Tags:</b> ${tags}</p>
<p><b>Reading Time:</b> ${readingTime} min</p>

<p><b>Content:</b></p>
<p>${content}</p>

`

});

res.json({message:"Blog submitted successfully"});

}catch(err){

console.log(err);
res.status(500).json({error:"Server error"});

}

};