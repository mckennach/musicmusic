// import { useEffect } from "react";

// export function useImageData() {

//   function loadImage(src: string): Promise<HTMLImageElement> {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.addEventListener("load", () => {
//         resolve(img);
//       });
//       img.addEventListener("error", reject);
//       img.src = src;
//     });
//   }

//   function analyzeImage(img: HTMLImageElement) {
//     const { width, height } = img;
//     const canvas = document.createElement("canvas");

//     canvas.height = height;
//     canvas.width = width;
//     const context = canvas.getContext?.("2d");
//     if (context === null) {
//       return;
//     }
//     context.drawImage(img, 0, 0);
//     const imageData = context.getImageData(0, 0, width, height);
//     return imageData;
//   }

//   return {
//     getImageData: async (src: string) => {
//       loadImage(src).then((data) => {
//         if(!data) return;
//         analyzeImage(data).then((data2) => {
//           console.log(data2);
//         });
//       });

//       return 'test';
//     }
//   }
// }
