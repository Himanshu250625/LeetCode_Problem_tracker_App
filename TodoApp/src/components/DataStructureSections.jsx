// src/components/DataStructureSections.js
import React from 'react';
import { Grid } from '@mui/material';
import DataStructureCard from './DataStructureCard';

const dataStructures = [
  { name: 'Array', totalQuestions: 13, solvedQuestions: 0 },
  { name: 'Greedy', totalQuestions: 5, solvedQuestions: 0 },
  { name: 'Dynamic Programming', totalQuestions: 8, solvedQuestions: 0 },
  { name: 'Binary Search', totalQuestions: 7, solvedQuestions: 0 },
  { name: 'Heaps', totalQuestions: 5, solvedQuestions: 0 },
  { name: 'Recursion', totalQuestions: 6, solvedQuestions: 0 },
  { name: 'Linked List', totalQuestions: 8, solvedQuestions: 2 },
  { name: 'Binary Tree', totalQuestions: 8, solvedQuestions: 0 },
  { name: 'Binary Search Tree', totalQuestions: 6, solvedQuestions: 0 },
  { name: 'Stack and Queue', totalQuestions: 7, solvedQuestions: 0 },
  { name: 'Backtracking', totalQuestions: 6, solvedQuestions: 0 },
  { name: 'Graphs', totalQuestions: 6, solvedQuestions: 0 },
];

const DataStructureSections = () => {
  return (
    <Grid container spacing={3}>
      {dataStructures.map((ds, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <DataStructureCard
            name={ds.name}
            totalQuestions={ds.totalQuestions}
            solvedQuestions={ds.solvedQuestions}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DataStructureSections;
