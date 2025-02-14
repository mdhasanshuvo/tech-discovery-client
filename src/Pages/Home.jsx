import { Helmet } from 'react-helmet';
import BannerSlider from '../Components/Banner';
import FeaturedProducts from '../Components/FeaturedProducts';
import TrendingProducts from '../Components/TrendingProducts';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | Tech Discovery</title>
            </Helmet>
            <BannerSlider></BannerSlider>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
        </>
    );
};

export default Home;