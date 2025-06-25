import React from 'react';
import NavMenu from '../components/NavMenu';

const StatDash = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <NavMenu />
      <iframe
        src="/portfolio/statdash/index.html"
        title="StatDash"
        style={{ flexGrow: 1, border: 'none', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default StatDash; 