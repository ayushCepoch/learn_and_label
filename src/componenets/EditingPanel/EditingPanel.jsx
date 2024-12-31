import React, { useState } from 'react';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import PageContainer from '../containers/PageContainer/PageContainer';
import plusIcon from '../Assets/Images/plusIcon.png';
import './EditingPanel.css';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const EditingPanel = () => {
  const [pages, setPages] = useState(2); // Start with 2 pages
  const location = useLocation();

  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };

  const query = getQueryParams(location.search);
  const option = query.get('option'); // Extract 'option' query parameter

  const handleCapturePDF = () => {
    const element = document.getElementById('capture'); // The parent element containing all pages
    const pages = element.children; // Get all child elements (pages)
    const pdf = new jsPDF('p', 'mm', 'a4'); // Initialize jsPDF (Portrait, A4 size)

    let promises = []; // Array to store promises for each canvas rendering

    Array.from(pages).forEach((page, index) => {
      promises.push(
        html2canvas(page).then((canvas) => {
          const imgData = canvas.toDataURL('image/png'); // Get canvas as an image
          const imgWidth = 210; // A4 width in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

          // Add image to the PDF
          if (index === 0) {
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight); // Add first page
          } else {
            pdf.addPage(); // Add a new page
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight); // Add the image
          }
        })
      );
    });

    // Wait for all promises to resolve, then save the PDF
    Promise.all(promises).then(() => {
      pdf.save('screenshot.pdf'); // Save the PDF
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: '#f0f0f0', // Optional background color for visualization
        overflow: 'scroll',
      }}
    >
      <DashboardHeader onSave={handleCapturePDF} title={'Labels'} ShowOtherTitle={false} />
      <PageContainer>
        <div id="capture">
          {Array(pages)
            .fill('')
            .map((item, pageIndex) => (
              <div
                key={pageIndex}
                className="p-2"
                style={{
                  position: 'relative', // Relative positioning
                  width: '95vw', // Set the width of the A4 layout
                  height: 'calc(95vw * 1.414)', // Calculate the height using the A4 aspect ratio (1:√2)
                  backgroundColor: 'white', // A4 paper appearance
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional shadow for effect
                  border: '1px solid #ddd', // Optional border for clarity
                  margin: '10px auto 10px auto', // Center horizontally within the parent container
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                {Array(option === 'Option1' ? 8 : 4)
                  .fill('')
                  .map((item, index) => (
                    <div
                      key={index}
                      style={{ width: option === 'Option1' ? '48%' : '96%' ,border:'1px solid #000'}}
                      className={`h-[23%] flex flex-col`}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '90%',
                          borderRadius: '8px',
                        }}
                        className="flex justify-center items-center"
                      >
                        <img height={40} width={40} src={plusIcon} alt="Add" />
                      </div>
                      <div className="w-full flex flex-row justify-center">
                        <input className="w-1/2 py-[5px]" placeholder="Text here" />
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </PageContainer>
      <div onClick={() => setPages((prev) => prev + 1)} className="absolute bottom-[10px] right-[10px]">
        <img height={60} width={60} src={plusIcon} alt="Add Page" />
      </div>
    </div>
  );
};

export default EditingPanel;
