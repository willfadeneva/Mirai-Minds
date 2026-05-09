export type ReadingStory = {
  id: string;
  grade: number;
  title: string;
  source: "public-domain adapted" | "original" | "classic-inspired";
  level: string;
  theme: string;
  estimatedMinutes: number;
  vocabulary: string[];
  paragraphs: string[];
  comprehension: { question: string; answer: string }[];
  activity: string;
};

type StorySeed = {
  baseTitle: string;
  theme: string;
  wordA: string;
  wordB: string;
  plot: string[];
};

const levels = [
  "Pre-A1 picture reader",
  "Pre-A1 tiny sentence reader",
  "A1 short story reader",
  "A1 story builder",
  "A2 sequence reader",
  "A2 confident reader",
  "A2+ paragraph reader",
  "B1 discussion reader",
  "B1 academic reader",
  "B1+ critical reader",
  "B2 debate reader",
  "B2 future communicator"
] as const;

const popularStorySeeds = [
  {
    "baseTitle": "The Lion and the Mouse",
    "theme": "kindness",
    "wordA": "lion",
    "wordB": "mouse",
    "plot": [
      "A proud lion sleeps under a warm tree. A tiny mouse runs across his paw and wakes him.",
      "The lion catches the mouse and says, 'You are too small to help anyone.' The mouse asks kindly to be free.",
      "Later, hunters tie the lion in a strong net. He roars, but the ropes do not break.",
      "The mouse hears him, runs back, and bites the ropes little by little until the lion is free.",
      "The lion learns that kindness is never small. Even a tiny friend can give great help."
    ]
  },
  {
    "baseTitle": "The Tortoise and the Hare",
    "theme": "patience",
    "wordA": "tortoise",
    "wordB": "hare",
    "plot": [
      "A fast hare laughs at a slow tortoise on the road. 'You will never win a race,' says the hare.",
      "The tortoise answers, 'I may be slow, but I will keep going.' The animals choose a tree as the finish line.",
      "The hare runs far ahead and feels sure he will win. He lies down for a short nap under the sun.",
      "The tortoise walks one steady step after another. He passes the sleeping hare and reaches the tree.",
      "The hare wakes too late. The tortoise wins because steady work can beat careless speed."
    ]
  },
  {
    "baseTitle": "The Ant and the Grasshopper",
    "theme": "preparation",
    "wordA": "ant",
    "wordB": "grasshopper",
    "plot": [
      "In summer, an ant carries grain to her small home. A grasshopper sings in the grass all day.",
      "The grasshopper says, 'Why work now? The sun is bright.' The ant says, 'Winter will come.'",
      "The ant keeps storing food. The grasshopper keeps singing and forgets to prepare.",
      "When cold winter arrives, the grasshopper has no food. He knocks on the ant's door and asks for help.",
      "The ant shares a little food and teaches him to plan ahead. The grasshopper promises to work before the next winter."
    ]
  },
  {
    "baseTitle": "The Fox and the Grapes",
    "theme": "honesty",
    "wordA": "fox",
    "wordB": "grapes",
    "plot": [
      "A hungry fox sees purple grapes hanging high on a vine. They look sweet and fresh.",
      "He jumps once, twice, and three times, but his paws cannot reach them.",
      "The fox feels embarrassed because a crow is watching from a fence.",
      "Instead of saying, 'I cannot reach them,' the fox says, 'Those grapes are probably sour.'",
      "He walks away hungry. The story reminds readers to be honest about disappointment."
    ]
  },
  {
    "baseTitle": "The Boy Who Cried Wolf",
    "theme": "truth",
    "wordA": "boy",
    "wordB": "wolf",
    "plot": [
      "A shepherd boy watches sheep near a quiet village. He feels bored and wants attention.",
      "He shouts, 'Wolf! Wolf!' The villagers run up the hill, but there is no wolf.",
      "The boy laughs. He plays the same trick again, and the villagers become angry.",
      "One evening a real wolf comes. The boy shouts for help, but no one believes him.",
      "The wolf scares the sheep away. The boy learns that trust is easy to lose and hard to win back."
    ]
  },
  {
    "baseTitle": "The Crow and the Pitcher",
    "theme": "problem solving",
    "wordA": "crow",
    "wordB": "water",
    "plot": [
      "A thirsty crow flies over dry fields. At last, he sees a pitcher with a little water inside.",
      "The water is too low for his beak. He pushes the pitcher, but it does not fall.",
      "The crow looks around and sees small stones on the ground.",
      "He drops one stone, then another, into the pitcher. Slowly, the water rises.",
      "At last he drinks. The crow solves the problem by thinking carefully and trying a new idea."
    ]
  },
  {
    "baseTitle": "The Goose and the Golden Egg",
    "theme": "greed",
    "wordA": "goose",
    "wordB": "egg",
    "plot": [
      "A farmer owns a goose that lays one golden egg every morning. The farmer becomes rich little by little.",
      "At first he is thankful, but soon he wants all the gold at once.",
      "He thinks, 'There must be many golden eggs inside the goose.'",
      "He hurts the goose to find the gold, but there are no eggs inside.",
      "The farmer loses the goose and the daily gift. Greed destroys what patience could protect."
    ]
  },
  {
    "baseTitle": "The Town Mouse and the Country Mouse",
    "theme": "choices",
    "wordA": "town",
    "wordB": "country",
    "plot": [
      "A country mouse invites his town cousin to a simple meal of rice and seeds.",
      "The town mouse says, 'Come to my home. I have cakes, cheese, and sweet fruit.'",
      "In the town house, the food is wonderful, but a cat and a person frighten them again and again.",
      "The country mouse runs back to the quiet field and breathes slowly.",
      "He chooses simple food with peace over rich food with fear."
    ]
  },
  {
    "baseTitle": "The Three Little Pigs",
    "theme": "planning",
    "wordA": "house",
    "wordB": "wind",
    "plot": [
      "Three little pigs leave home to build their own houses. The first uses straw, and the second uses sticks.",
      "The third pig works longer and builds with strong bricks.",
      "A hungry wolf comes and blows down the straw house. Then he blows down the stick house.",
      "The first two pigs run to their brother's brick house. The wolf blows hard, but the brick house stands.",
      "The pigs learn that careful planning and hard work can keep everyone safe."
    ]
  },
  {
    "baseTitle": "Little Red Riding Hood",
    "theme": "safety",
    "wordA": "forest",
    "wordB": "grandmother",
    "plot": [
      "A girl in a red hood carries food to her grandmother across the forest.",
      "Her mother says, 'Stay on the path and do not talk to strangers.'",
      "A wolf meets the girl and asks many questions. She forgets the warning and tells him where Grandmother lives.",
      "The wolf runs ahead and tricks everyone, but a kind woodcutter hears trouble and helps them.",
      "The girl learns to listen to safety advice and be careful on the road."
    ]
  },
  {
    "baseTitle": "Cinderella",
    "theme": "hope",
    "wordA": "shoe",
    "wordB": "dance",
    "plot": [
      "Cinderella works all day in a house where others are unkind to her. She still speaks gently and keeps hope in her heart.",
      "One night there is a dance at the palace, but Cinderella is told she cannot go.",
      "A magical helper gives her a dress, a carriage, and glass shoes, but warns her to return before midnight.",
      "At the dance, Cinderella is happy and brave. She leaves one glass shoe behind when the clock strikes twelve.",
      "The shoe helps the prince find her, and Cinderella's life changes because she never loses hope or kindness."
    ]
  },
  {
    "baseTitle": "Snow White",
    "theme": "friendship",
    "wordA": "apple",
    "wordB": "mirror",
    "plot": [
      "A queen asks a magic mirror who is the fairest. The mirror answers, 'Snow White.'",
      "Snow White must leave the castle and finds a small house in the forest.",
      "Seven kind friends welcome her and ask her to be careful with strangers.",
      "A dangerous apple puts Snow White into a deep sleep, but love and friendship do not forget her.",
      "Her friends protect her until she wakes, and the story shows the power of loyal friendship."
    ]
  },
  {
    "baseTitle": "Jack and the Beanstalk",
    "theme": "courage",
    "wordA": "beanstalk",
    "wordB": "giant",
    "plot": [
      "Jack trades the family cow for magic beans. His mother is upset and throws the beans outside.",
      "By morning, a huge beanstalk reaches into the clouds.",
      "Jack climbs it and finds a giant's castle with gold and a magical harp.",
      "He must be brave, but he must also learn the difference between courage and recklessness.",
      "When Jack returns home, he uses what he gained to help his family and chooses wiser actions."
    ]
  },
  {
    "baseTitle": "Goldilocks and the Three Bears",
    "theme": "respect",
    "wordA": "home",
    "wordB": "bears",
    "plot": [
      "Goldilocks walks into the forest and finds a small house. No one answers when she knocks.",
      "She goes inside, tastes porridge, sits in chairs, and lies in beds without permission.",
      "The three bears come home and see that someone has touched their things.",
      "Goldilocks wakes, feels scared and sorry, and runs home.",
      "The story teaches respect for other people's homes and belongings."
    ]
  },
  {
    "baseTitle": "The Ugly Duckling",
    "theme": "growth",
    "wordA": "duckling",
    "wordB": "swan",
    "plot": [
      "A gray duckling hatches in a nest. Other birds laugh because he looks different.",
      "The duckling feels lonely and travels through rain, snow, and cold wind.",
      "He keeps growing, even when he does not understand who he is.",
      "In spring, he sees beautiful swans on the water and looks at his reflection.",
      "He discovers he is a swan. The story shows that growth takes time and difference can become beauty."
    ]
  },
  {
    "baseTitle": "The Emperor's New Clothes",
    "theme": "truth",
    "wordA": "emperor",
    "wordB": "clothes",
    "plot": [
      "An emperor loves expensive clothes more than wise decisions.",
      "Two tricksters promise to make magical cloth that foolish people cannot see.",
      "No one wants to admit they see nothing, so everyone praises the empty cloth.",
      "During a parade, a child says honestly, 'But he is wearing nothing.'",
      "The crowd realizes the truth. The story reminds readers that honest words can be powerful."
    ]
  },
  {
    "baseTitle": "The Little Match Girl",
    "theme": "empathy",
    "wordA": "light",
    "wordB": "winter",
    "plot": [
      "On a freezing winter night, a poor girl tries to sell matches in the street.",
      "She lights one match to warm her fingers and sees a gentle vision of comfort.",
      "Each small light shows her food, warmth, and someone who loves her.",
      "People pass by without noticing her need.",
      "The story asks readers to feel empathy and to notice people who are cold, hungry, or alone."
    ]
  },
  {
    "baseTitle": "The Princess and the Pea",
    "theme": "details",
    "wordA": "princess",
    "wordB": "pea",
    "plot": [
      "A prince wants to find a true princess, but he does not know how to choose wisely.",
      "One stormy night, a wet traveler knocks on the palace door and says she is a princess.",
      "The queen places a tiny pea under many mattresses to test her sensitivity.",
      "In the morning, the traveler says she slept badly because something hard was under the bed.",
      "The family believes her. The story reminds readers that small details can reveal hidden truths."
    ]
  },
  {
    "baseTitle": "Ali Baba and the Cave",
    "theme": "wisdom",
    "wordA": "cave",
    "wordB": "treasure",
    "plot": [
      "Ali Baba sees thieves open a secret cave with special words.",
      "Inside the cave is treasure, but danger stands near every shiny coin.",
      "Ali Baba takes only a little and tries to keep the secret safe.",
      "Greedy people learn the words but forget caution and kindness.",
      "Wisdom, not treasure, saves Ali Baba and his family from danger."
    ]
  },
  {
    "baseTitle": "Aladdin and the Lamp",
    "theme": "choices",
    "wordA": "lamp",
    "wordB": "wish",
    "plot": [
      "Aladdin finds an old lamp in a hidden place. When he rubs it, a powerful helper appears.",
      "The lamp can grant wishes, but every wish creates new responsibilities.",
      "Aladdin first wants riches and comfort, then learns that trust and courage matter more.",
      "A trickster tries to steal the lamp and control its power.",
      "Aladdin wins by making wiser choices and protecting the people he loves."
    ]
  },
  {
    "baseTitle": "The Fisherman and the Magic Fish",
    "theme": "gratitude",
    "wordA": "fish",
    "wordB": "sea",
    "plot": [
      "A poor fisherman catches a magic fish that begs to return to the sea.",
      "The fisherman kindly lets it go, and the fish offers him a wish.",
      "At home, someone asks for more and more: a better house, more power, and greater status.",
      "The sea grows darker each time the wishes become greedier.",
      "In the end, the gifts disappear. The story teaches gratitude and balance."
    ]
  },
  {
    "baseTitle": "The Bremen Town Musicians",
    "theme": "teamwork",
    "wordA": "animals",
    "wordB": "music",
    "plot": [
      "A donkey, dog, cat, and rooster leave homes where they are no longer valued.",
      "They decide to travel to Bremen and become musicians together.",
      "On the road, they find a house with robbers inside.",
      "The animals stand on one another and make a huge, strange sound. The robbers run away in fear.",
      "The animals make a new home together. Their teamwork turns weakness into strength."
    ]
  },
  {
    "baseTitle": "The Elves and the Shoemaker",
    "theme": "helping",
    "wordA": "shoes",
    "wordB": "elves",
    "plot": [
      "A poor shoemaker has leather for only one last pair of shoes.",
      "He cuts the leather and goes to sleep, worried about tomorrow.",
      "In the morning, he finds perfect shoes already made. Customers love them.",
      "He and his wife discover tiny elves helping at night and make warm clothes to thank them.",
      "The story shows that kindness can move in both directions: help received and help returned."
    ]
  },
  {
    "baseTitle": "The Little Mermaid",
    "theme": "dreams",
    "wordA": "sea",
    "wordB": "voice",
    "plot": [
      "A young mermaid lives under the sea and dreams about the human world above.",
      "She saves a prince during a storm and wants to walk on land.",
      "To follow her dream, she gives up her beautiful voice and faces a painful choice.",
      "On land, she learns that dreams can be wonderful but also costly.",
      "The story invites readers to think carefully about desire, sacrifice, and identity."
    ]
  },
  {
    "baseTitle": "The Wind in the Willows",
    "theme": "friendship",
    "wordA": "river",
    "wordB": "boat",
    "plot": [
      "Mole leaves his underground home and discovers the shining river.",
      "Rat welcomes him into a boat and teaches him to enjoy the water calmly.",
      "Their friend Toad loves adventure too much and often creates trouble.",
      "The friends help one another through mistakes, danger, and change.",
      "The river becomes a place where friendship grows through patience and loyalty."
    ]
  },
  {
    "baseTitle": "Peter Rabbit's Garden",
    "theme": "rules",
    "wordA": "rabbit",
    "wordB": "garden",
    "plot": [
      "Peter Rabbit is told not to enter the farmer's garden.",
      "The vegetables look delicious, and Peter squeezes under the gate anyway.",
      "He eats too much and suddenly sees the farmer running toward him.",
      "Peter loses his way, his shoes, and his coat before he escapes home.",
      "He is safe at last, but tired and sorry. The story teaches that rules often protect us."
    ]
  },
  {
    "baseTitle": "The Secret Garden Door",
    "theme": "curiosity",
    "wordA": "garden",
    "wordB": "key",
    "plot": [
      "A lonely child hears about a locked garden that no one has entered for years.",
      "One windy day, a robin leads the child to a hidden key in the soil.",
      "The door opens to a quiet place full of sleeping plants.",
      "With care, water, and friendship, the garden begins to bloom again.",
      "The child changes too, learning that curiosity and care can bring life back."
    ]
  },
  {
    "baseTitle": "The Wonderful Journey",
    "theme": "adventure",
    "wordA": "map",
    "wordB": "road",
    "plot": [
      "A young traveler finds a map with a road that crosses forests, hills, and rivers.",
      "At first, the traveler wants only to reach the end quickly.",
      "Along the way, new friends need help, and each stop teaches a useful lesson.",
      "The traveler discovers that the journey itself is changing the heart and mind.",
      "When the road ends, the traveler is wiser, kinder, and ready for a new beginning."
    ]
  },
  {
    "baseTitle": "The Blue Bird",
    "theme": "happiness",
    "wordA": "bird",
    "wordB": "home",
    "plot": [
      "Two children search for a blue bird that is said to bring happiness.",
      "They look in magical places, bright halls, and faraway lands.",
      "Many beautiful things appear, but none stay with them for long.",
      "When they return home, they notice a blue bird near their own window.",
      "The story teaches that happiness is often close, simple, and easy to miss."
    ]
  },
  {
    "baseTitle": "The Happy Prince",
    "theme": "generosity",
    "wordA": "statue",
    "wordB": "city",
    "plot": [
      "A golden statue of a prince stands above a city and sees people suffering below.",
      "A small swallow rests at the statue's feet before flying to a warmer place.",
      "The prince asks the swallow to carry his jewels and gold to people who need help.",
      "The swallow stays longer and longer, giving comfort to strangers.",
      "The prince loses his shine, but his generosity makes the city kinder."
    ]
  }
] satisfies StorySeed[];

