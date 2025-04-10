import React, { useState } from "react";

export default function Hero() {
  const [dream, setDream] = useState("");
  const [insight, setInsight] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const fetchDreamInsight = async () => {
    if (!dream.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: `Interpret the following dream: ${dream}` }),
      });

      const data = await response.json();

      if (data && data.insight) {
        setInsight(data.insight);
      } else {
        setInsight("No insights found. Try a different dream description.");
      }
    } catch (error) {
      console.error("Error fetching insight:", error);
      setInsight("Something went wrong while getting the AI's insight.");
    }

    setIsLoading(false);
    setIsInputVisible(false);
  };

  const renderFormattedInsight = () => {
    return insight.split("\n").map((line, index) => {
      if (line.startsWith("**")) {
        // Convert markdown-style bold title like **Core Meaning**:
        const cleanedLine = line.replace(/\*\*/g, "");
        return (
          <h4 key={index} className="mt-4 font-semibold text-purple-700">
            {cleanedLine}
          </h4>
        );
      } else if (line.startsWith("-")) {
        return (
          <li key={index} className="ml-6 list-disc text-gray-700">
            {line.slice(1).trim()}
          </li>
        );
      } else {
        return (
          <p key={index} className="text-gray-700 mt-1">
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Unlock the Wisdom of Your Dreams
          </h1>
          <div className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto transition-opacity duration-500">
            {isInputVisible ? (
              <div className="flex flex-col items-center space-y-4">
                <input
                  type="text"
                  placeholder="Enter your dream..."
                  value={dream}
                  onChange={(e) => setDream(e.target.value)}
                  className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                />
                <button
                  onClick={fetchDreamInsight}
                  className="rounded-lg bg-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-purple-700 transition"
                  disabled={isLoading}
                >
                  {isLoading ? "Fetching..." : "Get AI Insights"}
                </button>
              </div>
            ) : insight ? (
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Insight</h3>
                <div>{renderFormattedInsight()}</div>
                <button
                  onClick={() => {
                    setInsight("");
                    setIsInputVisible(true);
                    setDream("");
                  }}
                  className="mt-6 rounded-lg bg-purple-600 px-4 py-2 text-white font-medium hover:bg-purple-700 transition"
                >
                  Interpret Another Dream
                </button>
              </div>
            ) : (
              <p>Start your journey into the world of dreams and uncover their hidden meanings.</p>
            )}
          </div>
          {!isInputVisible && !insight && (
            <button
              onClick={() => setIsInputVisible(true)}
              className="mt-6 rounded-lg bg-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-purple-700 transition"
            >
              Enter Your Dream Journal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
