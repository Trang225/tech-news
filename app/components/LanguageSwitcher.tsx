"use client";

type Language = "vi" | "en";

type Props = {
  language: Language;
  onChange: (language: Language) => void;
};

export default function LanguageSwitcher({
  language,
  onChange,
}: Props) {
  return (
    <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-sm">
      <button
        onClick={() => onChange("vi")}
        className={`rounded-full px-3 py-1.5 transition ${
          language === "vi"
            ? "bg-white text-black"
            : "text-white/50 hover:text-white"
        }`}
      >
        VI
      </button>

      <button
        onClick={() => onChange("en")}
        className={`rounded-full px-3 py-1.5 transition ${
          language === "en"
            ? "bg-white text-black"
            : "text-white/50 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
