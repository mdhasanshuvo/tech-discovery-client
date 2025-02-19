import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import faq from "../assets/faq.jpg"

const faqs = [
    {
        question: "What is Tech Discovery?",
        answer:
            "Tech Discovery is a platform where you can discover, share, and upvote the latest tech products, web apps, AI tools, and more.",
    },
    {
        question: "How can I submit a product?",
        answer:
            "To submit a product, create an account, navigate to the 'Submit Product' page, and fill in the required details along with an image and description.",
    },
    {
        question: "Can I upvote my own product?",
        answer:
            "No, you cannot upvote your own product. Our system ensures fair voting by restricting self-votes.",
    },
    {
        question: "Are there any premium features?",
        answer:
            "Yes! You can get access to premium features like featured product placement, analytics, and promotional tools by subscribing to our premium membership.",
    },
    {
        question: "How do I get a discount on premium membership?",
        answer:
            "You can use special coupon codes available on our platform to get discounts on premium membership.",
    },
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Frequently Asked Questions
            </h2>
            <div className="flex justify-between flex-col md:flex-row">
                <div className=" md:w-[40%]" >
                    <img src={faq} alt="" />
                </div>
                <div className="md:w-[55%] my-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg overflow-hidden transition-all"
                            >
                                <button
                                    className="w-full flex justify-between items-center p-5 text-lg font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 transition duration-300"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    {faq.question}
                                    {openIndex === index ? (
                                        <FiChevronUp className="text-xl" />
                                    ) : (
                                        <FiChevronDown className="text-xl" />
                                    )}
                                </button>
                                {openIndex === index && (
                                    <div className="p-5 text-gray-700 border-t border-gray-200">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
