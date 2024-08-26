import React, { useState } from 'react'
import "./analyse.css" 
import axios from "axios"
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { Button,Spinner,Text } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'


const Creater = () => {

    const [info,setInfo] = useState({
        name:"",
        skills:"",
        projects:"",
        education:"",
        exp:"",
        email:"",
    })
    const [responseText, setResponseText] = useState("");
    const [dr,setdr] = useState(false);

    const handleInput=(e)=>{
        let name=e.target.name;
        let value = e.target.value;
  
        setInfo({
            ...info,
            [name]:value,
            
        })
        // console.log(info);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(info);
        try {
            const response = await fetch('https://resumine-backend.vercel.app/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });

            const text = await response.text();
            setdr(true);
            document.getElementById('resume').innerHTML = marked.parse(text);
            setResponseText(text);

            if (response.ok) {
                setInfo({ email: "", name: "", skills: "", projects: "", education: "", exp: "" });
                alert("Submission successful");
                // navigate("/home")
            } else if (response.status === 404) {
                alert("Submission failed");
            } else {
                alert("Error occurred");
            }

        } catch (error) {
            console.log("Error:", error);
        }

        console.log(responseText);
    }




  return (
    
    <div className='createcont'>
      <div className="Uploaderi" style={{display:dr?'none':'inline-block'}}>
        <form> 

        <Text fontSize="5xl" as="b">Create your Resume Blueprint</Text><br />
        {/* <Text fontSize="5xl" as="b">to get Shortlisted</Text><br /> */}
        <br />
        <div className="formcont">
            
        
        <div className='uploadingnew'>
        <label htmlFor="name">Name</label>
            <Input placeholder='Enter your name' className='info'id="name" onChange={handleInput} name="name"></Input>
            <label htmlFor="skills">Skills</label>
        <Textarea className="info" placeholder='Enter your Skills' id="skills" value={info.skills} onChange={handleInput} name="skills"></Textarea ><br />
            <label htmlFor="project">Projects</label>
        <Textarea className="info" placeholder='Enter your projects in brief' id="project" value={info.projects} onChange={handleInput} name="projects"></Textarea><br />
            
        
        {/* <input type="file" onChange={handleFileChange} id="fileup"/> */}

        <Button onClick={handleSubmit} colorScheme='blue' id="uploadbtn">Upload</Button><br />
        </div>
        <div className="uploadingnew2">
        <label htmlFor="email">Email id</label>
            <Input placeholder='Enter your email' className='info'id="email" value={info.email} onChange={handleInput} name="email"></Input>
        <label htmlFor="education">Education</label>
        <Textarea className="info" placeholder='Enter your education details' id="education" value={info.education} onChange={handleInput} name="education"></Textarea><br />
        <label htmlFor="exp">work experience and additional details</label>
        <Textarea className="info" placeholder='Enter your work details' id="exp" value={info.exp} onChange={handleInput} name="exp"></Textarea><br />
        </div>
        </div>
        <br />
      </form>
        </div>

        <div id="resume" style={{display:dr?'inline-block':'none'}}>

        </div>
        {/* <button onClick={improved}>Improve</button> */}
        {/* <input type="text" name="ask" id="ask" value={ask.question} onChange={handleChange}/> */}
        {/* <button onClick={handleSubmit}>ask</button> */}
    </div>
  )
}

export default Creater