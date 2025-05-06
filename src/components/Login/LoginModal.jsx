import React, {useRef, useEffect} from "react";
import "./loginModal.css";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function LoginModal({ isOpen, setIsOpen }) {
  const loginRef = useRef();
  const overlayRef = useRef();

  // useEffect(() => {
  //   const handler = (event) => {
  //     if (loginRef.current && !loginRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //       console.log("handler")
  //     }
  //   };

  //   document.addEventListener("click", handler);

  //   return () => {
  //     document.removeEventListener("click", handler);
  //   };
  // }, [loginRef])

  return (
    <>
      {isOpen ? (
        <div className="login_overlay" ref={overlayRef}>
          <div className="loginModal_container"  ref={loginRef}>
            <button className="closeForm_btn" onClick={() => setIsOpen(!isOpen)}>
              <IoClose />
            </button>
            <h1>Sign In</h1>
            <form action="" className="login_form">
              <input name="username" type="text" placeholder="Username" />

              <input name="password" type="password" placeholder="Password" />

              <button className="form_btn" type="submit">
                Submit
              </button>
            </form>
            <section className="social_section">
              <span>or use a social network</span>
              <div className="social_icons">
                <a href="">
                  <FaGoogle />
                </a>
                <a href="">
                  <FaFacebookSquare />
                </a>
                <a href="">
                  <FaXTwitter />
                </a>
              </div>
            </section>
            <section className="signup_section">
              <span>
                Not a member yet? <a href="">Sign Up</a>
              </span>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default LoginModal;
