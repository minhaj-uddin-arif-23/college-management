/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function CollegeDetails({ params }: Props) {
  const { db } = await connectToDatabase();

  const college = await db.collection("colleges").findOne({
    _id: new ObjectId(params.id),
  });

  if (!college) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-violet-700">{college.name}</h1>

      {/* Image */}
      <div className="w-full h-64 mb-6 relative">
        <Image
          src={
            college.image?.startsWith("http") || college.image?.startsWith("/")
              ? college.image
              : "/default.jpg"
          }
          alt={college.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Admission Process */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Admission Process</h2>
        <p className="text-gray-700">{college.admissionProcess}</p>
      </div>

      {/* Events */}
      {college.events?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Events</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {college.events.map((event: string, i: number) => (
              <li key={i}>{event}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Research Works */}
      {college.researchWorks?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Research Works</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {college.researchWorks.map((research: any, i: number) => (
              <li key={i}>Research Count: {research.researchCount}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Sports */}
      {college.sports?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Sports</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {college.sports.map((sport: string, i: number) => (
              <li key={i}>{sport}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
