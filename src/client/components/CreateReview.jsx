import { useState } from 'react'
import { createReview } from '../API/ajaxHelpers'
import { useNavigate } from 'react-router-dom'

export default function AdminCreateWebsite(loggedIn) {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        
        try {
            await createReview(
                name,
                content,
                rating,
                date,
            );
        } catch (error) {
            console.error('Could not make website', error);
        }
        navigate('/reviews');
    }

    return (
        <>
        {loggedIn ? (
            <div className='create-post'>
            <h1 className='create-header'>Post a review</h1>
            <form className="create-form" onSubmit={handleSubmit}>
                <label className='create-label'>
                    Name: {' '}
                    <input
                    className='create-input'
                    type="text"
                    name="name"
                    placeholder="Name of review"
                    required={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label className='create-label'>
                    Content: {' '}
                    <input
                    className='create-input'
                    type="text"
                    name="content"
                    placeholder="Content"
                    required={true}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    />
                </label>
                <label className='create-label'>
                    Rating: {' '}
                    <input
                    className='create-input'
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    min="1"
                    max="5"
                    required={true}
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    />
                </label>
                <label className='create-label'>
                    Date: {' '}
                    <input
                    className='create-input'
                    type="date"
                    name="date"
                    placeholder="Image URL"
                    required={true}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                <button className="post-button">Post Review</button>
            </form>
        </div>
        ): (<h1>Please Login!</h1>)}
        </>     
    )
}