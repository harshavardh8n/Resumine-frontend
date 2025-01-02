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
      document.getElementById('displayer').innerHTML = "";
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
      // console.log("Uploaded image URL:", imageUrl);

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
        // alert("Inside func");
        console.log({img:img})
        const response1 = await axios.post('https://resumine-backend.vercel.app/api/analyse', {
          img: img // Ensure the image URL is sent correctly
        });
  
        console.log(response1.data);
  
        // Assuming response1.data is Markdown content
        setready(true);
        setloading(false);

        document.getElementById('displayer').innerHTML = marked.parse(response1.data);
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

  return (
    <>
    <div className='flex bg-gradient-to-bl from-[#7acef7] to-[#06507e] lg:flex-row flex-col' >
      <div className='lg:w-[40%] h-screen ml-10'>
        <div className='mt-36 lg:ml-20'>
          <h1 className='text-[40px] font-bold text-white'>
          Analyze your resume
          </h1>
          <h1 className='text-[40px] font-bold text-white'>
          to get Shortlisted
          </h1>
          <p className='text-white'>
          (Upload only .jpg, .jpeg or .png)
          </p>
        </div>
        <div className="mt-4 lg:ml-20">
          <div>

          </div>
          <div className='flex flex-col w-[45%] gap-2'>
        <input type="file" onChange={handleFileChange} id="fileup" className=''/>
         <Button onClick={submitImage } colorScheme='blue' id="uploadbtn">Upload</Button><br />
          </div>
      </div>
        <div className='lg:ml-20'>
            <Button
              onClick={resp}
              className="mr-2 bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2"
              >
              Analyse
            </Button>
            <Button
              onClick={clear}
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2"
            >
              Clear
            </Button>
              </div>
              <Spinner style={{display: loading ? 'inline-block' : 'none' }}
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.400'
              size='xl'
            />
      </div>
      <div className='lg:w-1/2 h-screen w-[90%]'style={{display: ready ? 'inline-block' : 'none' }}>
        <div className='m-5 w-full mt-24 h-[80%] rounded-lg border-white p-5 bg-white overflow-auto'id="displayer"> 
        {/* <div className='m-5 w-full mt-20 h-[80%] rounded-lg border-white p-5 bg-white overflow-auto'id="displayer" style={{display: ready ? 'inline-block' : 'none' }}>  */}

        </div>
     </div>
    </div>
    </>
  )
}

export default AnalyseUpload