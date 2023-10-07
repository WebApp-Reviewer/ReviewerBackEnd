// import { useState, useEffect } from "react"
// import { fetchAllReviews } from "../ajaxHelper";

// export default function Reviews() {
//     const [reviews, setReviews] = useState([]);

//     function renderAllReviews() {
//         return reviews.map((review) => {
//             return (
//                 <div key={review?.id} className="reviews">
//                     <h1 className="review-name">{review?.name}</h1>
//                     <h3 className="review-content">{review?.content}</h3>
//                     <h3 className="review-rating">{review?.rating}</h3>
//                     <h3 className="review-date">{review?.date}</h3>
//                 </div>
//             )
//         })
//     }

//     useEffect(() => {
//         async function allReviewsHandler() {
//             const result = await fetchAllReviews();
//             console.log({result});
//             setReviews(result.reviews);
//         } allReviewsHandler();
//     }, [])

//     return (
//         <div className="all-reviews">
//             {renderAllReviews()}
//         </div>
//     )
// }

import { useState, useEffect } from "react";
import { fetchAllReviews, deleteReview } from "../ajaxHelper";
import { useNavigate } from "react-router-dom";
import "../Style/WebsitesList.css";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [state, setState] = useState({query: '', list: []})

 function ReviewSearch() {
    const [reviews, setReviews] = useState([]);
    const [state, setState] = useState({query: '', list: []})

    const handleChange = (e) => {
        const results = reviews.filter(review => {
            if (e.target.value === '') return reviews
            return review.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setState({
            query: e.target.value,
            list: results
        })
    }

    useEffect(() => {
        async function allReviewsHandler() {
            const result = await fetchAllReviews();
            setReviews(result.reviews);
        } allReviewsHandler();
    }, [])

    return (
        <div className='searchbar'>
            <form className='searchForm'>
                <label className='searchbarText'> Searchbar
                    <input className='searchbarInfo' 
                    onChange={handleChange} value={state.query} 
                    type='search' 
                    placeholder='Search for a Review!' />
                </label>
            </form>
            <ul>
                {(state.query === '' ? '' : state.list.map(review => {
                    return <li key={review.name}>{review.name}</li>
                }))}
            </ul>
        </div>
    )
}

  function renderAllReviews() {
    return reviews.map((review) => {
      return (
              <div key={review?.id} className="reviews">
                  <h1 className="review-name">{review?.name}</h1>
                  <h3 className="review-content">{review?.content}</h3>
                  <h3 className="review-rating">{review?.rating}</h3>
                  <h3 className="review-date">{review?.date}</h3>
                  {/* <button className="postButton" onClick={() => handleDelete(review._id)}>Delete</button> */}
              </div>
      );
    });
  }

  useEffect(() => {
    async function allReviewsHandler() {
      const result = await fetchAllReviews();
      setReviews(result.reviews);
    }
    allReviewsHandler();
  }, []);

  async function handleDelete(reviewId) {
    try {
      await deleteReview(reviewId);
      const updatedReviews = await fetchAllReviews();
      setPosts(updatedReviews.reviews);
    } catch (error) {
      console.error(error);
    }
  }

  return <>
  <div className="search">{ReviewSearch()}</div>;
  <div className="allReviews">{renderAllReviews()}</div>;
  </>
}
