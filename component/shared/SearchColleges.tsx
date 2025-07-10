"use client";
import { useState, useEffect } from "react";

type College = {
  name: string;
  // add other properties if needed
};

interface SearchCollegesProps {
  allColleges: College[];
  setFiltered: (colleges: College[]) => void;
}

export default function SearchColleges({ allColleges, setFiltered }: SearchCollegesProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query === "") {
      setFiltered(allColleges);
    } else {
      const filtered = allColleges.filter(college =>
        college.name.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(filtered);
    }
  }, [query]);

  return (
    <input
      type="text"
      placeholder="Search College..."
      className="w-full p-2 border rounded mb-4"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
