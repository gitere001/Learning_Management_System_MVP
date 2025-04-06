import React from 'react';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ActionButtons = () => {
  const navigate = useNavigate()
  return (

    <div className="flex flex-wrap gap-4 mb-8">
      <button onClick={()=> navigate('/admin-dashboard/add-new-course')} className="lms-button-primary flex items-center">
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
