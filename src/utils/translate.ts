interface Translation {
  [key: string]: {
    vi: string;
    en: string;
  }
}

export default function translate(translation: Translation) {
  const lang = "vi";
  return (key: keyof Translation) => translation[key][lang];
}