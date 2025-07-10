
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server"; // Clerk authentication
import { connectToDatabase } from "@/lib/mongodb";

export default async function MyCollege() {
  const { userId } = await auth(); // Get the authenticated user's ID
  const { db } = await connectToDatabase();

  // Check if user is authenticated
  if (!userId) {
    return <div className="container mx-auto p-4">Please log in to view your admissions.</div>;
  }

  // Fetch admissions based on user's ID
  const admissions = await db
    .collection("admissions")
    .find({ userId }) // Use userId from Clerk
    .toArray();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My College Admissions</h1>
      {admissions.length === 0 ? (
        <p className="text-gray-500">No admissions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {admissions.map((admission) => (
            <Card key={admission._id.toString()} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">
                  {admission.college}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Candidate Name:</strong> {admission.candidateName}</p>
                <p><strong>Subject:</strong> {admission.subject}</p>
                <p><strong>Email:</strong> {admission.email}</p>
                <p><strong>Phone:</strong> {admission.phone}</p>
                <p><strong>Address:</strong> {admission.address}</p>
                <p><strong>Date of Birth:</strong> {new Date(admission.dob).toLocaleDateString()}</p>
                <p><strong>Submitted At:</strong> {new Date(admission.submittedAt).toLocaleString()}</p>
                <Button variant="outline" className="mt-2">
                  View Image
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
