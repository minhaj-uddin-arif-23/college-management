/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import useSWR from "swr";
import gsap from "gsap";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function DynamicReviews() {
  const { data: reviews } = useSWR('/api/reviews', fetcher, { refreshInterval: 10000 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !reviews?.length) return;

    const container = containerRef.current;
    const totalWidth = container.scrollWidth;
    const visibleWidth = container.offsetWidth;
    const scrollDistance = totalWidth - visibleWidth;

    const tween = gsap.to(container, {
      x: `-${scrollDistance}px`,
      duration: 15,
      ease: "linear",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      tween.kill();
    };
  }, [reviews]);

  if (!reviews) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <section className="container mx-auto px-4 py-10 bg-white rounded-xl shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet.</p>
      ) : (
        <div className="relative overflow-hidden">
          <div
            className="flex space-x-6"
            ref={containerRef}
            style={{ willChange: 'transform' }}
          >
            {reviews.map((review: any) => (
              <Card
                key={review._id}
                className="min-w-[300px] max-w-sm flex-shrink-0 bg-white border border-gray-200 shadow-md rounded-xl p-4"
              >
                <CardHeader>
                  <CardTitle className="text-indigo-700">Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-700">
                  <p><strong>Review:</strong> {review.reviewText}</p>
                  <p><strong>Rating:</strong> {review.rating} / 5</p>
                  <p className="text-sm text-gray-400">
                    <strong>Date:</strong> {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
