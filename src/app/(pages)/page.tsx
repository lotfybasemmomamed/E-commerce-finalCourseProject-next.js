import HomeProducts from "./_homecomponent/HomeProducts";
import SwiperSection from "./_homecomponent/SwiperSection";

export default function Home() {
  return (
      <div className="container">
        <div className="mb-5 mt-24">
          <SwiperSection />
        </div>
        <div>
          <HomeProducts />
        </div>
      </div>
  );
}
