import { Helmet } from 'react-helmet';
import aboutImage from '../assets/all.jpg';

const AboutUs = () => {
    return (
        <div className="bg-base-300">

            <Helmet>
                <title>About | Tech Discovery</title>
            </Helmet>

            <div className="max-w-screen-xl mx-auto px-6 sm:px-8 py-12">

                {/* Hero Section */}
                <section className="text-center mb-12 sm:mb-28">
                    <h1 className="text-5xl font-extrabold text-primary leading-tight mb-8">
                        Welcome to Tech Discovery
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
                        Exploring the latest in technology, innovation, and digital transformation. Stay ahead with our expert insights, trends, and updates.
                    </p>
                    <img
                        src={aboutImage}
                        alt="Technology and Innovation"
                        className="w-full max-h-[500px] object-cover rounded-xl shadow-lg"
                    />
                </section>

                {/* Our Mission Section */}
                <section className="bg-white rounded-lg shadow-lg p-8 mb-12 sm:mb-32">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Our Mission</h2>
                    <div className="flex flex-col md:flex-row items-center space-x-6">
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/003/396/738/small_2x/businessman-clicks-on-virtual-screen-mission-photo.jpg"
                            alt="Innovation and Research"
                            className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-lg"
                        />
                        <p className="text-lg text-gray-700 leading-relaxed text-center md:text-left mt-6 md:mt-0">
                            At Tech Discovery, we strive to bring you the latest advancements in technology, AI, and digital solutions. Our goal is to bridge the gap between innovation and accessibility, making cutting-edge developments understandable and applicable for all.
                        </p>
                    </div>
                </section>

                {/* Our Values Section */}
                <section className="mb-12 sm:mb-28">
                    <h2 className="text-3xl font-semibold text-primary text-center mb-8">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            { icon: "fas fa-microchip", title: "Innovation", desc: "We explore the latest tech advancements and their real-world impact." },
                            { icon: "fas fa-lightbulb", title: "Knowledge Sharing", desc: "Bringing complex topics to life with clear, insightful content." },
                            { icon: "fas fa-users", title: "Community", desc: "Building a network of tech enthusiasts, experts, and learners." }
                        ].map((value, index) => (
                            <div key={index} className="text-center bg-white p-8 rounded-lg shadow-lg transition duration-300 hover:shadow-2xl">
                                <div className="mb-4">
                                    <i className={`${value.icon} text-4xl text-primary`}></i>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="bg-gray-100 rounded-lg shadow-lg p-8 mb-12 sm:mb-28">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Why Choose Tech Discovery?</h2>
                    <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
                        We bring the future of technology to your fingertips with expert analysis and cutting-edge insights.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            { title: "Latest Tech Trends", desc: "Stay updated with the newest developments in AI, IoT, and more." },
                            { title: "Expert Insights", desc: "Our team of professionals provides deep dives into emerging technologies." },
                            { title: "Community-Driven Content", desc: "Engaging discussions and collaborations for tech enthusiasts." }
                        ].map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl text-center">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="bg-primary text-white text-center py-12 px-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold">Join the Future of Tech</h2>
                    <p className="mt-3 text-lg max-w-2xl mx-auto">
                        Whether you're a tech enthusiast, a developer, or a business leader, Tech Discovery is your go-to source for industry insights and trends.
                    </p>
                    <a
                        href="mailto:support@techdiscovery.com"
                        className="inline-block mt-6 bg-white text-primary font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-gray-200 transition"
                    >
                        Contact Us
                    </a>
                </section>

            </div>

        </div>
    );
};

export default AboutUs;
