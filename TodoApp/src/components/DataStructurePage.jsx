// src/components/DataStructurePage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const DataStructurePage = () => {
  const { name } = useParams();
  // Mock data for questions; replace with real data
  const questions = [
    { title: 'Question 1', solved: true },
    { title: 'Question 2', solved: false },
    // More questions...
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {name.charAt(0).toUpperCase() + name.slice(1)} Questions
      </Typography>
      <List>
        {questions.map((question, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={question.title}
              secondary={question.solved ? 'Solved' : 'Not Solved'}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DataStructurePage;
