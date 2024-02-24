// src/components/Sidebar.js

import React, { useState, useEffect } from 'react';
import { loadData } from '../utils/dataLoader';
import Card from './Card';

const Sidebar = () => {
    const [fileContents, setFileContents] = useState([]);

    useEffect(() => {
        loadData().then(contents => {
            setFileContents(contents);
        });
    }, []);

    return (
        <div className="sidebar">
            {fileContents.map((content, index) => (
                // Use filename as title and text as content
                <Card key={index} title={content.fileName} content={content.text} />
            ))}
        </div>
    );
};

export default Sidebar;
