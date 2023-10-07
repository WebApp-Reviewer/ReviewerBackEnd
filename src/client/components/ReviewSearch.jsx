import React, { useState, useEffect } from 'react'
import { fetchAllReviews } from '../ajaxHelper.js';
import {FaSearch} from "react-icons/fa"
// import '../Style/Login.css'

// export default function ReviewSearch() {
//     const [reviews, setReviews] = useState([]);
//     const [state, setState] = useState({query: '', list: []})

//     const handleChange = (e) => {
//         console.log(reviews)
//         const results = reviews.filter(review => {
//             if (e.target.value === '') return reviews
//             return review.name.toLowerCase().includes(e.target.value.toLowerCase())
//         })
//         setState({
//             query: e.target.value,
//             list: results
//         })
//     }

//     useEffect(() => {
//         async function allReviewsHandler() {
//             const result = await fetchAllReviews();
//             setReviews(result.reviews);
//         } allReviewsHandler();
//     }, [])

//     return (
//         <div className='searchbar'>
//             <form className='searchForm'>
//                 <label className='searchbarText'> Searchbar
//                     <input className='searchbarInfo' 
//                     onChange={handleChange} value={state.query} 
//                     type='search' 
//                     placeholder='Search for a Review!' />
//                 </label>
//             </form>
//             <ul>
//                 {(state.query === '' ? '' : state.list.map(review => {
//                     return <li key={review.name}>{review.name}</li>
//                 }))}
//             </ul>
//         </div>
//     )
// }

const ReviewSearch = () => {
    const [input, setInput] = useState('');

    const fetchData = ({value}) => {
        fetch(fetchAllReviews)
        .then((response) => response.json())
        .then(json => {
            console.log(json)
        });
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return(
        <div className='inputWrapper'>
            <FaSearch id='searchIcons'/>
            <input 
            placeholder='Type to search' 
            value={input} 
            onChange={(e) => handleChange(e.target.value)}>

            </input>
        </div>
    )}

    export default ReviewSearch;