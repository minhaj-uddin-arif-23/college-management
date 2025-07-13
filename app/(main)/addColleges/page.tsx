import AddCollegePage from '@/app/colleges/add/page'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "CampusBondhu | addCollege ",
  description: "CampusBondhu home page",
};

export default function AddColleges() {
  return (
    <div>
      <AddCollegePage />
    </div>
  )
}
