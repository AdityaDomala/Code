import React from 'react';
import './Card.css'; // Your existing styling

const Card = ({ className, fileName, content, onDragStart }) => {
    return (
        <div
            className={`card ${className}`}
            draggable
            onDragStart={(e) => onDragStart(e, fileName)}
        >
            <h3>{fileName}</h3>
            {/* <p>{content}</p> */}
        </div>
    );
};

export default Card;