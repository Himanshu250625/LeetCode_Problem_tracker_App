// src/components/DataStructureCard.js
import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    cursor: 'pointer',
  },
}));

const DataStructureCard = ({ name, totalQuestions, solvedQuestions }) => {
  const navigate = useNavigate();
  const progress = (solvedQuestions / totalQuestions) * 100;

  const handleCardClick = () => {
    navigate(`/questions/${name.toLowerCase()}`);
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Total Questions: {totalQuestions}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
          {solvedQuestions > 0 ? `Started` : 'Not Yet Started'}
        </Typography>
        {solvedQuestions > 0 && (
          <Box display="flex" alignItems="center">
            <LinearProgress variant="determinate" value={progress} sx={{ flexGrow: 1 }} />
            <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
              {Math.round(progress)}%
            </Typography>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default DataStructureCard;
