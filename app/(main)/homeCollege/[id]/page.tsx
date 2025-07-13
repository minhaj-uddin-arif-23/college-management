import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, GraduationCap } from 'lucide-react';
import type { NextPage } from 'next';

// Define the expected props type
interface HomeCollegeProps {
  params: Promise<{ id: string }>;
}

// Use NextPage for proper type inference
const HomeCollegeDetails: NextPage<HomeCollegeProps> = async ({ params }) => {
  // Await the params to resolve the Promise
  const resolvedParams = await params;
  const { db } = await connectToDatabase();
  const homeCollege = await db.collection('homecollege').findOne({
    _id: new ObjectId(resolvedParams.id),
  });

  if (!homeCollege) return notFound();

  return (
    <main className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
      <h1 className="text-4xl font-semibold text-purple-600 mb-6">{homeCollege.name}</h1>

      {/* Image */}
      <div className="relative w-full h-72 rounded-lg overflow-hidden mb-6">
        {homeCollege.image ? (
          <Image
            src={homeCollege.image}
            alt={homeCollege.name}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Admission info */}
      <section className="mb-6 space-y-3">
        <p className="flex items-center gap-2 text-gray-700 text-lg">
          <Calendar className="w-5 h-5 text-indigo-500" />
          Admission Date: <span className="font-semibold">{homeCollege.admissionDate}</span>
        </p>

        <p className="flex items-center gap-2 text-gray-700 text-lg">
          <GraduationCap className="w-5 h-5 text-indigo-500" />
          Admission Process: <span className="font-semibold">{homeCollege.admissionProcess}</span>
        </p>
      </section>

      {/* Sections */}
      <section className="mb-6">
        {/* Events */}
        {homeCollege.events?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Events</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {homeCollege.events.map((event: string, i: number) => (
                <li key={i}>{event}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Research Works */}
        {homeCollege.researchWorks?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Research Works</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {homeCollege.researchWorks.map((work: string, i: number) => (
                <li key={i}>{work}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Sports */}
        {homeCollege.sports?.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Sports</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {homeCollege.sports.map((sport: string, i: number) => (
                <li key={i}>{sport}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Back to Colleges
        </Link>
      </div>
    </main>
  );
};

export default HomeCollegeDetails;