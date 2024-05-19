import React, { useState, useRef, useEffect } from "react";
import { Button, Modal } from "antd";

const CameraCaptureModal = ({ camaraModelVisibile, setCamaraModelVisible,setuploadingImage }) => {
  const [imageBase64, setImageBase64] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Function to start the camera when the modal is visible
    console.log("came here   ",camaraModelVisibile);

    // Start the camera when the modal becomes visible
    if (camaraModelVisibile === true) {
        setImageBase64(null);
      console.log("came here");
      startCamera();
    }


    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject;
          const tracks = stream.getTracks();
  
          tracks.forEach(track => {
            track.stop();
          });
        }
      };
  }, [camaraModelVisibile]);

  const startCamera = async () => {
    try {
      // Access the user's camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Set the stream as the source for the video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleRetake = () => {
    setImageBase64(null); 
    startCamera(); 
  };

  const handleCapture = async () => {
    const video = videoRef.current;

    if (video) {
      const captureCanvas = document.createElement("canvas");
      const context = captureCanvas.getContext("2d");

      // Set canvas dimensions same as video dimensions
      captureCanvas.width = video.videoWidth;
      captureCanvas.height = video.videoHeight;

      // Draw video frame onto canvas
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      // Convert canvas to Base64 string
      const base64Data = captureCanvas.toDataURL("image/jpeg");

      // Set Base64 string as state
      setImageBase64(base64Data);

      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
    
        tracks.forEach((track) => {
          track.stop();
        });
      }
      
    }
  };

  const handleOk = () => {
    if (imageBase64!=null) {
        setuploadingImage(imageBase64);
    console.log("Captured image Base64:", imageBase64);
    handleCancel();
    }
  };



  
  const handleCancel = () => {
    if (videoRef.current) {
      // Stop the video tracks
      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
  
        tracks.forEach((track) => {
          track.stop();
        });
      }
  
      // Explicitly set srcObject to null
      videoRef.current.srcObject = null;
    }
  
    // Clear image base64 data
    setImageBase64(null);
  
    // Close the modal
    setCamaraModelVisible(false);
  };
  




  return (
    <Modal
      title="Capture Image"
      open={camaraModelVisibile}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add Photo"
      okButtonProps={{className:"bg-blue-500"}}
    >
      <div>
        {imageBase64 ? (
            <div className="w-full">
          <img src={imageBase64} alt="Captured" style={{ maxWidth: "100%" }} />
          <Button className="w-full my-2 bg-gray-500 hover:bg-gray-600 text-white" onClick={handleRetake}>ReTake</Button>
          </div>
        ) : (
          <div>
            <video className="rounded-lg" ref={videoRef} style={{ width: "100%" }} autoPlay />
            <br />
            <div className="w-full flex flex-col">
            <Button className= "my-2 bg-blue-500 hover:bg-blue-600 text-white" onClick={handleCapture}>Capture Image</Button>
            
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CameraCaptureModal;
