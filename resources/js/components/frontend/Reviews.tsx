import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";


interface Review {
    comment: string,
    rating: number,
    product_id: string,
    date: string,
    user_name: string,
    user_email: string,
}

const Reviews = ({ productId, reviewData }) => {

    const [showModal, setShowModal] = useState(false);

    const [user, setUser] = useState({
        userEmail: "",
        password: "",
    });

    const [authUser, setAuthUser] = useState({});

    const { auth } = usePage().props;

    const [reviews, setReviews] = useState<Review[]>([]);


    useEffect(() => {
        setReviews(reviewData);
        setAuthUser(auth?.user);
    }, [reviewData, auth?.user])


    const [review, setReview] = useState(
        {
            comment: "",
            rating: 0,
            product_id: productId,
            date: new Date().toISOString().split("T")[0],
        }
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!auth.user) {
            setShowModal(true);
        }
        else {
            router.post('/reviews', review, {
                onSuccess: () => {
                    console.log(flash?.success),
                        router.reload();
                    setReview({
                        comment: "",
                        rating: 0,
                        product_id: productId,
                        date: new Date().toISOString().split("T")[0],
                    });
                },
            })
        }
    }

    const handleChange = (e) => {
        setReview(
            {
                ...review,
                comment: e.target.value
            }
        );
    }

    const handleLogIn = (e) => {
        e.preventDefault();
        router.post('/reviewLogin', user, {
            onSuccess: () => {
                console.log(flash?.success);
                router.reload();
            },
            
        })
    }


    return (
        <div className="p-2 mt-8 border">
            <form onSubmit={handleSubmit}>
                <div className="p-2 text-xl font-bold">
                    <h1 className="p-2">Write a Comment</h1>
                    <textarea
                        name="comment"
                        value={review.comment}
                        placeholder="Write Your Comment Here"
                        className="p-2 text-sm border w-full h-auto"
                        onChange={handleChange}
                    >
                    </textarea>
                    <div className="flex items-center mb-4">
                        <span className="mr-2 p-2 font-medium">Rating:</span>
                        {Array(5).fill(0).map((_, i) => (
                            <span key={i} onClick={() => setReview({ ...review, rating: i + 1 })} className="cursor-pointer hover:text-white">
                                {i < review.rating ? (
                                    <AiFillStar className="text-yellow-500" />
                                ) : (
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
                {reviews.map((comment, idx) => (
                    <div key={idx}>
                        <p className="text-sm font-bold ">{comment.user_email}</p>
                        <p className="text-sm font-bold ">{comment.user_name}</p>
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
            {showModal && (
                <div className="fixed inset-0 bg-gray-100/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white border rounded-lg shadow-lg w-96 p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

                        <form onSubmit={handleLogIn} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="you@example.com"
                                    value={user.userEmail}
                                    onChange={(e) => setUser({ ...user, userEmail: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                            >
                                Sign In
                            </button>
                        </form>

                        <p className="text-sm text-gray-600 text-center mt-4">
                            Don’t have an account?{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Reviews;