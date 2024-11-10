// src/components/ProgressTracker.js
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const ProgressTracker = ({ data }) => {
  const transformData = data.map(item => ({
    date: item.date,
    count: item.submissions,
  }));

  return (
    <div>
      <h2>Submissions in the Past Year</h2>
      <p>Total active days: {transformData.length}</p>
      <p>Max streak: {/* calculate max streak from data */}</p>
      <CalendarHeatmap
        startDate={new Date('2023-01-01')}
        endDate={new Date()}
        values={transformData}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${Math.min(4, value.count)}`;
        }}
        tooltipDataAttrs={value => {
          return {
            'data-tip': `${value.date}: ${value.count || 0} submissions`,
          };
        }}
        showWeekdayLabels={true}
      />
    </div>
  );
};

export default ProgressTracker;
