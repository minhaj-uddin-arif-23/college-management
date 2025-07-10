"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useActionState } from "react";
import { addReview } from '@/app/(main)/myCollege/action';

interface AdmissionCardProps {
  admission: {
    _id: string;
    college: string;
    candidateName: string;
    subject: string;
    email: string;
    phone: string;
    address: string;
    dob: string;
    submittedAt: string;
  };
}

export default function AdmissionCard({ admission }: AdmissionCardProps) {
  const [rating, setRating] = useState(0);
  const [state, formAction] = useActionState(addReview, { message: "" });

  return (
    <Card key={admission._id} className="shadow-md">
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

        {/* Review Form */}
        <form action={formAction} className="mt-4 space-y-4">
          <input type="hidden" name="admissionId" value={admission._id} />
          <div>
            <Label htmlFor={`review-${admission._id}`}>Add Review</Label>
            <Textarea
              id={`review-${admission._id}`}
              name="review"
              placeholder="Write your review here..."
              required
            />
          </div>
          <div>
            <Label htmlFor={`rating-${admission._id}`}>Rating</Label>
            <Rating
              value={rating}
              onChange={setRating}
              style={{ maxWidth: 180 }}
              // itemStyles={{
              //   itemShapes:1,
              //   activeFillColor: "#f59e0b",
              //   inactiveFillColor: "#d1d5db",
              // }}
            />
            <input type="hidden" name="rating" value={rating.toString()} />
          </div>
          <Button type="submit">Submit Review</Button>
          {state.message && <p className="text-red-500">{state.message}</p>}
        </form>
      </CardContent>
    </Card>
  );
}