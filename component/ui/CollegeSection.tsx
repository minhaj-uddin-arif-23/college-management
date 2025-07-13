/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Calendar, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface College {
  _id: string;
  name: string;
  image: string;
  admissionDate: string;
  admissionProcess: string;
  events: string[];
  researchWorks: string[];
  sports: string[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CollegeSection() {
  const { data, error, isLoading } = useSWR("/api/homecollege", fetcher);

  // Listen for search term from Navbar
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setSearchTerm(e.detail || "");
    };
    window.addEventListener("college-search", handler as EventListener);
    return () => {
      window.removeEventListener("college-search", handler as EventListener);
    };
  }, []);

  if (isLoading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-600">Error loading colleges.</p>
    );

  const filteredColleges = data?.filter((college: College) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return url.startsWith("/");
    }
  };

  return (
    <>
      <h1 className="flex justify-center items-center text-4xl text-purple-600 font-semibold my-10">
        College Data
      </h1>
      <section className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
        {(filteredColleges ?? data)?.map((college: any) => (
          <div
            key={college._id}
            className="bg-white shadow-md rounded-xl overflow-hidden transition-transform hover:scale-[1.02] flex flex-col h-full"
          >
            {/* Image */}
            <div className="relative group overflow-hidden h-48 sm:h-44 md:h-44 lg:h-48">
              {college.image && isValidImageUrl(college.image) ? (
                <Image
                  src={college.image}
                  alt={college.name}
                  width={500}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {college.name}
                </h2>

                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <span className="font-medium">{college.admissionDate}</span>
                </p>

                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-500" />
                  {college.admissionProcess}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                {college.events?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Events:</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.events.map((event: any, i: any) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {college.researchWorks?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">
                      Research:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {college.researchWorks.map((res: any, i: any) => (
                        <span
                          key={i}
                          className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {college.sports?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Sports:</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.sports.map((sport: any, i: any) => (
                        <span
                          key={i}
                          className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Button variant={"link"} className="border-2">
                    <Link href={`/homeCollege/${college._id}`}>Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Show a message if no results found */}
        {filteredColleges && filteredColleges.length === 0 && (
          <p className="col-span-full text-center text-gray-600 mt-10">
            No colleges found matching "{searchTerm}"
          </p>
        )}
      </section>
    </>
  );
}
