import { FaSearch, FaUpload, FaStar } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Discover Amazing Products",
      description: "Browse through a wide range of trending tech tools, software, and apps.",
      icon: <FaSearch className="text-white text-4xl" />,
    },
    {
      id: 2,
      title: "Submit Your Product",
      description: "Share your own tech product and let the world explore it.",
      icon: <FaUpload className="text-white text-4xl" />,
    },
    {
      id: 3,
      title: "Vote & Review",
      description: "Upvote your favorite products and share your feedback.",
      icon: <FaStar className="text-white text-4xl" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-8">How It Works</h2>
        <p className="text-lg text-gray-600 mb-12">
          Discover, submit, and engage with the best tech products on Tech Discovery.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-transform transform hover:scale-105">
              <div className="w-16 h-16 mx-auto flex items-center justify-center bg-primary rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
