export type VocabItem = { en: string; ja: string; example: string };
export type Puzzle = { type: "match" | "fill" | "order"; title: string; prompt: string; items: string[]; answer: string };
export type Module = { title: string; focus: string; miniLesson: string; skills: string[]; vocabulary: VocabItem[]; grammar: string[]; activities: string[]; puzzles: Puzzle[] };
export type ScopeUnit = { week: number; title: string; focus: string; teacherGoal: string; studentCan: string[]; activities: string[] };
export type ReadingItem = { title: string; type: string; summary: string; tasks: string[] };
export type GameItem = { title: string; kind: string; howToPlay: string; content: string[] };
export type GradeCurriculum = { grade: number; level: string; badge: string; theme: string; outcome: string; zeroStart: boolean; essentialQuestion: string; weeklyPlan: string[]; scopeSequence: ScopeUnit[]; modules: Module[]; story: { title: string; level: string; text: string[]; comprehension: { question: string; choices: string[]; answer: string }[]; readAloudTip: string }; readingLibrary: ReadingItem[]; speakingMissions: string[]; writingPrompts: string[]; games: GameItem[]; assessment: { canDo: string[]; reviewCycle: string }; parentGuide: string; project: string };

export const beginnerPath = [
  "Start with listening, gestures, pictures, and Japanese support.",
  "Move from sounds to words, then tiny phrases.",
  "Read short stories before grammar-heavy study.",
  "Play games and repeat slowly with the audio button.",
  "Collect local stars and build a simple English portfolio."
];

const gradeMeta = [
  [1, "Pre-A1 First Sounds", "First Word Explorer", "ABC, sounds, colors, numbers, feelings", "Can recognize A–Z, say first words, and answer with one-word or tiny phrases."],
  [2, "Pre-A1 Starter", "Tiny Sentence Builder", "Family, weather, food, toys, classroom English", "Can read tiny sentences and answer simple questions."],
  [3, "A1 Explorer", "Everyday English Explorer", "School, time, daily routines, town places", "Can describe routines, places, and simple needs."],
  [4, "A1 Builder", "Story Builder", "Nature, hobbies, body, describing people", "Can read short stories and describe people, places, and past actions."],
  [5, "A2 Story Reader", "Adventure Reader", "Adventure, community helpers, sequence words", "Can read longer stories and explain sequence and opinions."],
  [6, "A2 Confident Speaker", "Culture Speaker", "Culture exchange, clubs, future plans", "Can speak in short presentations and give reasons."],
  [7, "A2+ Paragraph Writer", "Paragraph Pilot", "Environment, technology, interviews, paragraphs", "Can write organized paragraphs and interview others."],
  [8, "B1 Discussion Starter", "Presentation Podcaster", "Media, local history, science, summaries", "Can summarize sources and present local topics."],
  [9, "B1 Academic Explorer", "Research Explorer", "Research, data, graphs, study strategies", "Can explain evidence, data, and simple research findings."],
  [10, "B1+ Critical Reader", "Opinion Essay Writer", "Global issues, identity, balanced arguments", "Can write opinion essays with examples and counterpoints."],
  [11, "B2 Debate Builder", "Debate Leader", "AI, society, education futures, policy", "Can debate, respond to counterarguments, and speak formally."],
  [12, "B2 Future Communicator", "Portfolio Communicator", "Portfolio English, academic/professional communication", "Can prepare a polished English portfolio and final presentation."]
] as const;

const vocabByGrade: Record<number, VocabItem[]> = {
  1: [["apple","りんご"],["book","本"],["cat","ねこ"],["dog","犬"],["red","赤"],["happy","うれしい"]].map(([en,ja])=>({en,ja,example:`This is ${en}.`})),
  2: [["family","家族"],["rainy","雨の"],["toy","おもちゃ"],["rice","ごはん"],["sunny","晴れの"],["friend","友だち"]].map(([en,ja])=>({en,ja,example:`I see ${en}.`})),
  3: [["school","学校"],["library","図書館"],["station","駅"],["morning","朝"],["clock","時計"],["homework","宿題"]].map(([en,ja])=>({en,ja,example:`I go to the ${en}.`})),
  4: [["river","川"],["mountain","山"],["hobby","趣味"],["healthy","健康な"],["yesterday","昨日"],["strong","強い"]].map(([en,ja])=>({en,ja,example:`I like the ${en}.`})),
  5: [["adventure","冒険"],["helper","助ける人"],["first","最初"],["next","次に"],["better","より良い"],["because","なぜなら"]].map(([en,ja])=>({en,ja,example:`I choose this because it is ${en}.`})),
  6: [["culture","文化"],["club","クラブ"],["future","未来"],["opinion","意見"],["agree","賛成する"],["presentation","発表"]].map(([en,ja])=>({en,ja,example:`My opinion is about ${en}.`})),
  7: [["environment","環境"],["technology","技術"],["interview","インタビュー"],["paragraph","段落"],["cause","原因"],["effect","結果"]].map(([en,ja])=>({en,ja,example:`The topic is ${en}.`})),
  8: [["media","メディア"],["source","情報源"],["history","歴史"],["summary","要約"],["podcast","ポッドキャスト"],["evidence","証拠"]].map(([en,ja])=>({en,ja,example:`This source gives ${en}.`})),
  9: [["research","研究"],["data","データ"],["graph","グラフ"],["survey","調査"],["result","結果"],["strategy","方法"]].map(([en,ja])=>({en,ja,example:`The data shows a ${en}.`})),
  10: [["viewpoint","視点"],["identity","アイデンティティ"],["global","世界の"],["argument","主張"],["however","しかし"],["solution","解決策"]].map(([en,ja])=>({en,ja,example:`However, another viewpoint is important.`})),
  11: [["debate","討論"],["policy","政策"],["counterargument","反論"],["rhetoric","修辞"],["society","社会"],["ethical","倫理的な"]].map(([en,ja])=>({en,ja,example:`A counterargument can make a debate stronger.`})),
  12: [["portfolio","ポートフォリオ"],["academic","学術的な"],["professional","職業的な"],["interview","面接"],["reflection","振り返り"],["revision","修正"]].map(([en,ja])=>({en,ja,example:`My portfolio shows my English growth.`}))
};

const framesByGrade: Record<number, string[]> = {
  1: ["I am __.", "This is a __.", "I like __."], 2: ["What is this?", "It is __.", "I have __."],
  3: ["I go to __.", "There is a __.", "I do __ in the morning."], 4: ["I was __.", "He/She has __.", "I played __."],
  5: ["First, __. Next, __. Finally, __.", "I think __ because __.", "__ is bigger than __."],
  6: ["I agree because __.", "In the future, I will __.", "My presentation is about __."],
  7: ["The cause is __.", "The effect is __.", "This paragraph explains __."],
  8: ["According to the source, __.", "In summary, __.", "I have already __."],
  9: ["The graph shows __.", "The evidence suggests __.", "If __, then __."],
  10: ["On the one hand, __.", "However, __.", "A possible solution is __."],
  11: ["The strongest argument is __.", "Some people argue that __.", "I respond by saying __."],
  12: ["My portfolio demonstrates __.", "I revised this because __.", "Professionally, I would say __."]
};

const scopeTitles = ["Sound Gate", "Word Garden", "Story Portal", "Speak Lab", "Puzzle Review", "Mini Project"];
const weeklyPlan = ["Listen and warm up", "Learn target words", "Practice sentence frame", "Read a story", "Play, speak, and review"];

function makePuzzles(words: VocabItem[], frames: string[]): Puzzle[] {
  const first = words[0];
  return [
    { type: "match", title: "Meaning match", prompt: `Choose the English word for ${first.ja}.`, items: words.slice(0,4).map(w=>w.en), answer: first.en },
    { type: "fill", title: "Frame builder", prompt: frames[0].replace("__", "____"), items: words.slice(0,4).map(w=>w.en), answer: words[1]?.en ?? first.en },
    { type: "order", title: "Sentence order", prompt: "Put the sentence in order.", items: ["I", "like", words[2]?.en ?? first.en], answer: `I, like, ${words[2]?.en ?? first.en}` }
  ];
}

function makeStory(grade: number, level: string, words: VocabItem[]) {
  const place = grade <= 3 ? "Hadano Library" : grade <= 6 ? "Mizunashi River" : grade <= 9 ? "Mount Kobo" : "Mirai Minds Studio";
  const title = grade <= 4 ? `A Small Day at ${place}` : grade <= 8 ? `The ${place} Project` : `The Future English Challenge`;
  const keyword = words[0].en;
  return {
    title,
    level,
    text: [
      `Today, Mina and Kaito visit ${place}.`,
      `They learn the word "${keyword}" and use it in a friendly sentence.`,
      `At first, English feels new, but slow listening helps them understand.`,
      `They read, play a game, and say one brave sentence aloud.`,
      `By the end, they feel proud because small practice became real progress.`
    ],
    comprehension: [
      { question: "Where do Mina and Kaito go?", choices: [place, "Tokyo Tower", "the airport", "the moon"], answer: place },
      { question: "What helps them understand?", choices: ["slow listening", "running fast", "closing the book", "skipping practice"], answer: "slow listening" },
      { question: "How do they feel at the end?", choices: ["proud", "angry", "sleepy", "lost"], answer: "proud" }
    ],
    readAloudTip: "Press Slow listen, point to each sentence, then repeat one line."
  };
}

function makeModules(grade: number, words: VocabItem[], frames: string[]): Module[] {
  const titles = grade <= 2 ? ["ABC & Phonics", "Picture Words", "Tiny Stories"] : grade <= 6 ? ["Vocabulary Builder", "Grammar Frame", "Reading Quest"] : ["Academic Words", "Discussion Frame", "Project Reading"];
  return titles.map((title, i) => ({
    title,
    focus: ["listen and repeat", "read and build", "speak and create"][i],
    miniLesson: `Use ${words[i]?.en ?? words[0].en} with the frame "${frames[i % frames.length]}".`,
    skills: ["listening", "reading", i === 2 ? "speaking" : "vocabulary"],
    vocabulary: words.slice(i * 2, i * 2 + 2).length ? words.slice(i * 2, i * 2 + 2) : words.slice(0, 2),
    grammar: frames,
    activities: ["Listen and point", "Say it slowly", "Try a mini puzzle", "Make your own sentence"],
    puzzles: makePuzzles(words, frames)
  }));
}

export const englishCurriculum: GradeCurriculum[] = gradeMeta.map(([grade, level, badge, theme, outcome]) => {
  const words = vocabByGrade[grade];
  const frames = framesByGrade[grade];
  return {
    grade, level, badge, theme, outcome,
    zeroStart: grade <= 2,
    essentialQuestion: grade <= 3 ? "How can I start English from zero and feel safe?" : grade <= 8 ? "How can I use English to share my world?" : "How can I use English to think, create, and communicate?",
    weeklyPlan,
    scopeSequence: scopeTitles.map((title, i) => ({
      week: i + 1,
      title,
      focus: ["sounds", "words", "stories", "speaking", "review", "project"][i],
      teacherGoal: `Help learners use Grade ${grade} English through pictures, stories, and games.`,
      studentCan: [`I can use ${words[i % words.length].en}.`, `I can say: ${frames[i % frames.length]}`, "I can try again after feedback."],
      activities: ["Warm-up chant", "Picture card challenge", "Pair or solo practice", "Mini quiz review"]
    })),
    modules: makeModules(grade, words, frames),
    story: makeStory(grade, level, words),
    readingLibrary: ["story", "dialogue", "nonfiction"].map((type, i) => ({
      title: `${type[0].toUpperCase()+type.slice(1)} Reader ${grade}.${i+1}`,
      type,
      summary: `A ${level} ${type} using Grade ${grade} vocabulary and sentence frames.`,
      tasks: ["Read aloud", "Answer two questions", "Retell with one sentence"]
    })),
    speakingMissions: [`Say three Grade ${grade} words slowly.`, `Ask and answer one question using: ${frames[0]}`, "Record and listen to your voice locally."],
    writingPrompts: [`Write 3 sentences using ${words[0].en}.`, "Draw a picture and label five English words.", `Complete the frame: ${frames[0]}`],
    games: [
      { title: "Word Matching", kind: "vocabulary", howToPlay: "Match Japanese meanings to English words.", content: words.slice(0,4).map(w=>w.en) },
      { title: "Sentence Builder", kind: "grammar", howToPlay: "Choose words to complete the frame.", content: frames },
      { title: "Story Order", kind: "reading", howToPlay: "Put story events in order.", content: ["first", "next", "finally"] },
      { title: "Spelling Race", kind: "phonics", howToPlay: "Listen and type the word.", content: words.slice(0,4).map(w=>w.en) }
    ],
    assessment: { canDo: [`I can understand Grade ${grade} words.`, "I can read a short text.", "I can speak or write using a frame."], reviewCycle: "Review stars, stories, and vocabulary weekly with local progress only." },
    parentGuide: grade <= 2 ? "Use Japanese support, slow audio, and short daily practice. Praise effort, not speed." : "Let children choose stories, explain ideas, and build a small portfolio over time.",
    project: grade <= 4 ? "Create a picture word book with English labels." : grade <= 8 ? "Create a short story, poster, or presentation." : "Create an English portfolio piece with reflection and revision."
  };
});

export function getGradeCurriculum(grade: number) {
  return englishCurriculum.find((item) => item.grade === grade);
}
