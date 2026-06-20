import Navbar from "./Navbar";
import HeroSections from "./HeroSection";
import HowWorks from "./HowWorks";
import Unggulan from "./Unggulan";
import HargaTerkini from "./HargaTerkini";
import Blogs from "./Blogs";
import Components8 from "./Components8";
import Components10 from "./Components10";
import Components9 from "./Components9";
import ScrollComponents from "./ScrolComponents";
import Tantangan from "./Tantangan";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <HeroSections />
      <ScrollComponents />
      <Tantangan />
      <HowWorks />
      <Unggulan />
      <HargaTerkini />
      <Blogs />
      <Components8 />
      <Components10 />
      <Components9 />
    </div>
  );
}