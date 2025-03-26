import React, { useState } from "react";

export default function Hero() {
  const [dream, setDream] = useState("");
  const [insight, setInsight] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [communityJoined, setCommunityJoined] = useState(false);
  const [exploredDream, setExploredDream] = useState("");
  const [glowEffect, setGlowEffect] = useState(false);

  const dreamInsights = [
    "Dreaming about flying often represents a sense of freedom and breaking away from limitations. It symbolizes ambition, confidence, and a desire to escape the mundane. Some believe it reflects control over one's life, while others see it as an urge to explore new opportunities. If you felt fear while flying, it might indicate anxiety about upcoming changes.",
    "Being lost in a maze or unfamiliar city in a dream often indicates confusion or indecisiveness in waking life. It may suggest feeling trapped by responsibilities, struggling with choices, or seeking clarity in personal matters. The complexity of the maze represents obstacles preventing you from reaching a goal or making an important decision.",
    "Dreaming about a talking cat can symbolize mystery, intuition, and hidden wisdom. Cats are often linked to independence and the unknown. If the cat spoke something meaningful, it could represent subconscious guidance or a message from your inner self. A friendly cat may indicate comfort with your intuition, while an aggressive one might reflect internal conflicts.",
    "Seeing a stormy ocean in a dream can signify turbulent emotions, inner struggles, or overwhelming situations in life. A calm ocean, on the other hand, represents emotional stability and peace. The vastness of the sea may indicate a deep subconscious connection, urging you to explore your emotions and seek balance.",
    "A recurring dream about being chased often symbolizes running away from a fear, responsibility, or unresolved issue. The chaser may represent something in your life that you're avoiding. If you recognize the pursuer, it might indicate the exact problem you're trying to escape, urging you to confront it directly.",
    "Discovering a hidden door in a dream suggests undiscovered opportunities, secrets, or transitions. If you open the door, it means you're ready to explore new paths in life. A locked door may indicate feeling restricted or uncertain about the future. The setting of the door often provides clues about what lies beyond."
  ];

  const getDreamInsight = (dream) => {
    dream = dream.toLowerCase();
    if (dream.includes("flying")) return dreamInsights[0];
    if (dream.includes("maze") || dream.includes("lost")) return dreamInsights[1];
    if (dream.includes("cat")) return dreamInsights[2];
    if (dream.includes("ocean") || dream.includes("water")) return dreamInsights[3];
    if (dream.includes("chase") || dream.includes("running")) return dreamInsights[4];
    if (dream.includes("door") || dream.includes("portal")) return dreamInsights[5];
    return "Your dream is unique! It may hold deep personal significance. Try journaling it for further clarity.";
  };

  const handleSubmit = () => {
    if (dream.trim()) {
      setInsight(getDreamInsight(dream));
      setIsInputVisible(false);
      setShowActions(true);
    }
  };

  const handleExploreDreams = () => {
    const randomInsight = dreamInsights[Math.floor(Math.random() * dreamInsights.length)];
    setExploredDream(randomInsight);
  };

  const handleJoinCommunity = () => {
    setCommunityJoined(true);
    setInsight("Welcome to the dreamers' community! 🌙 Share, explore, and unlock the mysteries of your dreams.");
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
                  onClick={handleSubmit}
                  className="rounded-lg bg-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-purple-700 transition"
                >
                  Get AI Insights
                </button>
              </div>
            ) : insight ? (
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-gray-900">AI Insight</h3>
                <p className="mt-2 text-gray-600">{insight}</p>
              </div>
            ) : (
              <p>Start your journey into the world of dreams and uncover their hidden meanings.</p>
            )}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {!isInputVisible && !insight && (
              <button
                onClick={() => setIsInputVisible(true)}
                className="rounded-lg bg-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-purple-700 transition"
              >
                Enter Your Dream Journal
              </button>
            )}
            {showActions && (
              <>
                <button
                  onClick={handleExploreDreams}
                  className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                >
                  Explore Dreams
                </button>
                <button
                  onClick={handleJoinCommunity}
                  className={`rounded-lg px-6 py-3 text-lg font-semibold text-white shadow-sm transition ${
                    communityJoined ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                  }`}
                  disabled={communityJoined}
                >
                  {communityJoined ? "Joined Dreamers" : "Join Dreamers"}
                </button>
              </>
            )}
          </div>

          {/* Dream Box with Purple Glow Effect */}
          {exploredDream && (
            <div
              className={`mt-6 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-all duration-500 ${
                glowEffect ? "shadow-purple-500 shadow-2xl scale-105 z-20" : "shadow-md z-10"
              }`}
              onMouseEnter={() => setGlowEffect(true)}
              onMouseLeave={() => setGlowEffect(false)}
            >
              <h3 className="text-xl font-semibold text-gray-900">Random Dream Insight</h3>
              <p className="mt-2 text-gray-600">{exploredDream}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
