// src/components/Sidebar.js

import React, { useState, useEffect } from 'react';
import { loadData } from '../utils/dataLoader';
import Card from './Card';
import './Sidebar.css'; // Assuming you have a separate CSS file for the sidebar

const Sidebar = ({ selectedItem, setSelectedItem }) => {
    const [fileContents, setFileContents] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);
    const [dropTarget, setDropTarget] = useState(null);

    useEffect(() => {
        loadData().then(contents => {
            setFileContents(contents);
        });
    }, []);

    const onDragStart = (e, id) => {
        setDraggedItem(fileContents.find(content => content.fileName === id));
    };

    const onDragOver = (e) => {
        e.preventDefault(); // Necessary for onDrop to fire
    };

    const onDragEnter = (e, id) => {
        setDropTarget(id);
    };

    const onDragLeave = (e) => {
        setDropTarget(null);
    };

    const onDrop = (e, id) => {
        const droppedItem = fileContents.find(content => content.fileName === id);
        let newFileContents = fileContents.filter(content => content.fileName !== draggedItem.fileName);
        let index = newFileContents.indexOf(droppedItem);
        newFileContents.splice(index, 0, draggedItem);

        setFileContents(newFileContents);
        setDraggedItem(null);
        setDropTarget(null);
    };

    const toggleSelection = (content) => {
        if (selectedItem.includes(content.fileName)) {
            setSelectedItem(selectedItem.filter(item => item !== content.fileName));
        } else {
            setSelectedItem([...selectedItem, content.fileName]);
        }
    };

    return (
        <div className="sidebar" onDragOver={onDragOver}>
            {fileContents.map((content, index) => (
                <div
                    key={index}
                    className={`list-item ${dropTarget === content.fileName ? "drop-target" : ""}  `}
                    onDrop={(e) => onDrop(e, content.fileName)}
                    onDragOver={onDragOver}
                    onDragEnter={(e) => onDragEnter(e, content.fileName)}
                    onDragLeave={onDragLeave}
                    onClick={() => toggleSelection(content)}
                >
                    <Card
                        className={selectedItem.includes(content.fileName) ? "selected" : ""}
                        id={content.fileName}
                        title={content.fileName}
                        content={content.text}
                        onDragStart={onDragStart}
                    />
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
