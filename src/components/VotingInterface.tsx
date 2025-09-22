import React, { useEffect, useState } from "react";
import { generateQRCode } from "../utils/qrcode";
import { CheckCircle, QrCode, Share, Star, Zap, Trophy, Heart } from "lucide-react";
import { getDeviceId } from "../utils/deviceId";
import { submitVote, hasDeviceVotedForTeam } from "../services/supabase";
import QRSnippet from "./QRSnippet";

interface VotingInterfaceProps {
  teamId: number;
  teamName: string;
}

export const VotingInterface: React.FC<VotingInterfaceProps> = ({
  teamId,
  teamName,
}) => {
  const [score, setScore] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const checkVoteStatus = async () => {
      setLoading(true);
      try {
        const deviceId = await getDeviceId();
        const votedInDB = await hasDeviceVotedForTeam(teamId, deviceId);
        console.log("Vote status for device:", deviceId, "is", votedInDB);
        setHasVoted(votedInDB);
      } catch (err) {
        console.error("Error checking vote status:", err);
      } finally {
        setLoading(false);
      }
    };

    const generateTeamQR = async () => {
      const teamUrl = `${window.location.origin}/team/${teamId}`;
      const qrCodeData = await generateQRCode(teamUrl);
      setQrCode(qrCodeData);
    };

    checkVoteStatus();
    generateTeamQR();
  }, [teamId]);

  const handleVote = async () => {
    if (score === 0 || hasVoted) return;

    setIsSubmitting(true);
    setError("");

    try {
      const deviceId = await getDeviceId();
      await submitVote(teamId, score, deviceId);
      setHasVoted(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit vote. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Vote for ${teamName}`,
          text: `Cast your vote for ${teamName} in the hackathon!`,
          url: `${window.location.origin}/team/${teamId}`,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      const teamUrl = `${window.location.origin}/team/${teamId}`;
      await navigator.clipboard.writeText(teamUrl);
      alert("Team URL copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl shadow-blue-500/10">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin animate-reverse delay-150"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Loading Voting Interface</h3>
            <p className="text-slate-600">Preparing your voting experience...</p>
          </div>
        </div>
      </div>
    );
  }

  if (hasVoted) {
    return (
      <div className="space-y-8">
        {/* Success State */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur opacity-25 group-hover:opacity-35 transition duration-1000"></div>
          
          <div className="relative bg-gradient-to-br from-green-50 to-emerald-50/80 backdrop-blur-xl rounded-3xl p-8 border border-green-200/50 shadow-2xl shadow-green-500/10">
            <div className="text-center space-y-6">
              {/* Success Animation */}
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30 animate-pulse">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 text-3xl animate-bounce">🎉</div>
                <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse">✨</div>
              </div>

              {/* Success Message */}
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-slate-900">
                  Vote Submitted Successfully!
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed max-w-md mx-auto">
                  Thank you for supporting{" "}
                  <span className="font-bold text-green-700 bg-green-100 px-2 py-1 rounded-lg">
                    {teamName}
                  </span>
                  <br />
                  Your voice has been heard! 🗳️
                </p>
              </div>

              {/* Appreciation Badge */}
              <div className="inline-flex items-center space-x-3 bg-green-100 border-2 border-green-300 rounded-2xl px-6 py-3 shadow-lg">
                <Heart className="w-5 h-5 text-green-600 animate-pulse" />
                <span className="text-green-800 font-bold">
                  Vote Recorded & Secured
                </span>
                <Trophy className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowQR(!showQR)}
            className="group relative bg-white/80 backdrop-blur-sm border-2 border-slate-200/50 text-slate-700 font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105"
          >
            <div className="flex items-center justify-center space-x-3">
              <QrCode className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>QR Code</span>
            </div>
          </button>

          <button
            onClick={shareQRCode}
            className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl shadow-blue-500/25"
          >
            <div className="flex items-center justify-center space-x-3">
              <Share className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Share Team</span>
            </div>
          </button>
        </div>

        {/* QR Code Display */}
        {showQR && qrCode && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <QRSnippet teamId={teamId} teamName={teamName} qrCode={qrCode} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Voting Interface */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl shadow-blue-500/10">
          {/* Header */}
          <div className="text-center mb-8 space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">
                Rate {teamName}
              </h3>
              <p className="text-slate-600 text-lg">
                Select a score from <span className="font-bold text-blue-600">1 to 10</span>
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6 animate-in slide-in-from-top-2 duration-300">
              <p className="text-red-700 text-center font-semibold">{error}</p>
            </div>
          )}

          {/* Score Selection Grid */}
          <div className="grid grid-cols-5 gap-3 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => setScore(num)}
                className={`group relative aspect-square rounded-2xl font-bold text-lg transition-all duration-300 active:scale-95 hover:scale-110 ${
                  score === num
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-500/40 scale-110 animate-pulse"
                    : "bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700 shadow-lg hover:shadow-xl"
                }`}
              >
                <span className="relative z-10">{num}</span>
                {score === num && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur opacity-50 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Star Rating Display */}
          <div className="flex justify-center items-center space-x-2 mb-8">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const starValue = star * 2;
                const isActive = score >= starValue;
                const isHalf = score === starValue - 1;

                return (
                  <div key={star} className="relative">
                    {isHalf ? (
                      <div className="relative w-8 h-8">
                        <Star className="w-8 h-8 text-slate-300" />
                        <div className="absolute inset-0 w-1/2 overflow-hidden">
                          <Star className="w-8 h-8 text-yellow-400 fill-current animate-pulse" />
                        </div>
                      </div>
                    ) : (
                      <Star
                        className={`w-8 h-8 transition-all duration-300 ${
                          isActive
                            ? "text-yellow-400 fill-current animate-pulse scale-110"
                            : "text-slate-300"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {score > 0 && (
              <div className="ml-4 flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-xl">
                <span className="text-2xl font-bold text-blue-600">{score}</span>
                <span className="text-slate-600 font-medium">/10</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleVote}
            disabled={score === 0 || isSubmitting}
            className={`group relative w-full font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl ${
              score === 0 || isSubmitting
                ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:scale-105 shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg">Submitting Vote...</span>
              </div>
            ) : score > 0 ? (
              <div className="flex items-center justify-center space-x-3">
                <Trophy className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-lg">Submit Vote ({score}/10)</span>
                <Zap className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </div>
            ) : (
              <span className="text-lg">Select a Score to Continue</span>
            )}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setShowQR(!showQR)}
          className="group relative bg-white/80 backdrop-blur-sm border-2 border-slate-200/50 text-slate-700 font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105"
        >
          <div className="flex items-center justify-center space-x-3">
            <QrCode className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span>Show QR</span>
          </div>
        </button>

        <button
          onClick={shareQRCode}
          className="group relative bg-white/80 backdrop-blur-sm border-2 border-slate-200/50 text-slate-700 font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:border-green-300 hover:shadow-xl hover:shadow-green-500/10 hover:scale-105"
        >
          <div className="flex items-center justify-center space-x-3">
            <Share className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Share</span>
          </div>
        </button>
      </div>

      {/* QR Code Display */}
      {showQR && qrCode && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <QRSnippet teamId={teamId} teamName={teamName} qrCode={qrCode} />
        </div>
      )}
    </div>
  );
};