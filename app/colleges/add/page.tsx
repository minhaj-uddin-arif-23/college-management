"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function AddCollegePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    admissionDate: "",
    admissionProcess: "",
    events: "",
    researchWorks: "",
    researchCount: 0,
    sports: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      events: formData.events.split(","),
      sports: formData.sports.split(","),
      researchWorks: formData.researchWorks
        .split("\n")
        .map((line) => {
          const [title, link] = line.split("|");
          return { title, link };
        }),
      researchCount: parseInt(String(formData.researchCount), 10),
    };

    const res = await fetch("/api/colleges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success("College Added!");
      router.push("/colleges");
    } else {
      toast.error("Error adding college");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Add New College</h1>
        <div className="space-y-4">
          <Input
            name="name"
            placeholder="College Name"
            onChange={handleChange}
            required
            className="w-full"
          />
          <Input
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
            required
            className="w-full"
          />
          <Input
            type="date"
            name="admissionDate"
            onChange={handleChange}
            required
            className="w-full"
          />
          <Textarea
            name="admissionProcess"
            placeholder="Admission Process"
            onChange={handleChange}
            required
            className="w-full"
          />
          <Input
            name="events"
            placeholder="Events (comma separated)"
            onChange={handleChange}
            className="w-full"
          />
          <Textarea
            name="researchWorks"
            placeholder="Title|Link (each line)"
            onChange={handleChange}
            className="w-full"
          />
          <Input
            type="number"
            name="researchCount"
            placeholder="Research Count"
            onChange={handleChange}
            className="w-full"
          />
          <Input
            name="sports"
            placeholder="Sports (comma separated)"
            onChange={handleChange}
            className="w-full"
          />
          <Button type="submit" className="w-full cursor-pointer">
            Add College
          </Button>
        </div>
      </form>
    </div>
  );
}