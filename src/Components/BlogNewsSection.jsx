import React from 'react';
import ai from "../assets/ai.jpg"
import video from "../assets/video.jpg"
import phone from "../assets/phone.jpg"

const BlogNewsSection = () => {
    const newsArticles = [
        {
            title: 'New AI Tool Revolutionizes Web Development',
            description: 'Discover how this cutting-edge AI tool is transforming the way developers build websites and applications...',
            image: ai,
            link: 'https://owdt.com/insight/best-ai-tools-for-web-design-boosting-innovation-and-user-experience/',
            date: 'February 19, 2025',
        },
        {
            title: 'Introducing the Next Generation of Smart Phones',
            description: 'The latest smartphones are here with unprecedented features, performance, and design. Check out what’s new...',
            image: phone,
            link: "https://pages.boreas.ca/blog/piezo-haptics/next-gen-phones-what-the-smartphones-of-the-future-look-like",
            date: 'February 18, 2025',
        },
        {
            title: 'Major Software Update for Popular Video Editing App',
            description: 'Learn about the new features added to this popular video editing app, including advanced AI-powered tools...',
            image: video,
            link: "https://www.techradar.com/best/best-video-editing-apps",
            date: 'February 17, 2025',
        },
    ];

    return (
        <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
            <h2 className="text-3xl font-bold text-center text-primary mb-8">Latest Tech News & Product Launches</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsArticles.map((article, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src={article.image}
                            alt="News Thumbnail"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">{article.title}</h3>
                            <p className="text-gray-500 mb-4">{article.description}</p>
                            <a target='_blank' href={article.link} className="text-blue-600 hover:underline">Read More</a>
                            <p className="text-gray-500 text-sm mt-4">{article.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogNewsSection;
