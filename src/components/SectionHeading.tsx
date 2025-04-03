
import React from 'react';
import { Link } from 'react-router-dom';

interface SectionHeadingProps {
  title: string;
  seeAllLink?: string;
}

const SectionHeading = ({ title, seeAllLink }: SectionHeadingProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-gray-800 font-semibold">{title}</h2>
      {seeAllLink && (
        <Link to={seeAllLink} className="text-medishare-blue text-sm">
          See All
        </Link>
      )}
    </div>
  );
};

export default SectionHeading;
