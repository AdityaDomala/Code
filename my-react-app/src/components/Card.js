import React from 'react';
import './Card.css'; // Your existing styling

const Card = ({ className, title, content, onDragStart, id }) => {
    return (
        <div
            className= {`card ${className}`}
            draggable
            onDragStart={(e) => onDragStart(e, id)}
        >
            <h3>{title}</h3>
            {/* <p>{content}</p> */}
        </div>
    );
};

export default Card;