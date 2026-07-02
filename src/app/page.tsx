import { Hero } from "@/components/hero";
import { Story } from "@/components/story";
import { MenuSection } from "@/components/menu-section";
import { ReviewsWall } from "@/components/reviews-wall";
import { FindUs } from "@/components/find-us";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <MenuSection />
      <ReviewsWall />
      <FindUs />
      <Footer />
    </>
  );
}
