import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const comments = [
    {
        name: "Supreme Panta",
        email: "supremepanta75@gmail.com",
        date: "2082-07-13",
        rating: 4,
        comment: "Absolutely love this jacket! The material feels premium and keeps me warm even on the coldest days. The fit is perfect and the design is super stylish — I’ve gotten compliments every time I wear it. Highly recommend!"
    },
    {
        name: "Rashik Bista",
        email: "rashikbist@gmail.com",
        date: "2082-05-01",
        rating: 1,
        comment: "Not what I expected. The fabric feels cheap and the sizing runs small. Returned it after one wear"
    },
    {
        name: "Arjan Bhandari",
        email: "arjanbhandari@gmail.com",
        date: "2081-07-13",
        rating: 2,
        comment: "It’s okay. The material is decent and fits fine, but it didn’t wow me. Might work better for someone with a different style."
    },
    {
        name: "David Musk",
        email: "David@gmail.com",
        date: "2080-02-13",
        rating: 3,
        comment: "Love the design and how it looks online, but in person it’s a bit thinner than I hoped. Works for mild cold, not deep winter."
    },
    {
        name: "zach Williams",
        email: "zachtech@gmail.com",
        date: "2082-04-12",
        rating: 5,
        comment: "Wasn’t sure at first, but this turned out to be my favorite winter piece! Super comfy and surprisingly durable"
    },

];

const Reviews = () => {

    const [review, setReview] = useState(
        {
            comment: "",
            rating: 0 ,
        }
    );

    const handleSubmit = (e) => {

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

                    <button className="text-white w-18 h-6 text-sm cursor-pointer rounded-sm  bg-blue-500 hover:bg-blue-400 active:bg-blue-300">
                        Submit
                    </button>
                </div>
            </form>
            <h1 className="text-xl font-bold ">Comments : </h1>
            <div className="p-2 mt-4 ">
                {comments.map((comment) => (
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