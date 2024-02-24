// src/components/Card.js (or Card.tsx if using TypeScript)

import React from 'react';
import './Card.css'; // Assuming you have a CSS file for styling

const Card = ({ title, content }) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    );
};

export default Card;
