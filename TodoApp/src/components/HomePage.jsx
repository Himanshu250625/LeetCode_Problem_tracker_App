// src/components/HomePage.js
import React from 'react';
import ProgressTracker from './ProgressTracker';
import DataStructureCard from './DataStructureCard';

const HomePage = () => {
  // Sample data for ProgressTracker and DataStructureCard
  const progressTrackerData = [
    { date: '2023-01-01', submissions: 3 },
    { date: '2023-01-02', submissions: 1 },
    // More data...
  ];

  const dataStructures = [
    { name: 'Array', totalQuestions: 13, solvedQuestions: 0 },
    { name: 'Linked List', totalQuestions: 8, solvedQuestions: 2 },
    // More data structures...
  ];

  return (
    <div>
      <h1>DSA Tracker</h1>
      <div>
        <h2>Progress Bar</h2>
        {/* Add progress bar component here */}
      </div>
      <div>
        <h2>Solved Questions</h2>
        {/* Add solved question bar here */}
      </div>
      <div>
        <h2>Activity Tracker</h2>
        <ProgressTracker data={progressTrackerData} />
      </div>
      <div>
        <h2>Data Structures</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {dataStructures.map((ds) => (
            <DataStructureCard
              key={ds.name}
              name={ds.name}
              totalQuestions={ds.totalQuestions}
              solvedQuestions={ds.solvedQuestions}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
