import { useEffect, useState } from "react";

export default function SurahDetail({ surah, onBack }) {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    fetch(`https://api.quran.gading.dev/surah/${surah}`)
      .then((res) => res.json())
      .then((data) => setDetail(data.data));
  }, [surah]);

  if (!detail) return <p>Loading...</p>;

  return (
    <div>
      {/* 🔙 BUTTON */}
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition shadow-lg text-white"
      >
        Kembali
      </button>

      {/* 📖 JUDUL */}
      <h2 className="text-2xl font-bold mb-1">
        {detail.name.transliteration.id}
      </h2>

      <p className="mb-4 opacity-70">
        {detail.name.translation.id}
      </p>

      {/* 📌 INFO SURAH */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className={`text-xs px-3 py-1 rounded-full text-white ${
            detail.revelation.id === "Mekah"
              ? "bg-purple-500"
              : "bg-blue-500"
          }`}
        >
          {detail.revelation.id}
        </span>

        <span className="text-sm opacity-70">
          {detail.numberOfVerses} ayat
        </span>
      </div>

      {/* 📜 AYAT */}
      {detail.verses.map((ayat) => (
        <div
          key={ayat.number.inSurah}
          className="mb-6 p-4 rounded-xl shadow bg-white dark:bg-gray-800"
        >
          {/* 🔥 LABEL DI SETIAP AYAT */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs opacity-50">
              Ayat {ayat.number.inSurah}
            </span>

            <span
              className={`text-xs px-2 py-1 rounded-full text-white ${
                detail.revelation.id === "Mekah"
                  ? "bg-purple-500"
                  : "bg-blue-500"
              }`}
            >
              {detail.revelation.id}
            </span>
          </div>

          {/* ARAB */}
          <p className="text-right text-2xl leading-loose mb-2">
            {ayat.text.arab}
          </p>

          {/* TERJEMAH */}
          <p className="text-sm opacity-70 italic">
            {ayat.translation.id}
          </p>
        </div>
      ))}
    </div>
  );
}