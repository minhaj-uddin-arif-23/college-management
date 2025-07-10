/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server"; // Clerk authentication

export async function action(prevState: any, formData: FormData) {
  const { db } = await connectToDatabase();
  const { userId } = await auth(); // Get the authenticated user's ID

  // Check if user is authenticated
  if (!userId) {
    return { message: "Please log in to submit an admission." };
  }

  const college = formData.get("college") as string;
  const candidateName = formData.get("candidateName") as string;
  const subject = formData.get("subject") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const dob = formData.get("dob") as string;
  const image = formData.get("image") as File;

  // Validate inputs
  if (!candidateName || !subject || !email || !phone || !address || !dob || !image) {
    return { message: "All fields are required" };
  }

  // Handle image upload (e.g., save to cloud storage or base64 encode)
  const imageBuffer = await image.arrayBuffer();
  const imageBase64 = Buffer.from(imageBuffer).toString("base64");

  // Save to MongoDB
  const admissionData = {
    college,
    candidateName,
    subject,
    email,
    phone,
    address,
    dob,
    image: imageBase64,
    userId, // Link to Clerk userId
    submittedAt: new Date(),
  };

  await db.collection("admissions").insertOne(admissionData);

  // Redirect to "my-college" route after submission
  redirect("/myCollege");
}
