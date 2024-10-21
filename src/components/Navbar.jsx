import React, { useEffect, useState } from "react";
import MainLogo from "../assets/Frame 1.png";
import { AiFillGithub } from "react-icons/ai";
import { useSelector } from "react-redux";
import { TbSourceCode } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Navbar = () => {
  const [gitLogo, setgitLogo] = React.useState(false);
  const canvasBackGround = useSelector(
    (state) => state.canvasStyle.canvasBackGround
  );
  const [mainLogo, setmainLogo] = useState(false);
  const history = useNavigate();
  useEffect(() => {}, [canvasBackGround, mainLogo]);

  return (
    <div className="flex justify-center items-center">
      <div className="fixed top-4 left-5 mb-5 flex justify-center items-end ">
        <TbSourceCode
          className="cursor-pointer"
          onMouseOver={() => setmainLogo(true)}
          onMouseOut={() => setmainLogo(false)}
          style={{
            height: "44px",
            width: "44px",
            color: `${mainLogo === true ? `${canvasBackGround}` : `#6B5ED9`}`,
          }}
        />
        <p
          className={`sm:text-[21px] text-[19px] ml-2 sm:mb-[3px] mb-[6px] flex items-end text-[#6B5ED9] font-extrabold`}
          style={{ fontFamily: "Jetbrains mono" }}
        >
          Code to Image
        </p>
      </div>
      <div className="fixed flex flex-row justify-center items-center top-4 right-[1px] mr-3 lg:mr-0 cursor-pointer">
        <NavLink to="https://github.com/zunedaalim/Code2Img">
          <AiFillGithub
            className="cursor-pointer"
            onMouseOver={() => setgitLogo(true)}
            onMouseOut={() => setgitLogo(false)}
            style={{
              height: "40px",
              width: "40px",
              marginRight: "20px",
              color: `${gitLogo === true ? `${canvasBackGround}` : `#6B5ED9`}`,
            }}
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
