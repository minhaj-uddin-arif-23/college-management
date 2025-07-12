/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const colleges = await db.collection("homecollege").find({}).toArray();

    return NextResponse.json(colleges);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 });
  }
}
