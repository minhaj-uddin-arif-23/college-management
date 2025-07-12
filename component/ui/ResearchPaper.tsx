"use client";
import React, { useState } from "react";
import { FaRobot, FaLink, FaBook, FaArrowLeft, FaArrowRight, FaLock, FaGamepad, FaBrain, FaNetworkWired, FaVrCardboard, FaChalkboardTeacher, FaComments, FaChartLine, FaCloud, FaUserGraduate } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ResearchPaper {
  id: string;
  title: string;
  link: string;
  author: string;
  topic: string;
}

const researchPapers: ResearchPaper[] = [
  { id: "1", title: "AI in Education: Future Scope", link: "https://arxiv.org/abs/2301.08789", author: "John Doe", topic: "AI" },
  { id: "2", title: "Blockchain for Secure Academic Records", link: "https://www.sciencedirect.com/science/article/pii/S1877050920311390", author: "Jane Smith", topic: "Blockchain" },
  { id: "3", title: "Machine Learning in Student Performance Prediction", link: "https://arxiv.org/abs/2105.09304", author: "Michael Johnson", topic: "ML" },
  { id: "4", title: "A Review of E-Learning Platforms in Post-COVID Education", link: "https://www.researchgate.net/publication/351731647", author: "Sophia Lin", topic: "E-Learning" },
  { id: "5", title: "NLP in Automated Essay Scoring", link: "https://aclanthology.org/2022.bea-1.11/", author: "Amit Raj", topic: "NLP" },
  { id: "6", title: "IoT-based Smart Classrooms: An Overview", link: "https://ieeexplore.ieee.org/document/9357750", author: "Li Wei", topic: "IoT" },
  { id: "7", title: "Data Privacy in Online Education Systems", link: "https://www.mdpi.com/2227-7390/9/14/1625", author: "Emma Brown", topic: "Privacy" },
  { id: "8", title: "Gamification Strategies in Higher Education", link: "https://link.springer.com/article/10.1007/s11528-020-00510-7", author: "Carlos Ramirez", topic: "Gamification" },
  { id: "9", title: "Ethical Implications of AI Tutors in Classrooms", link: "https://www.frontiersin.org/articles/10.3389/feduc.2021.671472/full", author: "Fatima Noor", topic: "AI" },
  { id: "10", title: "Dropout Prediction Using Neural Networks", link: "https://arxiv.org/abs/1903.01094", author: "Oliver Hughes", topic: "ML" },
  { id: "11", title: "Adaptive Learning with Reinforcement Algorithms", link: "https://arxiv.org/abs/2006.15460", author: "Nina Chen", topic: "AI" },
  { id: "12", title: "Cybersecurity in E-Learning Environments", link: "https://ieeexplore.ieee.org/document/8894243", author: "Daniel Alaminos", topic: "Cybersecurity" },
  { id: "13", title: "VR and AR in Modern Classrooms", link: "https://www.sciencedirect.com/science/article/pii/S0360131520301883", author: "Sarah Khan", topic: "VR/AR" },
  { id: "14", title: "MOOCs: Transforming the Higher Education Landscape", link: "https://link.springer.com/article/10.1007/s10639-020-10358-2", author: "Hassan El-Sayed", topic: "E-Learning" },
  { id: "15", title: "Using Chatbots to Support University Students", link: "https://arxiv.org/abs/2102.09384", author: "Laila Patel", topic: "Chatbots" },
  { id: "16", title: "Sentiment Analysis on Student Feedback", link: "https://aclanthology.org/2020.lrec-1.866/", author: "Tomás Silva", topic: "NLP" },
  { id: "17", title: "Predictive Analytics for Admission Systems", link: "https://arxiv.org/abs/2003.08352", author: "Emily Watson", topic: "Analytics" },
  { id: "18", title: "Edge Computing for Campus Networks", link: "https://ieeexplore.ieee.org/document/8736011", author: "Jin Park", topic: "Edge Computing" },
  { id: "19", title: "Big Data in Curriculum Personalization", link: "https://www.mdpi.com/2076-3417/10/17/5946", author: "Ravi Narayan", topic: "Big Data" },
  { id: "20", title: "Emotion AI for Adaptive Teaching Systems", link: "https://www.frontiersin.org/articles/10.3389/frai.2021.676287/full", author: "Nora Ahmed", topic: "AI" },
  { id: "21", title: "Leveraging AI to Detect Plagiarism in Academia", link: "https://arxiv.org/abs/2106.01994", author: "Anika Roy", topic: "AI" },
  { id: "22", title: "Digital Credentials with Blockchain Verification", link: "https://www.sciencedirect.com/science/article/pii/S1877050919318086", author: "David Kim", topic: "Blockchain" },
  { id: "23", title: "Real-Time Feedback Systems Using NLP for Learning", link: "https://aclanthology.org/2021.bea-1.12/", author: "Maya Patel", topic: "NLP" },
  { id: "24", title: "Cloud-Based LMS Performance Optimization", link: "https://ieeexplore.ieee.org/document/8665002", author: "Satoshi Tanaka", topic: "Cloud" },
  { id: "25", title: "Learning Analytics for At-Risk Student Identification", link: "https://www.frontiersin.org/articles/10.3389/feduc.2022.875214/full", author: "Isabella Green", topic: "Analytics" },
  { id: "26", title: "AI-Driven Adaptive Quizzing Systems", link: "https://arxiv.org/abs/1912.01876", author: "Rahul Sen", topic: "AI" },
  { id: "27", title: "Facial Emotion Recognition in Virtual Classrooms", link: "https://www.mdpi.com/2079-9292/10/14/1685", author: "Layla Hassan", topic: "AI" },
  { id: "28", title: "Using Predictive Models for Graduate Success", link: "https://www.researchgate.net/publication/354201213", author: "Victor Mendes", topic: "Analytics" },
  { id: "29", title: "Multilingual Chatbots for International Students", link: "https://arxiv.org/abs/2103.09856", author: "Chen Li", topic: "Chatbots" },
  { id: "30", title: "Integrating AI and Human Tutors: A Hybrid Model", link: "https://www.frontiersin.org/articles/10.3389/feduc.2023.987654/full", author: "Olivia Martin", topic: "AI" },
];

