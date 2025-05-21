import { useRef, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Canvas from "./components/Canvas";
import ConfigTableVisible from "./components/ConfigTableVisible";
import Feature from "./components/Feature";
import Navbar from "./components/Navbar";
import { GlobelThemeContext } from "./Context/GlobelThemeContext";
import { VisibleContext } from "./Context/VisibleContext";

const MOBILE_BREAKPOINT = 768;

function App() {
  const myRef = useRef(null);
  const [visiblity, setvisiblity] = useState(true);
  const [bgTheme, setbgTheme] = useState("solid");

  const [isMobileView, setIsMobileView] = useState(false);
  const [hasDismissedWarning, setHasDismissedWarning] = useState(false);

  const popupNodeRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const dismissWarning = () => {
    setHasDismissedWarning(true);
  };

  return (
    <>
      <VisibleContext.Provider value={{ visiblity, setvisiblity }}>
        <Navbar />

        <CSSTransition
          in={isMobileView && !hasDismissedWarning}
          timeout={300}
          classNames="popup-transition"
          unmountOnExit
          nodeRef={popupNodeRef}
        >
          <div
            ref={popupNodeRef}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-gray-800 text-gray-100 rounded-lg shadow-xl p-6 max-w-sm w-full text-center relative">
              <h2 className="text-lg font-bold mb-3">
                Optimized for Larger Screens
              </h2>
              <p className="mb-4">
                This website is best viewed on a larger screen (desktop or
                tablet).
              </p>
              <button
                onClick={dismissWarning}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                Got It
              </button>
            </div>
          </div>
        </CSSTransition>

        <div className="flex flex-col justify-center items-center">
          <GlobelThemeContext.Provider value={{ bgTheme, setbgTheme }}>
            <div className="flex justify-start lg:justify-center items-center overflow-x-auto m-auto  w-full px-8">
              <Canvas sharedRef={myRef} />
            </div>
            <div className="mycontainer flex m-[100px] justify-start lg:justify-center items-center sm:overflow-x-auto w-full ">
              <Feature sharedRef={myRef} />
            </div>
          </GlobelThemeContext.Provider>
        </div>
        <ConfigTableVisible />
      </VisibleContext.Provider>
    </>
  );
}

export default App;
