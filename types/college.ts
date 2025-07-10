export interface CollegeType {
  _id?: string;
  name: string;
  image: string;
  admissionDate: string;
  admissionProcess: string;
  events: string[];
  researchWorks: {
    title: string;
    link: string;
  }[];
  researchCount: number;
  sports: string[];
}