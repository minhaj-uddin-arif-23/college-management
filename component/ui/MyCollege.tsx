
// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Rating } from '@smastrom/react-rating';
// import '@smastrom/react-rating/style.css';
// import { auth } from "@clerk/nextjs/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import { ObjectId } from "mongodb";
// import { useActionState } from "react"; // For form state management
// // import { addReview } from "./actions"; // Import the server action

// export default async function MyCollege() {
//   const { userId } = await auth();
//   const { db } = await connectToDatabase();

//   if (!userId) {
//     return <div className="container mx-auto p-4">Please log in to view your admissions.</div>;
//   }

//   const admissions = await db
//     .collection("admissions")
//     .find({ userId })
//     .toArray();

//   // Note: useActionState cannot be used directly in a server component. We'll handle form state client-side.
//   // For now, we'll render the form and handle state client-side where needed.

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">My College Admissions</h1>
//       {admissions.length === 0 ? (
//         <p className="text-gray-500">No admissions found.</p>
//       ) : (
//         <div className="space-y-6">
//           {admissions.map((admission) => {
//             const [rating, setRating] = useState(0); // Client-side state for rating
//             const [state, formAction] = useActionState(addReview, { message: "" });

//             return (
//               <Card key={admission._id.toString()} className="shadow-md">
//                 <CardHeader>
//                   <CardTitle className="text-lg">
//                     {admission.college}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-2">
//                   <p><strong>Candidate Name:</strong> {admission.candidateName}</p>
//                   <p><strong>Subject:</strong> {admission.subject}</p>
//                   <p><strong>Email:</strong> {admission.email}</p>
//                   <p><strong>Phone:</strong> {admission.phone}</p>
//                   <p><strong>Address:</strong> {admission.address}</p>
//                   <p><strong>Date of Birth:</strong> {new Date(admission.dob).toLocaleDateString()}</p>
//                   <p><strong>Submitted At:</strong> {new Date(admission.submittedAt).toLocaleString()}</p>
//                   <Button variant="outline" className="mt-2">
//                     View Image
//                   </Button>

//                   {/* Review Form */}
//                   <form action={formAction} className="mt-4 space-y-4">
//                     <input type="hidden" name="admissionId" value={admission._id.toString()} />
//                     <div>
//                       <Label htmlFor={`review-${admission._id}`}>Add Review</Label>
//                       <Textarea
//                         id={`review-${admission._id}`}
//                         name="review"
//                         placeholder="Write your review here..."
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor={`rating-${admission._id}`}>Rating</Label>
//                       <Rating
//                         value={rating}
//                         onChange={setRating}
//                         style={{ maxWidth: 180 }} // Use style prop instead of itemStyles
//                         itemStyles={{
//                           activeFillColor: "#f59e0b",
//                           inactiveFillColor: "#d1d5db",
//                         }}
//                       />
//                       <input type="hidden" name="rating" value={rating.toString()} />
//                     </div>
//                     <Button type="submit">Submit Review</Button>
//                     {state.message && <p className="text-red-500">{state.message}</p>}
//                   </form>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
