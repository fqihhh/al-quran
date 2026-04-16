import { useEffect, useState } from "react";

export default function SurahList({ onSelect, dark }) {
  const [surah, setSurah] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.quran.gading.dev/surah")
      .then((res) => res.json())
      .then((data) => setSurah(data.data));
  }, []);

  // 🔥 FILTER SUPER (nama + arti + makiyah/madaniyah)
  const filtered = surah.filter((s) => {
    const keyword = search.toLowerCase();
    const revelation = s.revelation.id.toLowerCase();

    const isMakiyah =
      keyword.includes("makiyah") || keyword.includes("mekah");

    const isMadaniyah =
      keyword.includes("madaniyah") || keyword.includes("madinah");

    return (
      s.name.transliteration.id.toLowerCase().includes(keyword) ||
      s.name.translation.id.toLowerCase().includes(keyword) ||
      revelation.includes(keyword) ||
      (isMakiyah && revelation === "mekah") ||
      (isMadaniyah && revelation === "madinah")
    );
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📖 Daftar Surah</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Cari surah / Makiyah / Madaniyah..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`w-full mb-4 p-3 rounded-xl outline-none transition ${
          dark
            ? "bg-gray-800 text-white placeholder-gray-400"
            : "bg-white text-black border"
        }`}
      />

      {/* 📜 LIST */}
      <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
        {filtered.map((s) => (
          <div
            key={s.number}
            onClick={() => onSelect(s.number)}
            className={`flex justify-between items-center p-4 rounded-xl cursor-pointer transition shadow hover:scale-[1.02] ${
              dark
                ? "bg-gray-800 hover:bg-green-600"
                : "bg-white hover:bg-green-200"
            }`}
          >
            <div>
              <p className="font-semibold">
                {s.number}. {s.name.transliteration.id}
              </p>

              <p className="text-sm opacity-70">
                {s.name.translation.id}
              </p>

              {/* 🔥 LABEL */}
              <div className="flex gap-2 mt-1 items-center">
                <span
                  className={`text-xs px-2 py-1 rounded-full text-white ${
                    s.revelation.id === "Mekah"
                      ? "bg-purple-500"
                      : "bg-blue-500"
                  }`}
                >
                  {s.revelation.id}
                </span>

                <span className="text-xs opacity-60">
                  {s.numberOfVerses} ayat
                </span>
              </div>
            </div>

            <p className="text-lg font-bold opacity-70">
              {s.name.short}
            </p>
          </div>
        ))}

        {/* ❗ NOT FOUND */}
        {filtered.length === 0 && (
          <p className="text-center opacity-60 mt-4">
            Surah tidak ditemukan. Coba kata kunci lain? (nama, arti, makiyah/madaniyah)
          </p>
        )}
      </div>
    </div>
  );
}