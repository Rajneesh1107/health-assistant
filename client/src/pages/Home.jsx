import React, { useState } from "react";
import background from "../assets/background.jpg";

export const HomePage = () => {
  const [getForm, setGetFarm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
  });

  const [exerciseRecommendation, setExerciseRecommendation] = useState("");

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    value = name === "age" || "weight" || "height" ? +value : value;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const getExerciseRecommendation = async () => {
    const response = await fetch("YOUR_OPENAI_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify(userDetails),
    });

    const result = await response.json();

    setExerciseRecommendation(result.recommendation);
  };

  console.log(userDetails);
  return (
    <div style={{ width: "100%", paddingTop: "4.2rem" }}>
      <section
        className="relative bg-cover bg-center bg-no-repeat bg-opacity-80"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="absolute inset-0 bg-white/95 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
              Let us find your
              <strong className="block font-extrabold text-rose-700">
                Forever Home.
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed text-white font-bold">
              "Your body can stand almost anything. It's your mind that you have
              to convince."
            </p>

            <div className="mt-8 ml-12 flex flex-wrap gap-4 text-center">
              <button
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                onClick={() => setGetFarm(!getForm)}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
      <div>
        {getForm && (
          <div className="container mx-auto my-8 p-4 bg-white rounded shadow-md max-w-md">
            <div
              style={{
                display: `${exerciseRecommendation ? "none" : "block"}`,
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Name..."
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Age:
                </label>
                <input
                  placeholder="Age..."
                  type="text"
                  name="age"
                  value={userDetails.age}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Gender:
                </label>
                <select
                  className="mt-1 p-2 border rounded w-full font-2"
                  name="gender"
                  onChange={handleInputChange}
                >
                  <option value="">---</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Others</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Weight:
                </label>
                <input
                  type="text"
                  name="weight"
                  value={userDetails.weight}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Weight in kg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Height:
                </label>
                <input
                  type="text"
                  name="height"
                  value={userDetails.height}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Height in cm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Message:
                </label>
                <textarea
                  type="text-area"
                  name="height"
                  value={userDetails.height}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="please enter your query..."
                />
              </div>
              <button
                className="p-2 bg-rose-600 text-white rounded"
                onClick={getExerciseRecommendation}
              >
                Get Exercise Recommendation
              </button>
            </div>
            {exerciseRecommendation && (
              <div className="mt-4">
                <strong>Exercise Recommendation:</strong>
                <p>{exerciseRecommendation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
