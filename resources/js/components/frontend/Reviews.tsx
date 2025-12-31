import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Reviews = ({ productId, reviewData }) => {
    const { auth } = usePage().props;

    const [showModal, setShowModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [user, setUser] = useState({ userEmail: "", password: "" });

    const [review, setReview] = useState({
        comment: "",
        rating: 0,
        product_id: productId,
        date: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        setReviews(reviewData);
    }, [reviewData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!auth.user) {
            setShowModal(true);
            return;
        }

        router.post("/reviews", review, {
            onSuccess: () => {
                router.reload();
                setReview({ ...review, comment: "", rating: 0 });
            },
        });
    };

    return (
        <section className="mt-16 max-w-4xl">

            {/* WRITE REVIEW */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-10">
                <h2 className="text-lg font-semibold mb-4">
                    Write a review
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={review.comment}
                        onChange={(e) =>
                            setReview({ ...review, comment: e.target.value })
                        }
                        placeholder="Share your thoughts about this product..."
                        className="w-full h-28 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/10 focus:outline-none resize-none"
                    />

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                            Rating
                        </span>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <button
                                type="button"
                                key={i}
                                onClick={() =>
                                    setReview({ ...review, rating: i + 1 })
                                }
                            >
                                {i < review.rating ? (
                                    <AiFillStar className="text-yellow-400 text-lg" />
                                ) : (
                                    <AiOutlineStar className="text-gray-300 text-lg" />
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition"
                    >
                        Submit review
                    </button>
                </form>
            </div>

            {/* REVIEWS LIST */}
            <div className="space-y-6">
                <h2 className="text-lg font-semibold">
                    Customer reviews
                </h2>

                {reviews.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No reviews yet. Be the first to write one!
                    </p>
                )}

                {reviews.map((comment, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-xl shadow-sm p-5"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="font-medium text-gray-900">
                                    {comment.user_name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {comment.date}
                                </p>
                            </div>

                            <div className="flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) =>
                                    i < comment.rating ? (
                                        <AiFillStar
                                            key={i}
                                            className="text-yellow-400 text-sm"
                                        />
                                    ) : (
                                        <AiOutlineStar
                                            key={i}
                                            className="text-gray-300 text-sm"
                                        />
                                    )
                                )}
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            {comment.comment}
                        </p>
                    </div>
                ))}
            </div>

            {/* LOGIN MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-96 p-6 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>

                        <h3 className="text-xl font-semibold mb-4 text-center">
                            Sign in to continue
                        </h3>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                router.post("/reviewLogin", user, {
                                    onSuccess: () => router.reload(),
                                });
                            }}
                            className="space-y-4"
                        >
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                                value={user.userEmail}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        userEmail: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                                value={user.password}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        password: e.target.value,
                                    })
                                }
                            />

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Reviews;
