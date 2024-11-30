import React from 'react'

const AboutUs = () => {
  return (
    <div className="p-8 pt-20 min-h-screen">
    <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-3">What is Task Manager?</h2>
      <p className="leading-relaxed">
        Task Manager is a comprehensive task management application designed to help individuals and teams efficiently track, assign, and complete tasks. It provides a seamless experience for both users and administrators to manage daily workflows and collaborate effectively.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
      <ul className="list-disc pl-6 leading-relaxed space-y-2">
        <li><strong>User Functionality:</strong> Users can view their assigned tasks, update their task status, and mark tasks as complete.</li>
        <li><strong>Admin Functionality:</strong> Admins have full control over task management. They can create, assign, update, and delete tasks, view task statuses, and manage user accounts.</li>
        <li><strong>Role-Based Access Control:</strong> The app ensures secure access with different functionalities available based on user roles (admin vs. regular user).</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
      <ul className="list-disc pl-6 leading-relaxed space-y-2">
        <li>Role-based authentication</li>
        <li>Task creation, assignment, and status updates</li>
        <li>Dark/Light mode for personalized user experience</li>
        <li>Responsive design for various devices</li>
        <li>Smooth navigation with an intuitive UI</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-3">Tech Stack</h2>
      <ul className="list-disc pl-6 leading-relaxed space-y-2">
        <li><strong>Frontend:</strong> React.js with Tailwind CSS for dynamic and responsive UI design.</li>
        <li><strong>Backend:</strong> Node.js and Express.js for robust server-side logic.</li>
        <li><strong>Database:</strong> MongoDB Atlas for scalable data storage.</li>
        <li><strong>Authentication:</strong> JWT (JSON Web Tokens) and bcrypt.js for secure user authentication and data encryption.</li>
        <li><strong>Deployment:</strong> Vercel for seamless frontend deployment and cloud management.</li>
      </ul>
    </section>

    <section className="text-center">
      <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
      <p className="leading-relaxed max-w-3xl mx-auto">
        Our goal is to simplify task management by offering an intuitive platform that enhances productivity and teamwork. We aim to continuously improve based on user feedback and emerging technologies.
      </p>
    </section>
  </div>
  )
}

export default AboutUs