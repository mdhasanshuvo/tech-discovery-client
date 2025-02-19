import { Helmet } from 'react-helmet';
import BannerSlider from '../Components/Banner';
import FeaturedProducts from '../Components/FeaturedProducts';
import TrendingProducts from '../Components/TrendingProducts';
import FAQSection from '../Components/FAQSection';
import TestimonialSection from '../Components/TestimonialSection';
import HowItWorks from '../Components/HowItWorks';
import BlogNewsSection from '../Components/BlogNewsSection';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | Tech Discovery</title>
            </Helmet>
            <BannerSlider></BannerSlider>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <HowItWorks></HowItWorks>
            <BlogNewsSection></BlogNewsSection>
            <TestimonialSection></TestimonialSection>
            <FAQSection></FAQSection>
        </>
    );
};

export default Home;