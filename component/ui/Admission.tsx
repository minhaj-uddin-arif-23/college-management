"use client"
import React, { useState, useActionState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import toast from 'react-hot-toast';
import { action } from '@/app/(main)/admission/actions';

const colleges = [
  "Institute of Global Management & Information System",
  "Marine Academy School & College",
  "Government Hazi Mohammad Mohsin College",
  "Ispahani Public School & College",
  "Halishahar Cantonment Public School & College",
  "Chattagong Bandar College",
  "Nou Bahini School & College",
  "BEPZA Public School and College",
  "Hazera-Taju Degree College",
  "Government College of Commerce, Chattagong",
  "Agrabad Mohila College",
  "Chattagong Government Model School and College",
  "Government City College, Chattagong",
  "Patharghata Girls College",
  "Omargani M.E.S. College",
  "Chattagong Govt. Women's College",
  "Barrister Sultan Ahmad Chowdhury College",
  "Bangladesh Women's Association School & College",
  "Islamia Degree College",
  "J.M. Sen College",
  "Dr. Fazlul Hazera College",
  "Chattagong Engineering University School and College",
  "Chattagong Public School & College",
  "B.A.F Shaheen College",
  "Sitakund Degree College",
  "Latifa Siddiqi Degree College",
  "Faujdarhat Cadet College",
  "Pahartali College",
  "Hathazari Government College",
  "Katirhat Girl's College",
  "Fatikchari Government University College",
  "Bhujpur National School & College",
  "Isapur B.M.C College",
  "Narayanhat Adarsha College",
  "Nanupur Laila Kabir College",
  "Gultaz Memorial School & College",
  "Heako Banani College",
  "Nazirhat College",
  "Quaish Burischar Sheikh Mohammad City Corporation College",
  "Fateyabad College",
  "Mirasarai College",
  "Nizampur Government College",
  "Baraiahat College",
  "Chattagong University College",
  "Rangunia College",
  "South Rangunia Padua College",
  "Rajanagar Ranirhat College",
  "North Rangunia College",
  "M. Shah Alam Chowdhury College",
  "Sir Ashotosh Govt. College",
  "Boalkhali Shirajul Islam Degree College",
  "Kadurkhil Jalil Ambia College",
  "Satkania Govt. College",
  "Al Helal Adarsa College",
  "North Satkania Jafar Ahmad Chowdhury College",
  "Alaol Degree College",
  "Banshkhali Degree College",
  "Anowara College",
  "Paschim Patia A.J. Chowdhury College",
  "Shah Mohsen Aulia College",
  "Gachbaria Govt. College",
  "Satbaria Oli Ahmed Bir Bikram College",
  "Barama College",
  "Bara Aulia Degree College",
  "Chunti Govt. Women College",
  "Alhaz Mostafizur Rahaman College",
  "Patiya Govt. College",
  "Hulain Saleh Nur Degree College",
  "Muzaffarabad Jasoda Nagendra Nandi Residential Girl's College",
  "Govt Hazi A.B. College",
  "Mustafizur Rahman College",
  "Raozan Government University College",
  "Noapara University College",
  "Kundeswari Girl's College",
  "Gohira Degree College",
  "Agrasar Girls College",
  "Imam Gazzali University College",
  "Cox's Bazar Govt. College",
  "Cox's Bazar Govt. Girl's College",
  "Chakoria College",
  "Maheshkhali College",
  "Kutubdia College",
  "Ramu College",
  "Eidgah Farid Ahmad College",
  "Ukhia College",
  "South Asian College, Chattagong",
  "Karnafuli College",
  "Kachalong College",
];

export default function AdmissionTest() {
  const [selectedCollege, setSelectedCollege] = useState("");
  const [state, formAction] = useActionState(action, { message: "" });

    useEffect(()=> {
      if(state.message){
        if(state.message === "All Fields are requires"){
          toast.error(state.message,{position :'top-right'});
        }else{
          toast.success(`Asmission to ${selectedCollege} submitted successfully!`,{position:'top-right'})
        }
      }
    },[state,selectedCollege])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admission</h1>

      {/* College Selection */}
      <div className="mb-6">
        <Label htmlFor="college " className='my-5'>Select College</Label>
        <Select onValueChange={setSelectedCollege} value={selectedCollege}>
          <SelectTrigger id="college" className="w-full">
            <SelectValue placeholder="Choose a college" />
          </SelectTrigger>
          <SelectContent>
            {colleges.map((college) => (
              <SelectItem key={college} value={college}>
                {college}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Admission Form */}
      {selectedCollege && (
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="college" value={selectedCollege} />
          <div>
            <Label htmlFor="candidateName">Candidate Name</Label>
            <Input id="candidateName" name="candidateName" required />
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" required />
          </div>
          <div>
            <Label htmlFor="email">Candidate Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="phone">Candidate Phone Number</Label>
            <Input id="phone" name="phone" type="tel" required />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" required />
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" name="dob" type="date" required />
          </div>
          <div>
            <Label htmlFor="image">Image</Label>
            <Input id="image" name="image" type="file" accept="image/*" required />
          </div>
          <Button type="submit">
            Submit
          </Button>
          {state.message && <p className="text-red-500">{state.message}</p>}
        </form>
      )}
    </div>
  );
}