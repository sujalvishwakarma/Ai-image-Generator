import React, { useState } from 'react';
import './ImageGenerator.css';

function ImageGenerator() {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'generated_image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ inputs: inputText }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const blob = await response.blob();
      setImageUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          Ai image <span> Generator</span>
        </div>
        <div className="search-box">
          <input
            className='search-input'
            placeholder='Describe What You Want To Create'
            type="text"
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button id="bottone1" type="submit"><strong>Generate Image</strong></button>
        </div>
      </form>
      
      <div className="imageContainer">
        {imageUrl && (
          <div className="imageWrapper">
            <img src={imageUrl} alt="Generated" />
            <button className="downloadButton" onClick={handleDownload}>Download Image</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageGenerator;
