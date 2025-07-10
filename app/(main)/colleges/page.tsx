/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import toast from "react-hot-toast";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Colleges() {
  const { data, error, isLoading } = useSWR("/api/colleges", fetcher);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  if (isLoading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error loading colleges.</p>;

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return url.startsWith("/");
    }
  };

  const filteredColleges = data?.filter((college: any) =>
    college.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Colleges</h1>

      {filteredColleges?.length === 0 && (
        <p className="text-center text-gray-500">No colleges found for &rdquo;{searchTerm}&rdquo;</p>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredColleges?.map((college: any) => {
          const admissionDate = new Date(college.admissionDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          const researchCount = college.researchWorks?.length || 0;

          return (
            <div
              key={college._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <Image
                src={
                  college.image && isValidImageUrl(college.image)
                    ? college.image
                    : "/default.jpg"
                }
                alt={college.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                  {college.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  <strong>Admission Date:</strong> {admissionDate}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Research Count:</strong> {researchCount}
                </p>
                <Button
                  variant={"link"}
                  className="border-2 cursor-pointer"
                  onClick={() => toast(`Details for ${college.name}`)}
                >
                  Details
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
