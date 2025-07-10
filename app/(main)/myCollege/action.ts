/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

// import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { auth } from "@clerk/nextjs/server";

export async function addReview(prevState: any, formData: FormData) {
  const { userId } = await auth();
  const { db } = await connectToDatabase();

  if (!userId) {
    return { message: "Please log in to submit a review." };
  }
  const admissionId = formData.get("admissionId") as string;
  const reviewText = formData.get("review") as string;
  const rating = parseInt(formData.get("rating") as string, 10);

  if (  !admissionId || !reviewText || !rating || isNaN(rating)) {
    return { message: "All fields are required for review, and rating must be a number." };
  }

  const reviewData = {
    
    admissionId: new ObjectId(admissionId),
    userId,
    reviewText,
    rating,
    createdAt: new Date(),
  };

  await db.collection("reviews").insertOne(reviewData);
  return { message: "Review added successfully!" };
}
