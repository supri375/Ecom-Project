import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";


interface Review {
    comment:string,
    rating:number,
    product_id:string,
    date:string,
}

const Reviews = ({productId,reviewData}) => {

    const [reviews , setReviews] = useState<Review[]>([]);

    useEffect(() => {
        setReviews(reviewData);
    },[reviewData])

    
    const [review, setReview] = useState(
        {
            comment: "",
            rating: 0 ,
            product_id:productId,
            date: new Date().toISOString().split("T")[0],
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/reviews',review,{
            onSuccess: () => {
                console.log('review data store success'),
                router.reload

            },
        })
        setReview( {
            comment: "",
            rating: 0 ,
             product_id:"",
            date:"",
        });
    }

    const handleChange = (e) => {
        let comment = e.target.value
        setReview(
            {
                ...review,
                comment: e.target.value
            }
        );
    }

    // console.log(review);

    return (
        <div className="p-2 mt-8 border">
            <form onSubmit={handleSubmit}>
                <div className="p-2 text-xl font-bold">
                    <h1 className="p-2">Write a Comment</h1>
                    <textarea
                        name="comment"
                        placeholder="Write Your Comment Here"
                        className="p-2 text-sm border w-full h-auto"

                        onChange={handleChange}
                    >
                    </textarea>
                    <div className="flex items-center mb-4">
                        <span className="mr-2 p-2 font-medium">Rating:</span>
                        {Array(5).fill(0).map((_,i)=>(
                            <span key={i} onClick={()=>setReview({...review , rating : i+1})} className="cursor-pointer hover:text-white">
                            {i < review.rating ?(
                                <AiFillStar className="text-yellow-500" />
                            ):(
                                <AiOutlineStar className="text-gray-400" />
                            )}

                            </span>
                        ))}
                    </div>

                    <button type="submit" className="text-white w-18 h-6 text-sm cursor-pointer rounded-sm  bg-blue-500 hover:bg-blue-400 active:bg-blue-300">
                        Submit
                    </button>
                </div>
            </form>
            <h1 className="text-xl font-bold ">Comments : </h1>
            <div className="p-2 mt-4 ">
                {reviews.map((comment) => (
                    <div>
                        <p className="text-sm font-bold ">{comment.name}</p>
                        <p className="text-sm text-gray-500 ">{comment.email}</p>
                        <p className="text-sm text-gray-500 ">{comment.date}</p>
                        <div className="flex items-center mt-1 space-x-1 text-[15px]">
                            {Array(5).fill(0).map((_, i) =>
                                i < comment.rating ? (
                                    <AiFillStar key={i} className="text-yellow-500" />
                                ) : (
                                    <AiOutlineStar key={i} className="text-gray-300" />
                                )
                            )}
                        </div>
                        <p className="mb-8  ">{comment.comment}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Reviews;