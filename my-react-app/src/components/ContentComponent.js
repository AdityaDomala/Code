
function ContentComponent({ className, selectedFilesContents }) {
    return (
        <div className={className}>
            {selectedFilesContents.map((content, index) => (
                <div key={index}>
                    <p>index {content.text}</p>
                </div>
            ))}
        </div>
    );

}

export default ContentComponent;