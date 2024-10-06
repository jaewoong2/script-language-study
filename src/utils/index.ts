export function parseData(dataString: string) {
  const sections = dataString.trim().split('\n\n'); // 단어와 문장 구분
  const vocabulary = sections[0]
    .split('\n')
    .slice(1)
    .map((line) => line.replace(/\s*-\s*/, '').trim());
  const sentences = sections[1]
    .split('\n')
    .slice(1)
    .map((line) => line.replace(/\s*-\s*/, '').trim());

  return { vocabulary, sentences };
}

const languageCodeMap: { [key: string]: string } = {
  af: 'Afrikaans',
  sq: 'Albanian',
  am: 'Amharic',
  ar: 'Arabic',
  hy: 'Armenian',
  az: 'Azerbaijani',
  eu: 'Basque',
  be: 'Belarusian',
  bn: 'Bengali',
  bs: 'Bosnian',
  bg: 'Bulgarian',
  ca: 'Catalan',
  ceb: 'Cebuano',
  zh: 'Chinese',
  zh_CN: 'Chinese (Simplified)',
  zh_TW: 'Chinese (Traditional)',
  co: 'Corsican',
  hr: 'Croatian',
  cs: 'Czech',
  da: 'Danish',
  nl: 'Dutch',
  en: 'English',
  eo: 'Esperanto',
  et: 'Estonian',
  fi: 'Finnish',
  fr: 'French',
  fy: 'Frisian',
  gl: 'Galician',
  ka: 'Georgian',
  de: 'German',
  el: 'Greek',
  gu: 'Gujarati',
  ht: 'Haitian Creole',
  ha: 'Hausa',
  haw: 'Hawaiian',
  he: 'Hebrew',
  hi: 'Hindi',
  hmn: 'Hmong',
  hu: 'Hungarian',
  is: 'Icelandic',
  ig: 'Igbo',
  id: 'Indonesian',
  ga: 'Irish',
  it: 'Italian',
  ja: 'Japanese',
  jw: 'Javanese',
  kn: 'Kannada',
  kk: 'Kazakh',
  km: 'Khmer',
  rw: 'Kinyarwanda',
  ko: 'Korean',
  ku: 'Kurdish',
  ky: 'Kyrgyz',
  lo: 'Lao',
  la: 'Latin',
  lv: 'Latvian',
  lt: 'Lithuanian',
  lb: 'Luxembourgish',
  mk: 'Macedonian',
  mg: 'Malagasy',
  ms: 'Malay',
  ml: 'Malayalam',
  mt: 'Maltese',
  mi: 'Maori',
  mr: 'Marathi',
  mn: 'Mongolian',
  my: 'Myanmar (Burmese)',
  ne: 'Nepali',
  no: 'Norwegian',
  ny: 'Nyanja (Chichewa)',
  or: 'Odia (Oriya)',
  ps: 'Pashto',
  fa: 'Persian',
  pl: 'Polish',
  pt: 'Portuguese',
  pa: 'Punjabi',
  ro: 'Romanian',
  ru: 'Russian',
  sm: 'Samoan',
  gd: 'Scots Gaelic',
  sr: 'Serbian',
  st: 'Sesotho',
  sn: 'Shona',
  sd: 'Sindhi',
  si: 'Sinhala',
  sk: 'Slovak',
  sl: 'Slovenian',
  so: 'Somali',
  es: 'Spanish',
  su: 'Sundanese',
  sw: 'Swahili',
  sv: 'Swedish',
  tl: 'Tagalog (Filipino)',
  tg: 'Tajik',
  ta: 'Tamil',
  tt: 'Tatar',
  te: 'Telugu',
  th: 'Thai',
  tr: 'Turkish',
  tk: 'Turkmen',
  uk: 'Ukrainian',
  ur: 'Urdu',
  ug: 'Uyghur',
  uz: 'Uzbek',
  vi: 'Vietnamese',
  cy: 'Welsh',
  xh: 'Xhosa',
  yi: 'Yiddish',
  yo: 'Yoruba',
  zu: 'Zulu',
} as const;

// Updated function to accept only valid language codes
export function getLanguageFullName(code: string): string {
  if (code in languageCodeMap) {
    return languageCodeMap[code];
  }

  return code;
}

interface Content {
  text: string;
  meaning: string;
}

export const parseSingleData = (
  data: string = '',
): { words: Content[]; sentences: Content[] } => {
  const wordList: Content[] = [];
  const sentenceList: Content[] = [];

  const lines = data.trim().split('\n');
  let currentSection = '';

  lines.forEach((line) => {
    line = line.trim();
    if (line.startsWith('- [단어]')) {
      currentSection = 'words';
    } else if (line.startsWith('- [문장]')) {
      currentSection = 'sentences';
    } else if (line.startsWith('-')) {
      if (currentSection === 'words') {
        const match = line.split(':');
        if (match.length >= 2) {
          const [word, ...meaningParts] = match;
          const meaning = meaningParts.join(':').trim();
          wordList.push({
            text: word.substring(1).trim(),
            meaning,
          });
        }
      } else if (currentSection === 'sentences') {
        const match = line.match(/- "(.+?)": (.+)/);
        if (match) {
          const [, sentence, translation] = match;
          sentenceList.push({
            text: sentence,
            meaning: translation,
          });
        }
      }
    }
  });

  return { words: wordList, sentences: sentenceList };
};
