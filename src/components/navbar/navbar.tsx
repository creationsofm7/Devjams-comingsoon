const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 border-b-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">&lt;&gt;</span>
          <div>
            <div className="font-semibold">Google Developer Student Clubs</div>
            <div className="text-sm text-gray-400">
              Vellore Institute of Technology
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <a href="#about" className="hover:text-gray-300">
            About
          </a>
          <a href="#faqs" className="hover:text-gray-300">
            FAQs
          </a>
          <a href="#contact" className="hover:text-gray-300">
            Contact Us
          </a>
        </div>
        <div className="flex items-center space-x-6">
          <button className="bg-gray-700 text-white px-4 py-2 rounded-full flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Coming Soon!</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
