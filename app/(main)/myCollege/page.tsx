
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import AdmissionCard from '@/component/ui/AdmissionCard';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "CampusBondhu | My College ",
  description: "CampusBondhu my college page",
};
export default async function MyCollege() {
  const { userId } = await auth();
  const { db } = await connectToDatabase();

  if (!userId) {
    return <div className="container mx-auto p-4">Please log in to view your admissions.</div>;
  }

  const admissions = await db
    .collection("admissions")
    .find({ userId })
    .toArray();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My College Admissions</h1>
      {admissions.length === 0 ? (
        <p className="text-gray-500">No admissions found.</p>
      ) : (
        <div className="space-y-6">
          {admissions.map((admission) => (
            <AdmissionCard
              key={admission._id.toString()}
              admission={{
                _id: admission._id.toString(),
                college: admission.college,
                candidateName: admission.candidateName,
                subject: admission.subject,
                email: admission.email,
                phone: admission.phone,
                address: admission.address,
                dob: admission.dob,
                submittedAt: admission.submittedAt,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
