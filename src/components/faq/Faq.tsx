
type FAQItemProps = {
    question: string;
    answer: string;
    };

type FAQSectionProps = {
    title: string;
    faqs: FAQItemProps[];
    gradientColors: string;
    };


const FAQItem = ({ question, answer }: FAQItemProps) => {
  return (
    <div className="border p-4">
      <div className="">
        <h3 className="text-white text-lg font-medium">{question}</h3>
      </div>
      <div className=" bg-gray-900 text-gray-300">
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQSection = ({ title, faqs, gradientColors }: FAQSectionProps) => {
  return (
    <div className="max-w-2xl mx-auto p-4 mb-8">
      <div className={`bg-gradient-to-r ${gradientColors} p-4 rounded-t-lg`}>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="bg-gray-900 rounded-b-md overflow-hidden border border-gray-700 border-t-0">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

const MultipleFAQSections = () => {
  const sections = [
    {
      title: "General",
      gradientColors: "from-blue-500 to-green-500",
      faqs: [
        {
          question: "Do I need to pay to register for the hack?",
          answer: "You do not need to pay to register. You can save the money for ordering food."
        },
        {
          question: "What is a hackathon?",
          answer: "A hackathon is a collaborative event where participants work together to create innovative solutions to problems within a limited time frame."
        },
        {
            question: "What is a hackathon?",
            answer: "A hackathon is a collaborative event where participants work together to create innovative solutions to problems within a limited time frame."
          }
      ]
    },
    {
      title: "Registration",
      gradientColors: "from-purple-500 to-pink-500",
      faqs: [
        {
          question: "How do I register for the event?",
          answer: "You can register for the event through our official website. Look for the 'Register' button and follow the instructions."
        },
        {
          question: "Is there a registration deadline?",
          answer: "Yes, the registration deadline is typically one week before the event. Please check our website for the exact date."
        },
        {
            question: "Is there a registration deadline?",
            answer: "Yes, the registration deadline is typically one week before the event. Please check our website for the exact date."
          }
      ]
    },
    {
      title: "Event Details",
      gradientColors: "from-yellow-500 to-red-500",
      faqs: [
        {
          question: "When and where is the hackathon taking place?",
          answer: "The hackathon will take place on [Date] at [Location]. For virtual participants, we will provide online access details closer to the event."
        },
        {
          question: "What should I bring to the hackathon?",
          answer: "Bring your laptop, charger, and any other devices you might need. For in-person events, consider bringing toiletries and a change of clothes if it's an overnight event."
        },
        {
            question: "Is there a registration deadline?",
            answer: "Yes, the registration deadline is typically one week before the event. Please check our website for the exact date."
          }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8">
      {sections.map((section, index) => (
        <FAQSection
          key={index}
          title={section.title}
          faqs={section.faqs}
          gradientColors={section.gradientColors}
        />
      ))}
    </div>
  );
};

export default MultipleFAQSections;