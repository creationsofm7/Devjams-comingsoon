const ContactCard = () => {
  return (
    <div className="contact-c border-2 rounded-lg shadow-lg p-4 sm:p-6 mx-2 sm:mx-8" style={{ backgroundColor: '#202124' }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-white text-3xl sm:text-5xl font-medium mb-2 sm:mb-0">
          Contact us
        </h2>
        <button className="group bg-white text-black rounded-full hover:pr-4 flex items-center transition-all duration-300 ease-in-out">
          <div className="bg-white rounded-full p-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6 text-white"
              fill="black"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-sm sm:text-base font-medium whitespace-nowrap w-0 overflow-hidden group-hover:w-auto transition-all duration-300 ease-in-out hover:ml-2">
            Write to us
          </span>
        </button>
      </div>
      <hr className="mb-4 border-white" />
      <div className="space-y-4 cursor-pointer">
        <ContactPerson name="Dhruv Rajeshkumar Shah" phone="+91 98506 45450" />
        <hr className="border-white" />
        <ContactPerson name="Sanvi Chavan" phone="+91 98506 45450" />
      </div>
    </div>
  );
};

type ContactPersonProps = {
  name: string;
  phone: string;
};

const ContactPerson = ({ name, phone }: ContactPersonProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
      <span className="text-white font-normal text-lg sm:text-xl">{name}</span>
      <div className="flex items-center">
        <span className="underline underline-offset-4 sm:underline-offset-8 text-sm mr-2 text-gray-300">
          {phone}
        </span>
        <div className="bg-white rounded-full p-1.5 sm:p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 text-white"
            fill="black"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
