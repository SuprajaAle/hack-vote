import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TEAMS } from "../utils/teams";
import { ArrowRight, CheckCircle, Vote, Sparkles, Trophy } from "lucide-react";
import { getDeviceId } from "../utils/deviceId";
import { supabase } from "../services/supabase";

interface TeamGridProps {
  canVote?: boolean;
}

export const TeamGrid: React.FC<TeamGridProps> = () => {
  const [votedTeams, setVotedTeams] = useState<number[]>([]);

  useEffect(() => {
    const fetchVotes = async () => {
      const deviceId = await getDeviceId();
      const { data, error } = await supabase
        .from("votes")
        .select("team_id")
        .eq("device_id", deviceId);

      if (!error && data) {
        setVotedTeams(data.map((row) => row.team_id));
      }
    };

    fetchVotes();
  }, []);

  return (
    <div className="space-y-4">
      {TEAMS.map((team, index) => {
        const hasVoted = votedTeams.includes(team.id);
        const isTopTeam = index < 3;

        return (
          <Link
            key={team.id}
            to={`/team/${team.id}`}
            className={`group relative block rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
              hasVoted
                ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-300 shadow-lg shadow-green-500/10"
                : "bg-white/80 backdrop-blur-sm border-2 border-slate-200/50 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
            }`}
          >
            {/* Glow Effect for Top Teams */}
            {isTopTeam && !hasVoted && (
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            )}

            <div className="relative flex items-center space-x-4">
              {/* Team Avatar with Gradient */}
              <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                hasVoted 
                  ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/25" 
                  : isTopTeam
                  ? "bg-gradient-to-br from-yellow-500 to-orange-600 shadow-yellow-500/25"
                  : "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/25"
              }`}>
                {hasVoted ? (
                  <CheckCircle className="w-7 h-7" />
                ) : isTopTeam ? (
                  <Trophy className="w-7 h-7" />
                ) : (
                  <span>{index + 1}</span>
                )}
                
                {/* Sparkle for top teams */}
                {isTopTeam && !hasVoted && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-yellow-800" />
                  </div>
                )}
              </div>

              {/* Team Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">
                    {team.name}
                  </h3>
                  {isTopTeam && (
                    <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                      <Trophy className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>
                {team.description && (
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {team.description}
                  </p>
                )}
              </div>

              {/* Status & Arrow */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                {hasVoted ? (
                  <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold text-sm shadow-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Voted</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm group-hover:bg-blue-100 transition-colors">
                    <Vote className="w-4 h-4" />
                    <span>Vote Now</span>
                  </div>
                )}
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>

            {/* Hover Gradient Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
          </Link>
        );
      })}
    </div>
  );
};