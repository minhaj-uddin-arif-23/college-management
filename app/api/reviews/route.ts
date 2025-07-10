import { connectToDatabase } from '@/lib/mongodb'
import { NextResponse } from 'next/server';

export async function GET() {
  const { db } = await connectToDatabase();

  const reviews = await db.collection('reviews').aggregate([
    {
      $lookup: {
        from: 'admissions',
        localField: 'admissionId',
        foreignField: '_id',
        as: 'admission'
      }
    },
    { $unwind: '$admission' }, // Make the admission object usable directly
    { $sort: { createdAt: -1 } },
    { $limit: 6 },
    {
      $project: {
        _id: 1,
        reviewText: 1,
        rating: 1,
        createdAt: 1,
        collegeName: '$admissions.college' // Change this based on actual field name
      }
    }
  ]).toArray();

  return NextResponse.json(reviews);
}
