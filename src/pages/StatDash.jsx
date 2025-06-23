import React, { useEffect } from 'react';

const StatDash = () => {
  // Instant redirect to StatDash app with correct base path
  useEffect(() => {
    window.location.href = '/portfolio/statdash/index.html';
  }, []);

  return null; // Nothing to render, instant redirect
};

export default StatDash; 