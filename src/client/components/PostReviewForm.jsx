import React, { useState } from 'react';
import { createReview } from '../ajaxHelper';
import { useParams } from 'react-router-dom';
import '../Style/CreateReview.css'


const PostReviewForm = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(1);
  const { id } = useParams();
  const websiteid = id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReview(name, content, rating, websiteid);
      console.log(websiteid);
      // Handle the response, e.g., show a success message or handle errors.
    } catch (error) {
      // Handle errors, e.g., show an error message to the user.
      console.error('Error posting review:', error);
    }
  };

  return (
    <div className='create-post'>
      <h2>Post a Review</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <label className='create-label'>
          Name:
          <input placeholder='Name' type="text" value={name} onChange={(e) => setName(e.target.value)} required className='create-input'/>
        </label>
        <div className='parent-container'>
        <label className='create-box'>
          Content:
          <textarea placeholder='Description' value={content} onChange={(e) => setContent(e.target.value)} required className='create-textarea'/>
        </label>
        </div>
        <label className='create-label'>
          Rating:
          <input placeholder='Rating' type="number" max={5} min={1} value={rating} onChange={(e) => setRating(e.target.value)} required className='create-rating'/>
        </label>
        <button type="submit" className="post-button">Submit Review</button>
      </form>
    </div>
  );
};

export default PostReviewForm;