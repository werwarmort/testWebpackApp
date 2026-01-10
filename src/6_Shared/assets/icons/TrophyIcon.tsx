import React from 'react';

export const TrophyIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 4H7C5.89543 4 5 4.89543 5 6V10C5 13.866 8.13401 17 12 17C15.866 17 19 13.866 19 10V6C19 4.89543 18.1046 4 17 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 4H20C21.1046 4 22 4.89543 22 6V9C22 10.1046 21.1046 11 20 11H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 4H4C2.89543 4 2 4.89543 2 6V9C2 10.1046 2.89543 11 4 11H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