function splitSentence(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function beginnerParagraphs(seed: StorySeed, grade: number) {
  const [p1, p2, p3, p4, p5] = seed.plot.map(splitSentence);

  if (grade === 1) {
    return [
      `${seed.wordA} is in the story. ${seed.wordB} is in the story too.`,
      p1.split(". ")[0] + ".",
      p2.split(". ")[0] + ".",
      p3.split(". ")[0] + ".",
      p4.split(". ")[0] + ".",
      `The story teaches ${seed.theme}. I can say: ${seed.wordA}, ${seed.wordB}, ${seed.theme}.`,
    ];
  }

  return [
    p1,
    p2,
    p3,
    p4,
    p5,
    `I can retell this story with simple English: first, next, then, finally. The big idea is ${seed.theme}.`,
  ];
}

function middleParagraphs(seed: StorySeed, grade: number) {
  const [p1, p2, p3, p4, p5] = seed.plot.map(splitSentence);

  if (grade <= 4) {
    return [
      p1,
      p2,
      `At this point, the problem becomes clear. The characters must think about ${seed.theme}, not only about what they want right now.`,
      p3,
      p4,
      p5,
      `After reading, students can describe the beginning, middle, and ending. They can also explain why ${seed.wordA} and ${seed.wordB} are important in the story.`,
    ];
  }

  return [
    `${seed.baseTitle} begins with a character facing an ordinary situation that quickly becomes a test of judgment. ${p1}`,
    p2,
    `The conflict grows because the character must choose between an easy action and a wiser action. The theme of ${seed.theme} becomes stronger with every choice.`,
    p3,
    p4,
    p5,
    `This version is written for English learners who are ready to retell events in order, give opinions, and support ideas with details from the text.`,
  ];
}

function advancedParagraphs(seed: StorySeed, grade: number) {
  const [p1, p2, p3, p4, p5] = seed.plot.map(splitSentence);

  if (grade <= 8) {
    return [
      `${seed.baseTitle} is a classic reading about ${seed.theme}. ${p1}`,
      p2,
      `The story becomes interesting because the main character does not only face an outside problem. There is also an inside problem: fear, pride, impatience, greed, or confusion.`,
      p3,
      p4,
      p5,
      `Readers should notice cause and effect. One decision leads to a result, and that result changes how the character understands the world.`,
      `Discussion idea: connect the lesson to school, family, friendship, online behavior, or life in your community.`,
    ];
  }

  if (grade <= 10) {
    return [
      `${seed.baseTitle} is adapted here as a longer critical-reading text. ${p1}`,
      p2,
      `The plot may seem simple, but it raises a serious question: what should a person do when desire, pressure, and responsibility pull in different directions?`,
      p3,
      p4,
      p5,
      `The objects and images in the story, especially ${seed.wordA} and ${seed.wordB}, work as clues. They help readers infer the character's values and the writer's message.`,
      `A strong response should include a claim, evidence from the story, and an explanation of how that evidence supports the claim.`,
      `Modern connection: explain where a similar problem appears today, such as in school life, social media, friendship, money, family expectations, or technology.`,
    ];
  }

  return [
    `${seed.baseTitle} appears in this library as an advanced public-domain adapted reading for fluent communication practice. ${p1}`,
    p2,
    `The narrative can be read on two levels. On the surface, it is an entertaining story with clear events. At a deeper level, it studies ${seed.theme} and the consequences of human choice.`,
    p3,
    `The turning point matters because it reveals whether the character understands the difference between immediate desire and long-term responsibility.`,
    p4,
    p5,
    `For Grade ${grade}, learners should analyze how images such as ${seed.wordA} and ${seed.wordB} shape tone, conflict, and interpretation.`,
    `Extension: compare this story with another folktale or modern film. Ask whether the original lesson still works today, or whether the message changes in a new cultural context.`,
    `Portfolio task: transform the story into a short speech, debate point, presentation slide, diary entry, or reflective essay.`,
  ];
}

function paragraphsForGrade(seed: StorySeed, grade: number) {
  if (grade <= 2) return beginnerParagraphs(seed, grade);
  if (grade <= 6) return middleParagraphs(seed, grade);
  return advancedParagraphs(seed, grade);
}

function titleForGrade(seed: StorySeed, grade: number) {
  if (grade <= 2) return `${seed.baseTitle}: Easy Reader`;
  if (grade <= 6) return `${seed.baseTitle}: Story Quest`;
  if (grade <= 9) return `${seed.baseTitle}: Reading & Thinking`;
  return `${seed.baseTitle}: Critical Reading`;
}

function buildStory(grade: number, index: number): ReadingStory {
  const seed = popularStorySeeds[index % popularStorySeeds.length];
  const paragraphs = paragraphsForGrade(seed, grade);
  const minutes = grade <= 2 ? 5 : grade <= 6 ? 8 : grade <= 9 ? 12 : 16;

  return {
    id: `grade-${grade}-reading-${index + 1}`,
    grade,
    title: titleForGrade(seed, grade),
    source: index < 26 ? "public-domain adapted" : "classic-inspired",
    level: levels[grade - 1] ?? `Grade ${grade}`,
    theme: seed.theme,
    estimatedMinutes: minutes,
    vocabulary: [
      seed.wordA,
      seed.wordB,
      seed.theme,
      grade <= 4 ? "learn" : grade <= 8 ? "choice" : "interpretation",
      grade <= 2 ? "say" : grade <= 6 ? "retell" : "evidence",
    ],
    paragraphs,
    comprehension: [
      {
        question: "Who or what is important in this story?",
        answer: `${seed.wordA} and ${seed.wordB}`,
      },
      {
        question: "What problem happens in the story?",
        answer: grade <= 4
          ? "A character has a problem and must make a choice."
          : "A character faces a conflict that tests judgment, values, or responsibility.",
      },
      {
        question: "What is the main lesson or theme?",
        answer: seed.theme,
      },
      {
        question: "What should you do after reading?",
        answer: grade <= 6
          ? "Retell the story in order."
          : "Explain your idea with evidence from the story.",
      },
    ],
    activity: grade <= 2
      ? "Point to five words, say them slowly, draw one scene, and tell someone what happened."
      : grade <= 6
        ? "Retell the story using first, next, then, after that, and finally. Add one sentence about the lesson."
        : grade <= 9
          ? "Write one paragraph with a claim, evidence from the story, and an explanation."
          : "Prepare a short discussion answer that includes a claim, evidence, a counterpoint, and a modern connection.",
  };
}

export const gradeReadingLibrary: ReadingStory[] = Array.from(
  { length: 12 },
  (_, gradeIndex) => {
    const grade = gradeIndex + 1;
    return Array.from({ length: 30 }, (_, storyIndex) =>
      buildStory(grade, storyIndex)
    );
  }
).flat();

export function getReadingStoriesForGrade(grade: number) {
  return gradeReadingLibrary.filter((story) => story.grade === grade);
}

export function getReadingStoryById(id: string) {
  return gradeReadingLibrary.find((story) => story.id === id);
}
