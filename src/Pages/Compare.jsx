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
    document.getElementById("display").innerHTML = "";
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
    setloader(true);
    try {
      // setloading(true);
      // document.getElementById('display').innerHTML = 'Loading...';
      const response1 = await axios.post("https://resumine-backend.vercel.app/api/compare",{
        img1:img1,
        img2:img2
      });
      console.log(response1.data);
      // setresponse(marked.parse(response1.data))
      setloading(true);
      document.getElementById("display").innerHTML = marked.parse(
        response1.data
      );
      setloader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFileChange1 = (e) => {
    setFile1(e.target.files[0]);
    setselect(true);
  };

  //     const improved = async (e) => {
  //       e.preventDefault();
  //       try {

  //           const response1 = await axios.get('http://localhost:5000/improved');
  //           console.log(response1.data);
  //           // setresponse(marked.parse(response1.data))
  //           document.getElementById('display').innerHTML = marked.parse(response1.data);

  //       } catch (error) {
  //           console.error('Error fetching data:', error);
  //       }

  //   };

  const handleFileChange2 = (e) => {
    setFile2(e.target.files[0]);
    setselect(true);
  };

  return (
    <div className="mainanalysecont">
      <div className="Uploader">
        <Text fontSize="5xl" as="b">
          Compare 2 Resumes{" "}
        </Text>
         <Text fontSize="md"> (Upload only .jpg, .jpeg or .png) </Text><br />
        <br />
        {/* <Text fontSize="5xl" as="b"> find better</Text><br /> */}
        <br />
        <div className="uploading">
          <input type="file" onChange={handleFileChange1} id="fileup1" />
          <Button onClick={upload1} colorScheme="blue" id="uploadbtn">
            Upload
          </Button>
          <br />
        </div>
        <br />
        <div className="uploading">
          <input type="file" onChange={handleFileChange2} id="fileup2" />
          <Button onClick={upload2} colorScheme="blue" id="uploadbtn">
            Upload
          </Button>
          <br />
        </div>
        <br />
        <div className="lastrow">
          <Button
            onClick={resp}
            colorScheme="cyan"
            id="compare1"
            style={{
              display: uploaded1 && uploaded2 ? "inline-block" : "none",
            }}
          >
            Compare
          </Button>
          <Button
            onClick={clear}
            colorScheme="teal"
            id="compare2"
            style={{
              display: uploaded1 && uploaded2 ? "inline-block" : "none",
            }}
          >
            clear
          </Button>
          {/* <Spinner></Spinner> */}
          <Spinner
            style={{ display: loader ? "inline-block" : "none" }}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.400"
            size="xl"
          />
        </div>
      </div>
      {/* <button onClick={improved}>Improve</button> */}
      {/* <input type="text" name="ask" id="ask" value={ask.question} onChange={handleChange}/> */}
      {/* <button onClick={handleSubmit}>ask</button> */}
      <div id="display" style={{ display: loading ? "inline-block" : "none" }}>
        {/* {response} */}
      </div>
    </div>
  );
};

export default Compare;
