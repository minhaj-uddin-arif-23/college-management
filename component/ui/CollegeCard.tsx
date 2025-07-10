"use client";
import Image from 'next/image';
import Link from 'next/link';

interface College {
  _id: string;
  name: string;
  image?: string;
  admissionDate: string;
  events: string[];
  researchCount: number;
  sports: string[];
}

interface CollegeCardProps {
  college?: College;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  if (!college) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <Image
        src={college.image || "/default-college.jpg"}
        alt={college.name}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold">{college.name}</h2>
        <p>📅 Admission: {college.admissionDate}</p>
        <p>🎉 Events: {college.events.join(', ')}</p>
        <p>📚 Researches: {college.researchCount}</p>
        <p>⚽ Sports: {college.sports.join(', ')}</p>
        <Link href={`/admission/${college._id}`}>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}
