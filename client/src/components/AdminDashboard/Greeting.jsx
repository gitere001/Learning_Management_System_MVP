import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Greeting = () => {
  const [greeting, setGreeting] = useState('');
  const {  user } = useSelector((state) => state.authenication);
  console.log(user);

  useEffect(() => {
    const getCurrentGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        return 'Good morning';
      } else if (hour >= 12 && hour < 18) {
        return 'Good afternoon';
      } else {
        return 'Good evening';
      }
    };

    setGreeting(getCurrentGreeting());
  }, []);

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{greeting}, {user.firstName}</h1>
      <p className="text-gray-600">Here's what's happening with your platform today</p>
    </div>
  );
};

export default Greeting;
