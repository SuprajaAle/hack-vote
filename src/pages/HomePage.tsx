import React, { useState, useEffect } from "react";
import { TeamGrid } from "../components/TeamGrid";
import { PredictionForm } from "../components/PredictionForm";
import { hasMadePrediction } from "../utils/deviceId";
import { Target, CheckCircle, ArrowRight, Sparkles, Trophy, Users, Zap } from "lucide-react";
import LogoImg from "../assets/logo.png";

export const HomePage: React.FC = () => {
  const [hasPredicted, setHasPredicted] = useState<boolean>(false);
  const [showPredictionForm, setShowPredictionForm] = useState<boolean>(false);

  useEffect(() => {
    const predicted = hasMadePrediction();
    setHasPredicted(predicted);
  }, []);

  const handlePredictionComplete = () => {
    setHasPredicted(true);
    setShowPredictionForm(false);
  };

  const handleMakePrediction = () => {
    setShowPredictionForm(true);
  };

  const hidePredictionForm = () => {
    setShowPredictionForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative py-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          {/* Logo with Glow Effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-2xl opacity-20 scale-150"></div>
            <div className="relative w-24 h-24 mx-auto bg-white rounded-2xl shadow-2xl shadow-blue-500/25 flex items-center justify-center border border-blue-100/50">
              <img src={LogoImg} alt="logo" className="w-16 h-16" />
            </div>
          </div>

          {/* Title with Gradient */}
          <div className="space-y-4">
            <h1 className="text-5xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent tracking-tight leading-tight">
              Code<span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">Quest</span>
            </h1>
            <div className="flex items-center justify-center space-x-2 text-lg font-semibold text-slate-600">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span>Hackathon Voting Platform</span>
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </div>
          </div>

          {/* Subtitle with Icons */}
          <div className="max-w-md mx-auto space-y-4">
            <p className="text-slate-600 text-lg leading-relaxed">
              Shape the future by predicting winners and voting for innovation
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-blue-500" />
                <span>Predict</span>
              </div>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>Vote</span>
              </div>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-green-500" />
                <span>Win</span>
              </div>
            </div>
          </div>
        </div>

        {/* Predictions Section */}
        {!hasPredicted ? (
          <div className="space-y-6">
            {!showPredictionForm ? (
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl shadow-blue-500/10">
                  <div className="text-center space-y-6">
                    {/* Icon with Animation */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-yellow-800" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold text-slate-900">
                        Make Your Predictions
                      </h2>
                      <p className="text-slate-600 text-lg leading-relaxed max-w-sm mx-auto">
                        Choose which teams will dominate the{" "}
                        <span className="font-bold text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text">Top 3</span> spots
                      </p>
                    </div>

                    {/* Eligibility Badge */}
                    <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-4 py-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-red-700">
                        Synchrony Employees Only
                      </span>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={handleMakePrediction}
                      className="group/btn relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30"
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <Zap className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                        <span>Start Predictions</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <PredictionForm onComplete={handlePredictionComplete} onClose={hidePredictionForm} />
            )}
          </div>
        ) : (
          <div className="relative group">
            {/* Success Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            
            <div className="relative bg-gradient-to-br from-green-50 to-emerald-50/50 backdrop-blur-xl rounded-3xl p-8 border border-green-200/50 shadow-2xl shadow-green-500/10">
              <div className="text-center space-y-6">
                {/* Success Icon */}
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/25">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🎉</div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-slate-900">
                    Predictions Locked In!
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-sm mx-auto">
                    Your predictions are <span className="font-bold text-green-700">secured</span>.
                    Now support your favorite teams below!
                  </p>
                </div>

                {/* Status Badge */}
                <div className="inline-flex items-center space-x-2 bg-green-100 border border-green-300 rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-bold text-green-800">
                    Predictions Submitted
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Teams Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-900">Vote for Teams</h2>
              <p className="text-slate-500">Support innovation with your vote</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1 border border-slate-200/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Tap to vote</span>
            </div>
          </div>
          <TeamGrid />
        </div>
      </div>
    </div>
  );
};