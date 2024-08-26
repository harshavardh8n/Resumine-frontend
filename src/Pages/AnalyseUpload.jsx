import React, { useState } from 'react'
import "./analyse.css" 
import axios from "axios"
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { Button,Spinner,Text } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'


const AnalyseUpload = () => {

    const [fileselected,setselect] = useState(false);
    const [loading,setloading] = useState(false);
    const [uploaded,setupload] = useState(false);
    const [loader,setloader] = useState(false);
    const toast = useToast()
    const [file,setFile] = useState(null)
    const [img,setImage] = useState(null);
    const [ready,setready] = useState(false); 
    // const { isOpen, onToggle } = useDisclosure()
    if(!file){

    }
    const [response,setresponse] = useState(null);

    // const [ask, setAsk] = useState("");

    // const handleChange = (e) => {
    //     setAsk(e.target.value);
    //     console.log(ask);
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.get('http://localhost:5000/askresume', {
    //             body: JSON.stringify({ prompt: ask }),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error('Error sending data:', error);
    //     }
    // };

    const clear = ()=>{
      document.getElementById('display').innerHTML = "";
      setloading(false);

    }

   const submitImage = async () => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "resume_upload");
  data.append("cloud_name", "duu6k0oso");

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/duu6k0oso/image/upload", {
      method: "post",
      body: data
    });

    if (res.ok) {
      const jsonResponse = await res.json();
      // console.log(jsonResponse);
      // Now you can access the uploaded image URL
      const imageUrl = jsonResponse.secure_url;
      setImage(imageUrl)
      console.log("Uploaded image URL:", imageUrl);

      toast({
        title: 'Image Uploaded.',
        description: "Your image has been successfully uploaded.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setupload(true);
      // You can now do something with the image URL, e.g., display it or send it to your backend
    } else {
      console.error('Error occurred during image upload:', res.statusText);
    }
  } catch (error) {
    console.error("Error occurred while uploading image:", error);
  }
};

  
    const resp = async (e) => {
      e.preventDefault();
      setloading(true);
  
      try {
        setloading(true);
        alert("Inside func");
        console.log({img:img})
        const response1 = await axios.post('https://resumine-backend.vercel.app/api/analyse', {
          img: img // Ensure the image URL is sent correctly
        });
  
        console.log(response1.data);
  
        // Assuming response1.data is Markdown content
        setready(true);
        setloading(false);

        document.getElementById('display').innerHTML = marked.parse(response1.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setloading(false); // Ensure loading state is updated regardless of success or error
      }
    };
  


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setselect(true);
  };

  //   const improved = async (e) => {
  //     e.preventDefault();
  //     try {
        
  //         const response1 = await axios.get('http://localhost:5000/improved');
  //         console.log(response1.data);
  //         // setresponse(marked.parse(response1.data))
  //         document.getElementById('display').innerHTML = marked.parse(response1.data);
          
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //     }
      
  // };

  return (
    
    <div className='mainanalysecont'>
      <div className="Uploader">
        <Text fontSize="5xl" as="b">Analyze your resume</Text><br />
        <Text fontSize="5xl" as="b">to get Shortlisted</Text><br />
        <br />
        <div className='uploading'>

        
        <input type="file" onChange={handleFileChange} id="fileup"/>
        <Button onClick={submitImage } colorScheme='blue' id="uploadbtn">Upload</Button><br />
        </div>
        <br />
        <div className="lastrow">

        
        <Button onClick={resp} colorScheme='cyan' id="analysebtn" style={{ display: uploaded ? 'inline-block' : 'none' }}>Analyse</Button>
        <Button onClick={clear} colorScheme='teal' id="analysebtn" style={{ display: uploaded ? 'inline-block' : 'none' }}>clear</Button>
        {/* <Spinner></Spinner> */}
        <Spinner style={{display: loading ? 'inline-block' : 'none' }}
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.400'
        size='xl'
      />
      </div>
        </div>
        {/* <button onClick={improved}>Improve</button> */}
        {/* <input type="text" name="ask" id="ask" value={ask.question} onChange={handleChange}/> */}
        {/* <button onClick={handleSubmit}>ask</button> */}
        <div id="display" style={{display: ready ? 'inline-block' : 'none' }}>
          {/* {response} */}
        </div>
    </div>
  )
}

export default AnalyseUpload