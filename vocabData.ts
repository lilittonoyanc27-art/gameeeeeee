export interface VocabWord {
  spanish: string;
  armenian: string;
  emoji: string;
}

export interface SpaceChallenge {
  sentence: string;
  translation: string;
  correctAnswer: string;
  options: string[];
  verb: string;
}

export const A1_VOCAB: VocabWord[] = [
  { spanish: "llevar", armenian: "տանել / կրել", emoji: "🎒" },
  { spanish: "traer", armenian: "բերել", emoji: "🎁" },
  { spanish: "soler", armenian: "սովորաբար անել", emoji: "🔄" },
  { spanish: "la mochila", armenian: "ուսապարկ", emoji: "🎒" },
  { spanish: "el regalo", armenian: "նվեր", emoji: "🎁" },
  { spanish: "la comida", armenian: "ուտելիք", emoji: "🍲" },
  { spanish: "siempre", armenian: "միշտ", emoji: "♾️" },
  { spanish: "temprano", armenian: "վաղ", emoji: "🌅" }
];

export const SPACE_VERBS: SpaceChallenge[] = [
  // LLEVAR
  { 
    sentence: "Yo ___ una mochila azul.", 
    translation: "Ես կրում եմ կապույտ ուսապարկ:",
    correctAnswer: "llevo", 
    options: ["llevo", "llevas", "llevamos"],
    verb: "llevar"
  },
  { 
    sentence: "¿Qué ___ tú en la mano?", 
    translation: "Ի՞նչ ես դու տանում ձեռքումդ:",
    correctAnswer: "llevas", 
    options: ["llevas", "llevo", "lleva"],
    verb: "llevar"
  },
  { 
    sentence: "Nosotros ___ la comida.", 
    translation: "Մենք տանում ենք ուտելիքը:",
    correctAnswer: "llevamos", 
    options: ["llevamos", "lleváis", "llevan"],
    verb: "llevar"
  },
  // TRAER
  { 
    sentence: "Yo ___ un regalo para ti.", 
    translation: "Ես բերում եմ նվեր քեզ համար:",
    correctAnswer: "traigo", 
    options: ["traigo", "traes", "traemos"],
    verb: "traer"
  },
  { 
    sentence: "Él ___ agua a la mesa.", 
    translation: "Նա ջուր է բերում սեղանին:",
    correctAnswer: "trae", 
    options: ["trae", "traigo", "traen"],
    verb: "traer"
  },
  { 
    sentence: "¿Ustedes ___ los libros?", 
    translation: "Դուք բերո՞ւմ եք գրքերը:",
    correctAnswer: "traen", 
    options: ["traen", "traemos", "traéis"],
    verb: "traer"
  },
  // SOLER
  { 
    sentence: "Yo ___ correr por la mañana.", 
    translation: "Ես սովորաբար վազում եմ առավոտյան:",
    correctAnswer: "suelo", 
    options: ["suelo", "sueles", "solemos"],
    verb: "soler"
  },
  { 
    sentence: "Nosotros ___ comer juntos.", 
    translation: "Մենք սովորաբար միասին ենք ուտում:",
    correctAnswer: "solemos", 
    options: ["solemos", "suelo", "soléis"],
    verb: "soler"
  },
  { 
    sentence: "Ellos ___ llegar temprano.", 
    translation: "Նրանք սովորաբար早期 (վաղ) են ժամանում:",
    correctAnswer: "suelen", 
    options: ["suelen", "suele", "sueles"],
    verb: "soler"
  },
  { 
    sentence: "Tú ___ leer en la cama.", 
    translation: "Դու սովորաբար կարդում ես մահճակալում:",
    correctAnswer: "sueles", 
    options: ["sueles", "suelo", "suele"],
    verb: "soler"
  }
];
