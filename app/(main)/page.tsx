import { DynamicReviews } from "@/component/ui/DynamicReviews";
import ResearchPaper from "@/component/ui/ResearchPaper";




export default function Home() {
  return (
    <>
     
    {/* <Navbar /> */}
    <section className="relative h-screen bg-[url('/bg.jpg')] bg-cover bg-center pt-24 flex items-center justify-center text-white  top-0 left-0 w-full z-20  bg-transparent">
      <div className="text-center px-4 z-10">
        <h1 className="text-5xl font-bold mb-4 text-blue-500">Welcome to CampusBondhu</h1>
        <p className="text-lg max-w-xl mx-auto">
          Your trusted guide to college admissions, services, and more!
        </p>
      </div>

      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black/10 z-0" />
    </section>
  
   <div>
    <DynamicReviews />
   </div>
   <div>
    <ResearchPaper />
   </div>
    </>
 
  );
}
