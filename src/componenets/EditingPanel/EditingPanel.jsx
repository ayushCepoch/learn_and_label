import React, { useRef, useState } from "react";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import PageContainer from "../containers/PageContainer/PageContainer";
import plusIcon from "../Assets/Images/plusIcon.png";
import "./EditingPanel.css";
import { useLocation } from "react-router-dom";
import { PDFDocument, rgb } from 'pdf-lib';
import image from '../Assets/Images/4to3.png'
import { saveAs } from 'file-saver';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ImageCard = ({ key, option }) => {
  const [previewImage, setPreviewImage] = useState("");
  const $imageRef = useRef(null);

  const handleImageUpload = async (e) => {
    try {
      const selectedFile = e.target.files[0];
      setPreviewImage(URL.createObjectURL(selectedFile));
      if (!selectedFile) {
        console.error("No file selected for upload.");
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageUploadClick = () => {
    $imageRef.current.click();
  };
  return (
    <div
      key={key}
      style={{
        width: option === "Option1" ? "48%" : "96%",
        border: "1px solid #000",
      }}
      className={`relative h-[23%] flex flex-col`}
    >
      {previewImage !== "" && (
        <div
          onClick={() => setPreviewImage("")}
          style={{
            height: "15px",
            width: "15px",
            background: "red",
            borderRadius: "7.5px",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: "-5px",
            right: "-5px",
          }}
        >
          <p className="text-[10px] text-[#fff]">X</p>
        </div>
      )}
      <input
        ref={$imageRef}
        type="file"
        className="hidden"
        name="image"
        id="upload"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <div
        style={{
          width: "100%",
          height: "76%",
          borderRadius: "8px",
        }}
        className="flex justify-center items-center"
      >
        {previewImage === "" ? (
          <img
            height={40}
            width={40}
            src={plusIcon}
            onClick={handleImageUploadClick}
            alt="Add"
        
          />
        ) : (
          <img
            style={{ width: "100%", height: "80%", objectFit: "cover" }}
            src={previewImage}
            alt="Add"
          />
        )}
      </div>
      <div className="w-full flex flex-row justify-center">
        <input  style={{
      width: "50%",
    }} placeholder="Text here" />
      </div>
    </div>
  );
};

const EditingPanel = () => {
  const [pages, setPages] = useState(1); // Start with 2 pages
  const location = useLocation();

  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };

  const query = getQueryParams(location.search);
  const option = query.get("option"); // Extract 'option' query parameter

//   const handleCapturePDF = () => {
//     const element = document.getElementById("capture"); // The parent element containing all pages
//     const pages = element.children; // Get all child elements (pages)
//     const pdf = new jsPDF("p", "mm", "a4"); // Initialize jsPDF (Portrait, A4 size)

//     let promises = []; // Array to store promises for each canvas rendering

//     Array.from(pages).forEach((page, index) => {
//       promises.push(
//         html2canvas(page).then((canvas) => {
//           const imgData = canvas.toDataURL("image/png"); // Get canvas as an image
//           const imgWidth = 210; // A4 width in mm
//           const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

//           // Add image to the PDF
//           if (index === 0) {
//             pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight); // Add first page
//           } else {
//             pdf.addPage(); // Add a new page
//             pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight); // Add the image
//           }
//         })
//       );
//     });

//     // Wait for all promises to resolve, then save the PDF
//     Promise.all(promises).then(() => {
//       pdf.save("screenshot.pdf"); // Save the PDF
//     });
//   };



    const data = [
      "Trucks",
      "Airplane",
      "Helicopter",
      "Tractor",
      "Train",
      "Tracks",
      "Animals",
      "Barn",
      "Large Animals",
      "Pets",
      "Farm Animals",
      "Desert Animals",
      "Trains and tracks",
      "Tree blocks",
      "Construction cone",
    ];
  
  
    const createPDF = async () => {
        const itemsPerPage = 8; // 4 rows per page, 2 items per row
        const pageWidth = 595.28; // A4 width in points
        const pageHeight = 841.89; // A4 height in points
        const margin = 20; // Small margins on the left and right
        const horizontalSpacing = 30; // Spacing between items in the same row
        const verticalSpacing = 5; // Spacing between rows
        const leftOffset = 10; // Small offset to move content to the left
        const pdfDoc = await PDFDocument.create();
      
        // Fetch and embed the imported image
        const response = await fetch(image); // Image is imported and used as a module
        const imageBytes = await response.arrayBuffer();
        const embeddedImage = await pdfDoc.embedPng(imageBytes);
      
        const imgWidth = (pageWidth - 2 * margin - horizontalSpacing) / 2.4; // Image width for 2 images per row
        const imgHeight = (imgWidth * 3) / 4; // Maintain 4:3 aspect ratio
        const boxPadding = 10; // Padding inside the box
        const boxHeight = imgHeight + 32; // Height of box to include text space
        const totalContentHeight = 4 * (boxHeight + verticalSpacing) - verticalSpacing; // Total height of all rows
      
        // Split data into chunks of `itemsPerPage`
        const pages = [];
        for (let i = 0; i < data.length; i += itemsPerPage) {
          const pageData = data.slice(i, i + itemsPerPage);
          pages.push(pageData);
        }
      
        // Fill the last page if it has fewer than `itemsPerPage`
        if (pages.length && pages[pages.length - 1].length < itemsPerPage) {
          const lastPage = pages[pages.length - 1];
          while (lastPage.length < itemsPerPage) {
            lastPage.push(""); // Fill with empty strings
          }
        }
      
        // Create a page for each chunk
        for (const pageData of pages) {
          const page = pdfDoc.addPage([pageWidth, pageHeight]);
          const { width, height } = page.getSize();
      
          const contentStartY = (height - totalContentHeight) / 2; // Center content vertically
      
          // Arrange items in 2 columns and 4 rows
          pageData.forEach((item, index) => {
            const row = Math.floor(index / 2); // Row index (0-3)
            const col = index % 2; // Column index (0 or 1)
      
            const boxX = (width - (2 * imgWidth + horizontalSpacing)) / 2 + col * (imgWidth + horizontalSpacing) - leftOffset; // Adjust X position for leftward alignment
            const boxY = contentStartY + (3 - row) * (boxHeight + verticalSpacing); // Adjust Y position for center alignment
      
            // Draw the black border box
            page.drawRectangle({
              x: boxX,
              y: boxY,
              width: imgWidth + boxPadding * 2,
              height: boxHeight,
              borderColor: rgb(0, 0, 0),
              borderWidth: 1,
            });
      
            // Draw the image inside the box
            page.drawImage(embeddedImage, {
              x: boxX + boxPadding,
              y: boxY + boxPadding + 20, // Space for text below the image
              width: imgWidth,
              height: imgHeight,
            });
      
            // Draw the text centered below the image
            page.drawText(item || "", {
              x: boxX + boxPadding + imgWidth / 2 - 20, // Center text inside the box
              y: boxY + boxPadding,
              size: 12,
              color: rgb(0, 0, 0),
            });
          });
        }
      
        // Serialize the PDF and trigger download
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, 'GeneratedPDF_Centered_LeftAdjusted.pdf');
      };
      
      

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "#f0f0f0", // Optional background color for visualization
        overflow: "scroll",
      }}
    >
      <DashboardHeader
        onSave={createPDF}
        title={"Labels"}
        ShowOtherTitle={false}
      />
      <PageContainer>
        <div id="capture">
          {Array(pages)
            .fill("")
            .map((item, pageIndex) => (
              <div
                key={pageIndex}
                className="p-2"
                style={{
                  position: "relative", // Relative positioning
                  width: "95vw", // Set the width of the A4 layout
                  height: "calc(95vw * 1.414)", // Calculate the height using the A4 aspect ratio (1:√2)
                  backgroundColor: "white", // A4 paper appearance
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow for effect
                  border: "1px solid #ddd", // Optional border for clarity
                  margin: "10px auto 10px auto", // Center horizontally within the parent container
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {Array(option === "Option1" ? 8 : 4)
                  .fill("")
                  .map((item, index) => (
                    <ImageCard key={index} option={option} />
                  ))}
              </div>
            ))}
        </div>
      </PageContainer>
      <div
        onClick={() => setPages((prev) => prev + 1)}
        className="absolute bottom-[10px] right-[10px]"
      >
        <img height={60} width={60} src={plusIcon} alt="Add Page" />
      </div>
    </div>
  );
};

export default EditingPanel;
