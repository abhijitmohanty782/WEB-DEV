import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  
  const getpassword =async () =>{
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json();
    console.log(passwords)
    setPasswordArray(passwords);
  }

  useEffect(() => {
    getpassword()
  }, []);

  const copyText = (text) => {
    toast("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    // alert("Show the password");
    if (ref.current.src.includes("src/assets/hide.svg")) {
      ref.current.src = "src/assets/show.svg";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "src/assets/hide.svg";
      passwordRef.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {

      //If any such id exists in Database, delete it
      await fetch("http://localhost:3000/",{method: "DELETE", headers: {"Content-Type":"application/json"}, body: JSON.stringify({id: form.id})})

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/",{method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({...form, id: uuidv4()})})
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      setform({ site: "", username: "", password: "" });
      toast("Password saved successful", {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast("Password not saved", {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id", id);
    setform({...passwordArray.filter((item) => item.id === id)[0], id:id});
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };
  const deletePassword = async (id) => {
    console.log("Deleting password with id", id);
    let c = confirm("Do you want to delete this Entery");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch("http://localhost:3000/",{method: "DELETE", headers: {"Content-Type":"application/json"}, body: JSON.stringify({id})})
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
      toast("Password deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div> */}
      <div className="px-2 md:mycontainer h-full w-full">
        <h1 className="text-4xl text-green font-bold text-center">
          <span className="text-purple-600 ">&lt; </span>
          <span className="text-purple-600">Pass</span>
          Manager
          <span className="text-purple-600"> /&gt;</span>
        </h1>
        <p className="text-black text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-4 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-purple-500 w-full px-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Website username"
              className="rounded-full border border-purple-500 w-full px-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-purple-500 w-full px-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[1px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-2"
                  width={37}
                  src="src\assets\show.svg"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-purple-500 hover:bg-purple-500 rounded-full px-5 py-2 w-fit filter hover:drop-shadow-xl"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#000000"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="px-3 font-bold text-2xl">Your Password</h2>
          {passwordArray.length === 0 && (
            <div className="px-3">No password to Show</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-xl">
              <thead className=" bg-purple-800 text-white">
                <tr>
                  <th className="py2">Site</th>
                  <th className="py2">Username</th>
                  <th className="py2">Password</th>
                  <th className="py2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-200">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex justify-center items-center gap-3">
                          <a href={item.site} target="_blanck">
                            {item.site}
                          </a>

                          <img
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                            src="src\assets\copy.svg"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex justify-center items-center gap-3">
                          <span>{item.username}</span>
                          <img
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                            src="src\assets\copy.svg"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex justify-center items-center gap-3">
                          <span>{"*".repeat(item.password.length)}</span>
                          <img
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                            src="src\assets\copy.svg"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="flex justify-center items-center py-2 gap-4 border border-white text-center">
                        <span
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/vwzukuhn.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#8930e8,tertiary:#4f1091,quaternary:#e5d1fa"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/nhqwlgwt.json"
                            trigger="hover"
                            colors="primary:#320a5c,secondary:#a866ee,tertiary:#646e78,quaternary:#9cc2f4"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
