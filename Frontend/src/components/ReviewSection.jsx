import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { del, get, post } from "../utils/httpClient";

function ReviewSection({ hotel_id }) {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const { user } = useContext(AuthContext);
  const loadReviews = async () => {
    const data = await get(`/Reviews/${hotel_id}`);
    setReviews(data);
  };
  const handleReview = async () => {
    if (user) {
      if (comment != "") {
        await post("/Reviews", {
          hotel_id: hotel_id,
          user_id: user.id,
          comment,
          rating,
        });

        setComment("");
        setRating(5);

        loadReviews();
      } else {
        alert("Fill in Comment Part.");
      }
    } else {
      alert("At First Login to your Account.");
    }
  };

  const handelDelete = async (id) => {
    await del(`/Reviews/${id}`);
    loadReviews();
  };
  useEffect(() => {
    loadReviews();
  }, [hotel_id]);

  return (
    <>
      <div className="flex flex-col w-6xl m-auto mt-10">
        <p className="text-lg font-bold mb-3">نظر خود را ثبت کنید.</p>
        <textarea
          rows={3}
          className="border rounded-md h-[100px] p-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex flex-row justify-end mt-3 ml-5">
          <select
            className="p-1 bg-blue-200 ml-2 rounded-full"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
          <button
            className="px-2 py-1 bg-sky-800 text-white rounded-lg"
            onClick={handleReview}
          >
            Submit Review
          </button>
        </div>
      </div>
      <div className="flex flex-col w-6xl m-auto py-5">
        <p className="text-xl font-bold">نظرات کاربران</p>
        {reviews.map((review) => (
          <div>
            <div key={review.id} className="border rounded-lg p-4 mt-4">
              <h3 className="font-bold">{review.name}</h3>

              <p>⭐ {review.rating}/5</p>

              <p className="mt-2">{review.comment}</p>
            </div>
            {user && !user.role && (
              <button
                onClick={() => handelDelete(review.id)}
                className="bg-red-700 text-white px-3 py-1 rounded-md m-1"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ReviewSection;

//بخش rating با هوش مصنوعی نوشته شده است.
