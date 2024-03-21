import download from "downloadjs";
import * as htmlToImage from "html-to-image";

export const htmlToImagetranslator = async (node) => {
  console.log("came here bill conversion");
  try {
    const dataUrl = await htmlToImage.toPng(node);
   
    return dataUrl;
  } catch (error) {
    console.error("Oops, something went wrong in html to image!", error);
    return "";
  }
};

// const convertDataUrlToBase64 = (dataUrl) => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0);
//       const base64 = canvas.toDataURL("image/png");
//       resolve(base64);
//     };
//     img.onerror = (error) => reject(error);
//     img.src = dataUrl;
//   });
// };
