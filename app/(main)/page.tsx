import CollegeGallery from "@/component/ui/CollegeGallery";
import CollegeSection from "@/component/ui/CollegeSection";
import { DynamicReviews } from "@/component/ui/DynamicReviews";
import Hero from "@/component/ui/Hero";
import ResearchPaper from "@/component/ui/ResearchPaper";





export default function Home() {
  return (
    <>
     
    {/* <Navbar /> */}
 <Hero />


  
      <div>
        <CollegeSection />
      </div>

   <div>

    <DynamicReviews />
   </div>
   <div>
    <CollegeGallery />

   </div>
   <div>
    <ResearchPaper />
   </div>
    </>
 
  );
}