const ITEMS_PER_PAGE = 7;

const ResearchPapers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(researchPapers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = researchPapers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Map topics to icons
  const getTopicIcon = (topic: string) => {
    switch (topic) {
      case "AI":
      case "ML":
        return <FaRobot className="text-blue-500 text-lg" />;
      case "Blockchain":
        return <FaLock className="text-green-500 text-lg" />;
      case "NLP":
        return <FaComments className="text-purple-500 text-lg" />;
      case "IoT":
        return <FaNetworkWired className="text-teal-500 text-lg" />;
      case "Privacy":
      case "Cybersecurity":
        return <FaLock className="text-red-500 text-lg" />;
      case "Gamification":
        return <FaGamepad className="text-yellow-500 text-lg" />;
      case "VR/AR":
        return <FaVrCardboard className="text-indigo-500 text-lg" />;
      case "E-Learning":
        return <FaChalkboardTeacher className="text-blue-600 text-lg" />;
      case "Chatbots":
        return <FaComments className="text-orange-500 text-lg" />;
      case "Analytics":
        return <FaChartLine className="text-cyan-500 text-lg" />;
      case "Edge Computing":
      case "Cloud":
        return <FaCloud className="text-gray-500 text-lg" />;
      case "Big Data":
        return <FaBrain className="text-pink-500 text-lg" />;
      default:
        return <FaBook className="text-gray-500 text-lg" />;
    }
  };

  return (
    <section className="py-12 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-blue-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
         📚 Recommended Research Papers
        </motion.h2>

        <motion.ul
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {currentItems.map((paper) => (
              <motion.li
                key={paper.id}
                className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    {getTopicIcon(paper.topic)} {paper.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                    <FaUserGraduate className="text-gray-500" /> By: {paper.author}
                  </p>
                </div>
                <Button variant={'link'}>
                  <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-sm border-2 border-purple-100 px-4 py-2 rounded-lg w-fit flex  gap-2  transition-colors duration-200"
                >
                  <FaLink /> Read Full Paper
                </a>
                </Button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-12">
          <motion.button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-5 py-2 text-sm bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 flex items-center gap-2 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Previous
          </motion.button>

          {Array.from({ length: totalPages }, (_, i) => (
            <motion.button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 text-sm rounded-full ${
                currentPage === i + 1
                  ? "bg-purple-600 text-white"
                  : "bg-white border text-gray-700 hover:bg-blue-100"
              } transition-colors duration-200`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {i + 1}
            </motion.button>
          ))}

          <motion.button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-5 py-2 text-sm bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 flex items-center gap-2 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next <FaArrowRight />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ResearchPapers;