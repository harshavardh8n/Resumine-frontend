import React, { useState } from "react";
import "./analyse.css";
import axios from "axios";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { Button, Spinner, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const Compare = () => {
  const [fileselected, setselect] = useState(false);
  const [loading, setloading] = useState(false);
  const [uploaded1, setupload1] = useState(false);
  const [uploaded2, setupload2] = useState(false);
  const [loader, setloader] = useState(false);
  const toast = useToast();
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [img1,setImage1] = useState(null)
  const [img2,setImage2] = useState(null)
  const [response, setresponse] = useState(null);

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

  const clear = () => {
    document.getElementById("displayer").innerHTML = "";
    setloading(false);
  };

  const upload1 = async () => {
    const data = new FormData();
    data.append("file", file1);
    data.append("upload_preset", "resume_upload");
    data.append("cloud_name", "duu6k0oso");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/duu6k0oso/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      if (res.ok) {
        const jsonResponse = await res.json();
        // console.log(jsonResponse);
        // Now you can access the uploaded image URL
        const imageUrl = jsonResponse.secure_url;
        setImage1(imageUrl);
        console.log("Uploaded image URL:", imageUrl);

        toast({
          title: "Image Uploaded.",
          description: "Your image has been successfully uploaded.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setupload1(true);
        // You can now do something with the image URL, e.g., display it or send it to your backend
      } else {
        console.error("Error occurred during image upload:", res.statusText);
      }
    } catch (error) {
      console.error("Error occurred while uploading image:", error);
    }
  };
  const upload2 = async() => {
    const data = new FormData();
  data.append("file", file2);
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
      setImage2(imageUrl)
      console.log("Uploaded image URL:", imageUrl);

      toast({
        title: 'Image Uploaded.',
        description: "Your image has been successfully uploaded.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setupload2(true);
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
    setloader(true); // Start showing the spinner
    setloading(false); // Hide the displayer while loading
  
    try {
      const response1 = await axios.post("https://resumine-backend.vercel.app/api/compare", {
        img1: img1,
        img2: img2,
      });
  
      console.log(response1.data);
  
      // Update the displayer div with parsed content
      document.getElementById("displayer").innerHTML = marked.parse(response1.data);
  
      setloading(true); // Show the displayer div
      setloader(false); // Stop the spinner
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setloader(false); // Stop the spinner even on error
    }
  };
  
  const handleFileChange1 = (e) => {
    setFile1(e.target.files[0]);
    setselect(true);
  };


  const handleFileChange2 = (e) => {
    setFile2(e.target.files[0]);
    setselect(true);
  };


  return (
    <>
    <div className='flex bg-gradient-to-bl from-[#7acef7] to-[#06507e] lg:flex-row flex-col' >
      <div className='lg:w-[40%] h-screen ml-10'>
        <div className='mt-36 lg:ml-20'>
          <h1 className='text-[40px] font-bold text-white'>
          Compare 2 Resumes
          </h1>
          <p className='text-white'>
          (Upload only .jpg, .jpeg or .png)
          </p>
        </div>
        <div className="mt-4 lg:ml-20">
          <div>

          </div>
          <div className='flex flex-col w-[45%] gap-2'>
        <input type="file" onChange={handleFileChange1} id="fileup" className=''/>
         <Button onClick={upload1 } colorScheme='blue' id="uploadbtn">Upload</Button><br />
          </div>
          <div className='flex flex-col w-[45%] gap-2'>
        <input type="file" onChange={handleFileChange2} id="fileup" className=''/>
         <Button onClick={upload2 } colorScheme='blue' id="uploadbtn">Upload</Button><br />
          </div>
      </div>
      <div className='lg:ml-20 flex'>
  {uploaded1 && uploaded2 && (
    <>
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
    </>
  )}
  {loader && (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.400"
      size="xl"
      mt={4}
    />
  )}
</div>

              {loader && (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.400"
                  size="xl"
                  mt={4}
                />
              )}
      </div>
      <div className='lg:w-1/2 h-screen w-[90%]'style={{display: loading ? 'inline-block' : 'none' }}>
        <div className='m-5 w-full mt-24 h-[80%] rounded-lg border-white p-5 bg-white overflow-auto'id="displayer"> 
        {/* <div className='m-5 w-full mt-20 h-[80%] rounded-lg border-white p-5 bg-white overflow-auto'id="displayer" style={{display: ready ? 'inline-block' : 'none' }}>  */}

        </div>
     </div>
    </div>
    </>
  )
};

export default Compare;
