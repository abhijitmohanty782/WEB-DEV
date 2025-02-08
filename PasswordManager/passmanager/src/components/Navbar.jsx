import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 ">
      <div className="flex justify-between items-center px-4 py-5 h-14 mycontainer">
        <div className="flex justify-center items-center logo font-bold text-white text-2xl">
          <span className="text-purple-600">&lt; </span>
          <span className="text-purple-600"> P</span>
          <span >
            <lord-icon
              src="https://cdn.lordicon.com/mzcaikdp.json"
              trigger="loop"
              delay="500"
              stroke="bold"
              style={{"width":"28px","height":"28px"}}
            ></lord-icon>
          </span>
            <span className="text-purple-600">ss</span>
          Manager
          <span className="text-purple-600"> /&gt;</span>
        </div>

        <button className="text-white bg-black rounded-full mx-1 px-1 md:my-3 md:px-3 md:flex md:gap-3 justify-between items-center ring-1 ring-white">
          <img
            className="invert w-10 py-1"
            src="src\assets\github.svg"
            alt="Github"
          />
          <span className="hidden md:block">GitHub</span>
          
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
