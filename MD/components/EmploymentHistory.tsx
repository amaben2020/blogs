import React from "react";
const employment = [
  {
    company: "Company One",
    role: "UX Engineer",
  },
  {
    company: "Company Two",
    role: "Gatsby Developer",
  },
];
const EmploymentHistory = () => (
  <div className="text-left max-w-xl mx-auto">
    <div className="grid grid-cols-2 gap-2 mt-5">
      {employment.map(({ role, company }) => (
        <>
          <div className="flex justify-end font-
           bold"><p>{role}</p></div>
          <p style={{ color: 'green' }}>{company}</p>
        </>

      ))}
    </div>
  </div>
);
export default EmploymentHistory;