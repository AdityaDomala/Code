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
        const { fileName } = content;

        setSelectedItem((prevSelected) => {
            const isSelected = prevSelected.some(item => item.fileName === fileName);

            if (isSelected) {
                return prevSelected.filter(item => item.fileName !== fileName);
            } else {
                return [...prevSelected, content];
            }
        });
    };

    return (
        <div className="sidebar" onDragOver={onDragOver}>
            <div>
                <h1> DocumentId's </h1>
            </div>
            {fileContents.map((content, index) => {
                const isSelected = selectedItem.some(item => item.fileName === content.fileName);
                return (
                    <div
                        key={index}
                        className={`list-item ${dropTarget === content.fileName ? "drop-target" : ""} ${isSelected ? "selected" : ""}`}
                        onDrop={(e) => onDrop(e, content.fileName)}
                        onDragOver={onDragOver}
                        onDragEnter={(e) => onDragEnter(e, content.fileName)}
                        onDragLeave={onDragLeave}
                        onClick={() => toggleSelection(content)}
                    >
                        <Card
                            className={isSelected ? "selected" : ""}
                            fileName={content.fileName}
                            content={content.text}
                            onDragStart={onDragStart}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Sidebar;
