import React from 'react';

const StatCard = ({
  title,
  value,
  icon,
  iconBgColor,
  iconColor = 'white',
  className,
}) => {
  return (
    <div className={`stat-card ${className}`}>
      <div
        className="stat-icon"
        style={{ backgroundColor: iconBgColor, color: iconColor }}
      >
        {icon}
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default StatCard;
