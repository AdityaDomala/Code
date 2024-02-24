
function ContentComponent({ className, selectedFilesContents }) {
    return (
        <div className={className}>
            <div>
                <h1> WorkSpace </h1>
            </div>
            {selectedFilesContents.map((content, index) => (
                <div key={index}>
                    <p>index {content.text}</p>
                </div>
            ))}
        </div>
    );

}

export default ContentComponent;