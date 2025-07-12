// /* eslint-disable @typescript-eslint/no-unused-vars */
// // import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { School, Library, Users, Award, Globe, Microscope, Calendar, Heart } from "lucide-react";
// import Image from "next/image";

// const AboutUsPage = () => {
//   const features = [
//     {
//       icon: <School className="h-12 w-12 text-blue-600" />,
//       title: "World-Class Education",
//       description: "Our faculty delivers cutting-edge academic programs designed to prepare students for global challenges.",
//     },
//     {
//       icon: <Library className="h-12 w-12 text-blue-600" />,
//       title: "State-of-the-Art Facilities",
//       description: "Modern libraries, labs, and recreational centers to support holistic student development.",
//     },
//     {
//       icon: <Users className="h-12 w-12 text-blue-600" />,
//       title: "Vibrant Community",
//       description: "Join a diverse and inclusive campus culture that fosters lifelong connections.",
//     },
//     {
//       icon: <Award className="h-12 w-12 text-blue-600" />,
//       title: "Recognized Excellence",
//       description: "Accredited programs and award-winning faculty dedicated to your success.",
//     },
//     {
//       icon: <Globe className="h-12 w-12 text-blue-600" />,
//       title: "Global Opportunities",
//       description: "Study abroad programs and international partnerships to broaden your horizons.",
//     },
//     {
//       icon: <Microscope className="h-12 w-12 text-blue-600" />,
//       title: "Research Innovation",
//       description: "Cutting-edge research opportunities with world-renowned faculty and facilities.",
//     },
//   ];

//   const team = [
//     {
//       name: "Dr. Jane Smith",
//       role: "President",
//       image: "/images/team/jane-smith.jpg",
//     },
//     {
//       name: "Prof. John Doe",
//       role: "Dean of Academics",
//       image: "/images/team/john-doe.jpg",
//     },
//     {
//       name: "Dr. Emily Brown",
//       role: "Director of Research",
//       image: "/images/team/emily-brown.jpg",
//     },
//   ];

//   const history = [
//     { year: "1960", event: "College founded with a mission to provide accessible education." },
//     { year: "1985", event: "Expanded campus with state-of-the-art science labs." },
//     { year: "2000", event: "Received national accreditation for academic excellence." },
//     { year: "2020", event: "Launched global online learning platform." },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut" as const,
//       },
//     },
//   };

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
//             About Our College
//           </h2>
//           <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
//             Discover a place where innovation meets tradition, fostering an environment for academic excellence and personal growth.
//           </p>
//         </motion.div>

//         {/* Features Grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
//         >
//           {features.map((feature, index) => (
//             <motion.div key={index} variants={cardVariants}>
//               <Card className="h-full hover:shadow-lg transition-shadow duration-300">
//                 <CardHeader>
//                   <div className="flex justify-center mb-4">{feature.icon}</div>
//                   <CardTitle className="text-xl font-semibold text-center">
//                     {feature.title}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-600 text-center">{feature.description}</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Our Team Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="mt-16"
//         >
//           <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
//             Meet Our Leadership
//           </h3>
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
//           >
//             {team.map((member, index) => (
//               <motion.div key={index} variants={cardVariants}>
//                 <Card className="h-full hover:shadow-lg transition-shadow duration-300">
//                   <CardContent className="pt-6">
//                     <div className="flex justify-center">
//                       <Image
//                         src={member.image}
//                         alt={member.name}
//                         width={40} height={50}
//                         className="h-32 w-32 rounded-full object-cover"
//                       />
//                     </div>
//                     <h4 className="mt-4 text-xl font-semibold text-center">{member.name}</h4>
//                     <p className="text-gray-600 text-center">{member.role}</p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* History Timeline */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.6 }}
//           className="mt-16"
//         >
//           <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
//             Our History
//           </h3>
//           <div className="relative">
//             <div className="absolute h-full w-1 bg-blue-600 left-1/2 transform -translate-x-1/2"></div>
//             {history.map((item, index) => (
//               <motion.div
//                 key={index}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className={`flex items-center mb-8 ${
//                   index % 2 === 0 ? "flex-row" : "flex-row-reverse"
//                 }`}
//               >
//                 <div className="w-1/2 px-4">
//                   <Card className="p-4">
//                     <CardContent>
//                       <div className="flex items-center">
//                         <Calendar className="h-6 w-6 text-blue-600 mr-2" />
//                         <h4 className="text-lg font-semibold">{item.year}</h4>
//                       </div>
//                       <p className="text-gray-600 mt-2">{item.event}</p>
//                     </CardContent>
//                   </Card>
//                 </div>
//                 <div className="w-1/2"></div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Call to Action */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.8 }}
//           className="text-center mt-12"
//         >
//           <Button
//             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
//             asChild
//           >
//             <a href="/explore">Explore Our Campus</a>
//           </Button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutUsPage;