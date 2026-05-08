export type AlphabetCard = { letter: string; word: string; ja: string; sound: string; picture: string; practice: string };
export type VocabFlipCard = { word: string; ja: string; picture: string; difficulty: "easy" | "medium" | "challenge"; example: string; practice: string };
export type ExpandedStory = { id: string; title: string; type: "story" | "dialogue" | "nonfiction"; level: string; theme: string; text: string[]; focusWords: string[]; comprehension: { question: string; choices: string[]; answer: string }[]; activity: string };
export type GradeLearningExtras = { grade: number; alphabetCards?: AlphabetCard[]; vocabFlipCards: VocabFlipCard[]; storyBank: ExpandedStory[] };

const alphabetSeed = [
  ["A","apple","りんご","/a/ as in apple","🍎"],["B","book","本","/b/ as in book","📚"],["C","cat","ねこ","/k/ as in cat","🐱"],["D","dog","犬","/d/ as in dog","🐶"],["E","egg","卵","/e/ as in egg","🥚"],["F","fish","魚","/f/ as in fish","🐟"],["G","goat","ヤギ","/g/ as in goat","🐐"],["H","hat","帽子","/h/ as in hat","🎩"],["I","igloo","イグルー","/i/ as in igloo","🏠"],["J","jam","ジャム","/j/ as in jam","🍓"],["K","kite","たこ","/k/ as in kite","🪁"],["L","lion","ライオン","/l/ as in lion","🦁"],["M","moon","月","/m/ as in moon","🌙"],["N","nest","巣","/n/ as in nest","🪺"],["O","orange","オレンジ","/o/ as in orange","🍊"],["P","panda","パンダ","/p/ as in panda","🐼"],["Q","queen","女王","/kw/ as in queen","👑"],["R","robot","ロボット","/r/ as in robot","🤖"],["S","sun","太陽","/s/ as in sun","☀️"],["T","tree","木","/t/ as in tree","🌳"],["U","umbrella","傘","/u/ as in umbrella","☂️"],["V","violin","バイオリン","/v/ as in violin","🎻"],["W","water","水","/w/ as in water","💧"],["X","box","箱","/ks/ as in box","📦"],["Y","yellow","黄色","/y/ as in yellow","💛"],["Z","zebra","シマウマ","/z/ as in zebra","🦓"]
];

export const alphabetFlipCards: AlphabetCard[] = alphabetSeed.map(([letter, word, ja, sound, picture]) => ({
  letter, word, ja, sound, picture,
  practice: `Trace ${letter}, say ${word} slowly, then find or draw one picture.`
}));

const vocabSeeds: Record<number, [string,string,string][]> = {
  1: [["apple","りんご","🍎"],["book","本","📚"],["cat","ねこ","🐱"],["dog","犬","🐶"],["red","赤","🔴"],["happy","うれしい","😊"],["sun","太陽","☀️"],["moon","月","🌙"]],
  2: [["family","家族","👨‍👩‍👧"],["rainy","雨の","🌧️"],["toy","おもちゃ","🧸"],["rice","ごはん","🍚"],["friend","友だち","🤝"],["pencil","えんぴつ","✏️"],["window","窓","🪟"],["juice","ジュース","🧃"]],
  3: [["school","学校","🏫"],["library","図書館","📖"],["station","駅","🚉"],["morning","朝","🌅"],["clock","時計","⏰"],["park","公園","🌳"],["homework","宿題","📝"],["teacher","先生","👩‍🏫"]],
  4: [["river","川","🏞️"],["mountain","山","⛰️"],["hobby","趣味","🎨"],["healthy","健康な","💪"],["yesterday","昨日","📅"],["strong","強い","🦾"],["flower","花","🌸"],["bicycle","自転車","🚲"]],
  5: [["adventure","冒険","🗺️"],["helper","助ける人","🧑‍🚒"],["first","最初","1️⃣"],["next","次に","➡️"],["better","より良い","⭐"],["because","なぜなら","💬"],["bridge","橋","🌉"],["market","市場","🛒"]],
  6: [["culture","文化","🏮"],["club","クラブ","🏅"],["future","未来","🚀"],["opinion","意見","💭"],["agree","賛成する","👍"],["presentation","発表","📊"],["festival","祭り","🎆"],["plan","計画","🗓️"]],
  7: [["environment","環境","🌍"],["technology","技術","💻"],["interview","インタビュー","🎤"],["paragraph","段落","📄"],["cause","原因","❓"],["effect","結果","✅"],["energy","エネルギー","⚡"],["recycle","リサイクル","♻️"]],
  8: [["media","メディア","📱"],["source","情報源","🔎"],["history","歴史","🏯"],["summary","要約","📝"],["podcast","ポッドキャスト","🎧"],["evidence","証拠","📌"],["local","地元の","📍"],["science","科学","🔬"]],
  9: [["research","研究","🔬"],["data","データ","📈"],["graph","グラフ","📊"],["survey","調査","📋"],["result","結果","✅"],["strategy","方法","🧠"],["compare","比べる","⚖️"],["explain","説明する","💬"]],
  10: [["viewpoint","視点","👀"],["identity","アイデンティティ","🪪"],["global","世界の","🌐"],["argument","主張","🗣️"],["however","しかし","↔️"],["solution","解決策","💡"],["issue","問題","⚠️"],["example","例","📌"]],
  11: [["debate","討論","🏛️"],["policy","政策","📜"],["counterargument","反論","↩️"],["rhetoric","修辞","🎙️"],["society","社会","🏙️"],["ethical","倫理的な","⚖️"],["claim","主張","📣"],["impact","影響","💥"]],
  12: [["portfolio","ポートフォリオ","🗂️"],["academic","学術的な","🎓"],["professional","職業的な","💼"],["interview","面接","🤝"],["reflection","振り返り","🪞"],["revision","修正","✏️"],["application","応募","📨"],["confidence","自信","🌟"]]
};

const gradeThemes = ["ABC Star", "Rainy Day Words", "Hadano Library", "Mizunashi River", "Cloud Train", "Culture Club", "Recycling Robot", "History Podcast", "Study Experiment", "Online Class Debate", "AI Tutor Question", "Mirai Portfolio"];
const typeCycle: ExpandedStory["type"][] = ["story", "dialogue", "nonfiction"];

function vocabCardsForGrade(grade: number): VocabFlipCard[] {
  const seed = vocabSeeds[grade] ?? vocabSeeds[1];
  return seed.map(([word, ja, picture], index) => ({
    word, ja, picture,
    difficulty: index < 3 ? "easy" : index < 6 ? "medium" : "challenge",
    example: grade <= 2 ? `This is ${word}.` : grade <= 6 ? `I can use ${word} in a sentence.` : `The word ${word} helps me explain my idea clearly.`,
    practice: `Say ${word}, read the example, then make your own sentence.`
  }));
}

function storyForGrade(grade: number, n: number, cards: VocabFlipCard[]): ExpandedStory {
  const theme = gradeThemes[grade - 1] ?? "English Journey";
  const wordA = cards[n % cards.length].word;
  const wordB = cards[(n + 2) % cards.length].word;
  const place = n % 4 === 0 ? "Hadano" : n % 4 === 1 ? "school" : n % 4 === 2 ? "the park" : "home";
  const type = typeCycle[n % typeCycle.length];
  const title = `${theme} ${n + 1}: ${wordA[0].toUpperCase()}${wordA.slice(1)} Day`;
  const text = grade <= 2
    ? [`I see a ${wordA}.`, `It is in ${place}.`, `I say ${wordA} slowly.`, `My friend says ${wordB}.`, `We smile and read again.`]
    : grade <= 6
      ? [`Mina and Kaito visit ${place}.`, `They find a ${wordA} and talk about ${wordB}.`, `First, they listen. Next, they read. Finally, they say their own sentence.`, `English feels easier when they practice step by step.`]
      : [`A student team studies ${wordA} in ${place}.`, `They collect ideas, compare examples, and discuss ${wordB}.`, `Their first explanation is short, so they revise it with clearer evidence.`, `At the end, they present a stronger English message with confidence.`];
  return {
    id: `g${grade}-story-${n + 1}`,
    title,
    type,
    level: `Grade ${grade}`,
    theme,
    text,
    focusWords: [wordA, wordB, cards[(n + 4) % cards.length].word],
    comprehension: [
      { question: "Where does the story happen?", choices: [place, "the moon", "a supermarket", "a bus"], answer: place },
      { question: "Which word is practiced?", choices: [wordA, "banana", "sleep", "window"], answer: wordA },
      { question: "What should the learner do next?", choices: ["read again", "close the book", "stop learning", "run away"], answer: "read again" }
    ],
    activity: grade <= 4 ? "Draw the story and label three English words." : grade <= 8 ? "Retell the story in four sentences." : "Write a short reflection with one example and one opinion."
  };
}

export const gradeLearningExtras: GradeLearningExtras[] = Array.from({ length: 12 }, (_, i) => {
  const grade = i + 1;
  const vocabFlipCards = vocabCardsForGrade(grade);
  return {
    grade,
    alphabetCards: grade === 1 ? alphabetFlipCards : undefined,
    vocabFlipCards,
    storyBank: Array.from({ length: 20 }, (_, n) => storyForGrade(grade, n, vocabFlipCards))
  };
});

export function getGradeLearningExtras(grade: number) {
  return gradeLearningExtras.find((item) => item.grade === grade);
}
