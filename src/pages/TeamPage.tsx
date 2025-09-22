import React from "react";
import { useParams, Link } from "react-router-dom";
import { VotingInterface } from "../components/VotingInterface";
import { TEAMS } from "../utils/teams";
import { ArrowLeft, Sparkles, Trophy, Users, Star } from "lucide-react";

export const TeamPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const teamIdNum = teamId ? parseInt(teamId) : null;
  const team = TEAMS.find((t) => t.id === teamIdNum);
  const teamIndex = TEAMS.findIndex((t) => t.id === teamIdNum);
  const isTopTeam = teamIndex < 3;

  if (!team) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-pink-50/50 py-6">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-red-200/50 text-center shadow-2xl shadow-red-500/10">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/25">
            <span className="text-white text-2xl">❌</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Team Not Found
          </h1>
          <p className="text-slate-600 text-lg mb-8 max-w-sm mx-auto">
            The team you're looking for doesn't exist in our system.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl shadow-blue-500/25"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        {isTopTeam && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        )}
      </div>

      <div className="relative py-6 space-y-8">
        {/* Header with Navigation */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="group p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
          </Link>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-900">Team Voting</h1>
              {isTopTeam && (
                <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  <Trophy className="w-3 h-3" />
                  <span>Featured Team</span>
                </div>
              )}
            </div>
            <p className="text-slate-600">Cast your vote and make your voice heard</p>
          </div>
        </div>

        {/* Team Hero Section */}
        <div className="relative group">
          {/* Glow Effect for Top Teams */}
          {isTopTeam && (
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur opacity-25 group-hover:opacity-35 transition duration-1000"></div>
          )}
          
          <div className={`relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border shadow-2xl transition-all duration-300 ${
            isTopTeam 
              ? "border-yellow-200/50 shadow-yellow-500/10" 
              : "border-white/20 shadow-blue-500/10"
          }`}>
            <div className="flex items-center space-x-6">
              {/* Team Avatar with Enhanced Design */}
              <div className="relative">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl transition-transform duration-300 group-hover:scale-110 ${
                  isTopTeam
                    ? "bg-gradient-to-br from-yellow-500 to-orange-600 shadow-yellow-500/30"
                    : "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/30"
                }`}>
                  {isTopTeam ? (
                    <Trophy className="w-10 h-10" />
                  ) : (
                    <span>{team.id}</span>
                  )}
                </div>
                
                {/* Sparkle Animation for Top Teams */}
                {isTopTeam && (
                  <>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                      <Sparkles className="w-4 h-4 text-yellow-800" />
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center animate-pulse">
                      <Star className="w-2 h-2 text-orange-800" />
                    </div>
                  </>
                )}
              </div>

              {/* Team Information */}
              <div className="flex-1 space-y-3">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900 leading-tight">
                    {team.name}
                  </h2>
                  {team.description && (
                    <p className="text-slate-600 text-lg leading-relaxed">
                      {team.description}
                    </p>
                  )}
                </div>

                {/* Team Stats/Badges */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-semibold text-sm shadow-sm">
                    <Users className="w-4 h-4" />
                    <span>Team #{team.id}</span>
                  </div>
                  
                  {isTopTeam && (
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-xl font-bold text-sm shadow-sm">
                      <Trophy className="w-4 h-4" />
                      <span>Top Contender</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 opacity-10">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Voting Interface */}
        <div className="relative">
          <VotingInterface teamId={team.id} teamName={team.name} />
        </div>

        {/* Motivational Footer */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center space-x-2 text-slate-500">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Every vote counts in shaping the future</span>
            <Star className="w-4 h-4" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto opacity-50"></div>
        </div>
      </div>
    </div>
  );
};