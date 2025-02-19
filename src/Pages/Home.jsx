import { Helmet } from 'react-helmet';
import BannerSlider from '../Components/Banner';
import FeaturedProducts from '../Components/FeaturedProducts';
import TrendingProducts from '../Components/TrendingProducts';
import FAQSection from '../Components/FAQSection';
import TestimonialSection from '../Components/TestimonialSection';
import HowItWorks from '../Components/HowItWorks';

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
            <TestimonialSection></TestimonialSection>
            <FAQSection></FAQSection>
        </>
    );
};

export default Home;