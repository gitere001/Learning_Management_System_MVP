import React from 'react'
import Greeting from './Greeting';
import ActionButtons from './ActionButtons';
import StatCard from './StatsCard'
import EnrollmentChart from './EnrollmentCarts'

import { BookOpen, Users, CreditCard, FileText } from 'lucide-react';

function DefaltDashboard() {
  return (
	<>
	 <Greeting />
      <ActionButtons />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Courses"
          value={42}
          icon={<BookOpen size={20} />}
          iconBgColor="#0069AA"
        />
        <StatCard
          title="Total Students"
          value={1254}
          icon={<Users size={20} />}
          iconBgColor="#4CAF50"
        />
        <StatCard
          title="Subscribed Courses"
          value={89}
          icon={<CreditCard size={20} />}
          iconBgColor="#FF9800"
        />
        <StatCard
          title="Certificates Generated"
          value={328}
          icon={<FileText size={20} />}
          iconBgColor="#E32726"
        />
      </div>

      <EnrollmentChart />
	</>
  )
}

export default DefaltDashboard