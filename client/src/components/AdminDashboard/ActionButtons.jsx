import React from 'react';
import { PlusCircle } from 'lucide-react';

const ActionButtons = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <button className="lms-button-primary flex items-center">
        <PlusCircle className="mr-2" size={18} />
        Add New Course
      </button>
      <button className="lms-button-accent flex items-center">
        <PlusCircle className="mr-2" size={18} />
        Add New Admin
      </button>
    </div>
  );
};

export default ActionButtons;
