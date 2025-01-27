import BannerSlider from '../Components/Banner';
import FeaturedProducts from '../Components/FeaturedProducts';
import TrendingProducts from '../Components/TrendingProducts';

const Home = () => {
    return (
        <>
            <BannerSlider></BannerSlider>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
        </>
    );
};

export default Home;