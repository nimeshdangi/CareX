"use client"
import { useState } from "react";

const ReviewModal = ({ isOpen, setIsOpen, doctorId, addReview }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const toggleModal = () => {
    setComment("");
    setRating(0);
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission logic here, e.g., sending comment and rating to the server
    console.log("Comment:", comment);
    console.log("Rating:", rating);
    addReview(doctorId, comment, rating);
    // toggleModal(); // Close the modal after submission
  };

  return (
    <>
      {/* Modal toggle button */}
      {/* <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button> */}

      {/* Main Modal */}
      {(isOpen && doctorId !== null) && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden max-h-full bg-gray-800 bg-opacity-50"
          onClick={toggleModal} // Close modal on backdrop click
        >
          <div
            className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()} // Prevent closing on content click
          >
            {/* Modal Content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add Review
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal Body */}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="comment"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Comment
                  </label>
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write your thoughts here..."
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Rating
                  </label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        onClick={() => setRating(star)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={star <= rating ? "#edf03a" : "gray"}
                        viewBox="0 0 20 20"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path d="M10 15l-5.227 3.12 1.988-6.057L1 6.608l6.236-.008L10 0l2.764 6.6 6.236.008-5.761 5.454 1.988 6.057L10 15z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Review
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewModal;