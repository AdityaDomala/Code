// src/utils/dataLoader.js

export const loadData = async () => {
    const generatedFilenames = generateFilenames(agencies);

    const fileContents = await Promise.all(generatedFilenames.map(async (fileName) => {
        const response = await fetch(`dataset/${fileName}`);
        const text = await response.text();
        return { fileName, text }; // Return both filename and text
    }));

    return fileContents;
};



const agencies = {
    'CIA': 43,
    'DIA': 3,
    'FBI': 41,
    'NSA': 22,
    'USCBP': 2
};

const generateFilenames = (agencies) => {
    const filenames = [];

    // Iterate over each agency and its frequency
    for (const [agency, frequency] of Object.entries(agencies)) {
        for (let i = 1; i <= frequency; i++) {
            const index = i<10? `0${i}`:i
            const filename = `${agency}_${index}`;
            filenames.push(filename);
        }
    }

    return filenames;
};

