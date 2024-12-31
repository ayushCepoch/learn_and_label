import React, { useState } from "react";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import editIcon from "../Assets/Images/editIcon.png";
import dummyImage from "../Assets/Images/DummyImage.png";
import newsLetterIcon from "../Assets/Images/newsLetter.png";
import PageContainer from "../containers/PageContainer/PageContainer";
import { useNavigate } from "react-router-dom";

const CreateLabel = () => {
  const [showNewsLetter, setShowNewsLetter] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [option,setOption] = useState("");
  const [showImagePopup, setShowImagePopup] = useState(false);
  const navigate = useNavigate()
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <DashboardHeader
        title={"Edit Project"}
        ShowOtherTitle={true}
        otherTitle={"Save"}
      />
      <PageContainer>
        <div className="w-full flex justify-center py-8 items-center">
          <div
            style={{
              borderRadius: "75px",
            }}
            className="w-[150px] h-[150px] bg-white"
          ></div>
        </div>
        <div
          style={{ borderRadius: "8px" }}
          className="bg-white mt-2 shadow-md px-4 py-2 flex flex-col gap-[10px]"
        >
          <p
            style={{ fontSize: "15px", fontWeight: "400" }}
            className="text-[#969AA8]"
          >
            Project Name
          </p>
          <input
            style={{
              borderBottomWidth: "1px",
              borderBottomColor: "#707070",
            }}
            className={`w-full appearance-none pb-2 pr-3 text-[#000] leading-tight focus:outline-none`}
          />
        </div>
        <div className="w-full flex gap-4  mt-4 items-center justify-center">
          <div className="w-[40%] relative">
            <div
              onClick={() => {
                setShowNewsLetter(!showNewsLetter);
                setShowLabel(false);
              }}
              style={{ borderRadius: "8px" }}
              className="bg-white flex flex-col gap-2 items-center justify-center w-full  py-8 shadow-md"
            >
              <img height={25} width={25} src={editIcon} />
              <p
                style={{ fontSize: "15px", fontWeight: "500" }}
                className="text-[#B0C736]"
              >
                Edit Labels
              </p>
            </div>
            {showNewsLetter && (
              <div
                style={{ borderRadius: "8px" }}
                className="bg-white w-full top-[130px] absolute shadow-md"
              >
                <p
                  onClick={() => setShowImagePopup(true)}
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  className="text-[#969AA8] text-center px-4 py-2"
                >
                  Start from Scratch
                </p>
                <hr />
                <p
                  onClick={() => setShowImagePopup(true)}
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  className="text-[#969AA8] text-center px-4 py-2"
                >
                  Choose from Templates
                </p>
              </div>
            )}
          </div>
          <div className="w-[40%] relative">
            <div
              onClick={() => {
                setShowLabel(!showLabel);
                setShowNewsLetter(false);
              }}
              style={{ borderRadius: "8px" }}
              className="bg-white flex flex-col gap-2 items-center justify-center  w-full py-8 shadow-md"
            >
              <img height={25} width={25} src={newsLetterIcon} />
              <p
                style={{ fontSize: "15px", fontWeight: "500" }}
                className="text-[#B0C736]"
              >
                Create Newsletter
              </p>
            </div>
            {showLabel && (
              <div
                style={{ borderRadius: "8px" }}
                className="bg-white w-full top-[130px] absolute shadow-md"
              >
                <p
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  className="text-[#969AA8] text-center px-4 py-2"
                >
                  Start from Scratch
                </p>
                <hr />
                <p
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  className="text-[#969AA8] text-center px-4 py-2"
                >
                  Choose from Templates
                </p>
              </div>
            )}
          </div>
        </div>
        {showImagePopup && (
          <>
            <div
              onClick={() => setShowImagePopup(false)}
              style={{
                height: "100svh",
                overflowX: "",
                overflowY: "",
                opacity: "0.35",
              }}
              className="bg-[#000] w-full top-[0px] left-[0px] bottom-[0px] absolute"
            ></div>
            <div
              style={{
                left: "calc((100% - 80%)/2)",
                borderTopRightRadius: "8px",
                borderTopLeftRadius: "8px",
              }}
              className="bg-white flex flex-col items-center absolute w-[80%] bottom-[0px]"
            >
              <div className="flex w-[90%] justify-between">
                <div style={{
                  border:option==='Option1'&&'1px solid black',
                  borderRadius:'12px'
                }} className="my-2" onClick={()=>setOption('Option1')}>
                  <img
                    style={{
                      height: "120px",
                      aspectRatio: "3/4",
                    }}
                    src={dummyImage}
                    className="mx-2"
                  />
                  <p
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    className="text-[#000] text-center px-4 py-2"
                  >
                    3 X 4
                  </p>
                </div>
                <div style={{
                  border:option==='Option2'&&'1px solid black',
                  borderRadius:'12px'
                }} className="my-2" onClick={()=>setOption('Option2')}>
                  <img
                    style={{
                      height: "120px",
                      aspectRatio: "5/4",
                    }}
                    className="mx-2"
                    src={dummyImage}
                  />
                  <p
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    className="text-[#000] text-center px-4 py-2"
                  >
                    5 X 4
                  </p>
                </div>
              </div>
              <div
              onClick={()=>navigate(`/editing-panel?option=${option}`)}
                style={{ borderRadius: "12px" }}
                className="w-[90%] py-2 bg-[#B0C736] mb-[20px]"
              >
                <p
                  style={{ fontSize: "15px", fontWeight: "400" }}
                  className="text-[#fff] text-center px-4 py-2"
                >
                  Continue
                </p>
              </div>
            </div>
          </>
        )}
      </PageContainer>
    </div>
  );
};

export default CreateLabel;
