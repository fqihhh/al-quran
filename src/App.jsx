import { useState } from "react";
import SurahList from "./components/SurahList";
import SurahDetail from "./components/SurahDetail";

export default function App() {
  const [selectedSurah, setSelectedSurah] = useState(null);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 relative overflow-hidden">

      {/* 🌈 SOFT BACKGROUND BLOBS */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-emerald-300 rounded-full blur-[120px] opacity-30"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-[300px] h-[300px] bg-green-400 rounded-full blur-[120px] opacity-30"></div>

      {/* 📦 MAIN */}
      <div className="max-w-3xl mx-auto px-4 py-10 relative z-10">

        {/* 🕌 HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Ngaji<span className="text-emerald-600">.</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Baca Al-Qur'an dengan pengalaman terbaik ✨
          </p>
        </div>

        {/* 💎 GLASS CARD */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-6 transition">

          {selectedSurah ? (
            <SurahDetail
              surah={selectedSurah}
              onBack={() => setSelectedSurah(null)}
            />
          ) : (
            <SurahList onSelect={setSelectedSurah} />
          )}

        </div>

        {/* ✨ FOOTER */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Reading the Quran is the most elegant moment because it is when you hear God's "voice." When you feel like no one understands, the Quran is a love letter that reaches directly to the heart of your pain and hope.
        </p>

      </div>
    </div>
  );
}