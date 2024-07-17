import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import styles from "../../styles/hamburgers.module.css"


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <nav className="bg-[#202124] fixed top-0 w-full z-50 text-white border-b-2">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 justify-between">
          <div className="flex items-center flex-1">
            <div className="flex-shrink-0 flex items-center">
              <svg
                width="32"
                height="16"
                viewBox="0 0 32 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" md:self-start"
              >
                <path
                  d="M12.7993 10.7853L3.82665 5.61019C3.53571 5.44315 3.21472 5.33505 2.88201 5.29206C2.54929 5.24907 2.21136 5.27202 1.88752 5.35963C1.56369 5.44724 1.26028 5.59778 0.994613 5.80264C0.72895 6.00751 0.506236 6.26269 0.339194 6.55363C0.172153 6.84456 0.0640502 7.16555 0.0210605 7.49827C-0.0219292 7.83098 0.0010394 8.16892 0.0886464 8.49276C0.176253 8.8166 0.326785 9.12 0.531651 9.38566C0.736518 9.65132 0.991706 9.87404 1.28264 10.0411L10.2553 15.2162C10.8414 15.5546 11.538 15.6463 12.1918 15.4711C12.8456 15.2959 13.403 14.8681 13.7414 14.282C14.0798 13.6958 14.1715 12.9992 13.9963 12.3454C13.8211 11.6916 13.3934 11.1342 12.8072 10.7958L12.7993 10.7853Z"
                  fill="white"
                />
                <path
                  d="M30.6706 5.61004L21.698 0.437577C21.1118 0.0991717 20.4152 0.00749053 19.7615 0.182689C19.1077 0.357887 18.5503 0.785623 18.2119 1.3718C17.8735 1.95797 17.7818 2.65456 17.957 3.30833C18.1322 3.96211 18.5599 4.51951 19.1461 4.85791L28.1187 10.0304C28.7049 10.3688 29.4015 10.4605 30.0552 10.2853C30.709 10.1101 31.2664 9.68233 31.6048 9.09616C31.9432 8.50998 32.0349 7.81339 31.8597 7.15962C31.6845 6.50584 31.2568 5.94845 30.6706 5.61004Z"
                  fill="white"
                />
                <path
                  d="M27.7651 10.6452L23.5823 8.23047L19.1567 10.785C18.8664 10.9526 18.6121 11.1757 18.408 11.4416C18.204 11.7074 18.0543 12.0109 17.9676 12.3346C17.8808 12.6583 17.8587 12.996 17.9024 13.3282C17.9462 13.6605 18.0549 13.9809 18.2225 14.2712C18.3901 14.5614 18.6131 14.8158 18.879 15.0198C19.1449 15.2238 19.4484 15.3735 19.7721 15.4603C20.0958 15.547 20.4334 15.5691 20.7657 15.5254C21.098 15.4817 21.4184 15.3729 21.7086 15.2054L28.9131 11.0463C28.5088 10.9854 28.1194 10.8494 27.7651 10.6452V10.6452Z"
                  fill="white"
                />
                <path
                  d="M4.18555 4.99505L8.37365 7.40182L12.7993 4.84726C13.1144 4.69415 13.3947 4.47777 13.6225 4.21162C13.8504 3.94547 14.021 3.63526 14.1238 3.30029C14.2265 2.96532 14.2592 2.61278 14.2198 2.26463C14.1803 1.91648 14.0696 1.5802 13.8945 1.27671C13.7194 0.973219 13.4837 0.709022 13.2021 0.5006C12.9204 0.292178 12.5989 0.143993 12.2575 0.0652621C11.9161 -0.0134688 11.5621 -0.0210527 11.2176 0.0429858C10.8732 0.107024 10.5456 0.241306 10.2553 0.437476L3.05078 4.59655C3.45034 4.65843 3.83503 4.79352 4.18555 4.99505V4.99505Z"
                  fill="white"
                />
              </svg>
              <span className="text-sm font-normal hidden md:block ml-2">
                Google Developer Student Clubs
                <span className="block md:block text-xs text-gray-100 md:ml-1">
                  Vellore institute of technology
                </span>
              </span>
            </div>
          </div>
          <div className="hidden md:flex flex-1 gap-5 justify-center">
            <ScrollLink
              to="about"
              smooth={true}
              className="block p-2 px-4 lg:inline-block hover:bg-[#1A1A1A] hover:rounded-lg hover:cursor-pointer"
            >
              About
            </ScrollLink>
            <ScrollLink
              to="faq"
              smooth={true}
              className="block p-2 px-4 lg:inline-block hover:bg-[#1A1A1A] hover:rounded-lg hover:cursor-pointer"
            >
              FAQ
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              className="block p-2 px-4 lg:inline-block hover:bg-[#1A1A1A] hover:rounded-lg hover:cursor-pointer"
            >
              Contact US
            </ScrollLink>
          </div>
          <div className="flex flex-1 justify-end items-center space-x-4">
            {/* <button className="bg-[#2e2e2e] px-5 py-2 rounded-full text-sm font-normal hover:bg-gray-700"> */}
            <span className="flex items-center p-2 rounded-full px-4 bg-[#353638] hover:cursor-default">
              <Clock size={18} />
              <span className="mr-2 ml-1 align-middle">Coming Soon!</span>
            </span>
            {/* </button> */}
          </div>
          <div className="md:hidden h-full flex items-center">
            <button
              className={`${styles.hamburger} ${
                styles["hamburger--collapse"]
              } ${isOpen ? styles["is-active"] : ""}`}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className={`${styles["hamburger-box"]} `}>
                <span className={styles["hamburger-inner"]}></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#202124] h-screen w-full flex p-4 flex-col gap-4 text-3xl">
          <div>
            <ScrollLink
              to="about"
              smooth={true}
              offset={-100}
              onClick={() => setIsOpen(false)}
              className="block p-2 px-4 lg:inline-block hover:bg-[#1A1A1A] hover:rounded-lg hover:cursor-pointer"
            >
              About
            </ScrollLink>
            <ScrollLink
              to="faq"
              smooth={true}
              onClick={() => setIsOpen(false)}
              className="block p-2 px-4 lg:inline-block hover:bg-[#1A1A1A] hover:rounded-lg hover:cursor-pointer"
            >
              FAQ
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              onClick={() => setIsOpen(false)}
              className="block p-2 px-4 lg:inline-block hover:bg-[#1A1A1A] hover:rounded-lg hover:cursor-pointer"
            >
              Contact US
            </ScrollLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
