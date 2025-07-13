import AdmissionTest from '@/component/ui/Admission'

import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "CampusBondhu | addMission ",
  description: "CampusBondhu home page",
};
export default function Admission() {
  return (
    <div>
      <AdmissionTest />
    </div>
  )
}
