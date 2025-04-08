import React, { useState } from 'react';
import {
  FileText,
  CheckCircle,
  XCircle,
  Download,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import StatCard from './StatsCard';

const AdminCertificationsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'completedOn', direction: 'desc' });
  const [selectedTab, setSelectedTab] = useState('all');

  // Sample data - replace with actual API data
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      userName: 'John Doe',
      courseName: 'Introduction to React',
      completedOn: '2023-10-15',
      awarded: true,
      certificateId: 'CERT-001'
    },
    {
      id: 2,
      userName: 'Jane Smith',
      courseName: 'Advanced JavaScript',
      completedOn: '2023-11-20',
      awarded: false,
      certificateId: null
    },
    {
      id: 3,
      userName: 'Alex Johnson',
      courseName: 'UI/UX Design',
      completedOn: '2023-09-05',
      awarded: true,
      certificateId: 'CERT-003'
    },
    {
      id: 4,
      userName: 'Sarah Williams',
      courseName: 'Node.js Fundamentals',
      completedOn: '2023-12-10',
      awarded: false,
      certificateId: null
    },
  ]);

  // Filter certificates based on search and tab selection
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.courseName.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedTab === 'awarded') return matchesSearch && cert.awarded;
    if (selectedTab === 'pending') return matchesSearch && !cert.awarded;
    return matchesSearch;
  });

  // Sort certificates
  const sortedCertificates = [...filteredCertificates].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Handle sort request
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Generate certificate
  const handleGenerateCertificate = (userId, courseId) => {
    // API call to generate certificate would go here
    setCertificates(certs => certs.map(cert =>
      cert.id === userId && cert.courseName === courseId
        ? { ...cert, awarded: true, certificateId: `CERT-${Math.floor(1000 + Math.random() * 9000)}` }
        : cert
    ));
  };

  // Download certificate
  const handleDownloadCertificate = (certificateId) => {
    // API call to download certificate would go here
    console.log(`Downloading certificate ${certificateId}`);
    alert(`Certificate ${certificateId} downloaded`);
  };

  // Stats data
  const stats = [
    {
      title: "Total Certificates",
      value: certificates.length,
      icon: <FileText size={20} />,
      iconBgColor: "#0069AA"
    },
    {
      title: "Awarded",
      value: certificates.filter(c => c.awarded).length,
      icon: <CheckCircle size={20} />,
      iconBgColor: "#4CAF50"
    },
    {
      title: "Pending",
      value: certificates.filter(c => !c.awarded).length,
      icon: <XCircle size={20} />,
      iconBgColor: "#E32726"
    }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Certificates Management</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lms-button-primary"
        >
          {isOpen ? 'Hide Details' : 'View All Certificates'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconBgColor={stat.iconBgColor}
          />
        ))}
      </div>

      {isOpen && (
        <div className="mt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users or courses..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedTab('all')}
                className={`px-4 py-2 rounded-md ${selectedTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedTab('awarded')}
                className={`px-4 py-2 rounded-md ${selectedTab === 'awarded' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Awarded
              </button>
              <button
                onClick={() => setSelectedTab('pending')}
                className={`px-4 py-2 rounded-md ${selectedTab === 'pending' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Pending
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('userName')}
                  >
                    <div className="flex items-center">
                      User
                      {sortConfig.key === 'userName' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('courseName')}
                  >
                    <div className="flex items-center">
                      Course
                      {sortConfig.key === 'courseName' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('completedOn')}
                  >
                    <div className="flex items-center">
                      Completed On
                      {sortConfig.key === 'completedOn' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedCertificates.map((cert) => (
                  <tr key={cert.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cert.userName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{cert.courseName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(cert.completedOn).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        cert.awarded
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {cert.awarded ? 'Awarded' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {cert.awarded ? (
                        <button
                          onClick={() => handleDownloadCertificate(cert.certificateId)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      ) : (
                        <button
                          onClick={() => handleGenerateCertificate(cert.id, cert.courseName)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Generate Certificate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCertificationsModal;