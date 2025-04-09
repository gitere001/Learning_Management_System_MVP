# Learning Management System (LMS) Demo

A full-fledged Learning Management System (LMS) built with **React**, **Node.js**, **Express**, **MongoDB**, and **Tailwind CSS**. This demo provides a comprehensive platform for both students and admins, with a range of features designed for managing courses, payments, and user interactions.

## Features

### User Registration & Authentication
- **Student Registration**: Students can register themselves to access courses.
- **Admin Registration**: Admins are created by other admins on the Admin Dashboard.
- **Login**: Users can log in as either a student or an admin and be directed to the appropriate dashboard.

### Student Dashboard
- **Dashboard Stats**: Displays statistics like enrolled courses, completed courses, and pending courses.
- **Course Search**: A search bar to search for available courses.
- **Available Courses**: Displays all available courses that a student can view.
- **Course Enrollment**: Students can enroll in courses through a simple checkout process.
- **Payment Integration (MPESA)**: Students can pay for courses via **MPESA**. Live payment integration is implemented.
- **My Courses**: After successful payment, students can access their enrolled courses.
- **Certificates**: Students can view and download their certificates once they complete the course.

### Admin Dashboard
- **Dashboard Stats**: Displays overall stats for the platform, including:
  - Total Courses
  - Total Students
  - Subscribed Courses
  - Certificates Generated
- **Data Visualization**: Uses **Recharts** to show graphs for:
  - Last 7 days of enrollments
  - Revenue from course payments
- **Course Management**: Admins can:
  - Add new courses
  - Add lessons to courses
  - Update course details (e.g., title, price, description, thumbnail)
  - Create both free and paid courses
- **Certificate Generation**: Admins can generate certificates for students.
- **Admin Management**: Admins can add new admins to the platform.
- **Account Details**: Admins have a section to manage their account details.

### Tech Stack
- **Frontend**: React, Tailwind CSS, Recharts
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (for metadata and user data)
- **File Storage**: Used for storing course images and lesson content
- **Payment**: MPESA integration for live payments
- **Authentication**: JWT for user authentication

### Screenshots

#### 1. Student Dashboard
![Student Dashboard](path/to/student-dashboard-screenshot.png)

#### 2. Admin Dashboard
![Admin Dashboard](path/to/admin-dashboard-screenshot.png)

#### 3. Course Enrollment & Checkout
![Course Enrollment](path/to/course-enrollment-screenshot.png)

#### 4. Certificate Generation
![Certificate Generation](path/to/certificate-generation-screenshot.png)


