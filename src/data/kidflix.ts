export type AgeBand = "3-5" | "6-8" | "9-12";

export type Show = {
  id: string;
  title: string;
  tagline: string;
  category: string;
  age: AgeBand;
  minutes: number;
  episodes: number;
  rating: number;
  color: "primary" | "sunny" | "mint" | "bubblegum" | "grape";
  seed: string;
  learns: string[];
  description: string;
  parentNote: string;
};

/** Open-licensed photography served through the Picsum (Unsplash-sourced) CDN. */
export const img = (seed: string, w = 800, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const shows: Show[] = [
  {
    id: "luna-and-friends",
    title: "Luna & Friends",
    tagline: "A giggly moon-cat and her backyard crew",
    category: "Adventure",
    age: "3-5",
    minutes: 18,
    episodes: 24,
    rating: 4.9,
    color: "primary",
    seed: "kidflix-luna",
    learns: ["Sharing", "Naming feelings", "Simple counting"],
    description:
      "Luna the moon-cat lands in a very ordinary backyard and finds it is not ordinary at all. Each gentle episode ends with a calm-down song instead of a cliffhanger.",
    parentNote: "No jump scares, no cliffhangers, volume normalised to 78 dB.",
  },
  {
    id: "wonder-woods",
    title: "Wonder Woods",
    tagline: "Nature walks with a talking compass",
    category: "Nature",
    age: "6-8",
    minutes: 22,
    episodes: 32,
    rating: 4.8,
    color: "mint",
    seed: "kidflix-woods",
    learns: ["Habitats", "Seasons", "Observation"],
    description:
      "Pip and a chatty brass compass map a forest one square metre at a time, counting beetles and befriending a very slow snail called Turbo.",
    parentNote: "Real field footage mixed with animation. Narrated slowly.",
  },
  {
    id: "tiny-tinkerers",
    title: "Tiny Tinkerers",
    tagline: "Build it, break it, build it better",
    category: "Learn & make",
    age: "6-8",
    minutes: 14,
    episodes: 40,
    rating: 4.7,
    color: "sunny",
    seed: "kidflix-tinker",
    learns: ["Cause & effect", "Measuring", "Persistence"],
    description:
      "A workshop of kid inventors turns cardboard into catapults, marble runs and one suspiciously wobbly robot named Clang.",
    parentNote: "Every build uses household materials. Safety beat before each step.",
  },
  {
    id: "the-cloud-club",
    title: "The Cloud Club",
    tagline: "Big feelings, small clouds",
    category: "Feelings",
    age: "3-5",
    minutes: 16,
    episodes: 18,
    rating: 4.9,
    color: "grape",
    seed: "kidflix-cloud",
    learns: ["Emotion words", "Breathing", "Empathy"],
    description:
      "Five clouds with five moods drift over a sleepy town. When one turns grey, the others learn to sit beside it instead of fixing it.",
    parentNote: "Includes a 60-second guided breathing outro.",
  },
  {
    id: "rocket-recess",
    title: "Rocket Recess",
    tagline: "Playground physics at warp speed",
    category: "Science",
    age: "9-12",
    minutes: 24,
    episodes: 28,
    rating: 4.6,
    color: "bubblegum",
    seed: "kidflix-rocket",
    learns: ["Forces", "Hypotheses", "Teamwork"],
    description:
      "Two rival recess crews settle every argument with an experiment, a stopwatch and one extremely patient caretaker.",
    parentNote: "Mild competitive banter, always resolved kindly.",
  },
  {
    id: "noodle-kitchen",
    title: "Noodle Kitchen",
    tagline: "Cooking show for very short chefs",
    category: "Learn & make",
    age: "6-8",
    minutes: 20,
    episodes: 22,
    rating: 4.8,
    color: "sunny",
    seed: "kidflix-noodle",
    learns: ["Fractions", "Food cultures", "Kitchen safety"],
    description:
      "Chef Momo cooks one dish from one grandparent's recipe box per episode, with a no-knife rule and a lot of flour on the ceiling.",
    parentNote: "Adult-help prompts appear before any heat is used.",
  },
  {
    id: "dino-daycare",
    title: "Dino Daycare",
    tagline: "Toddler dinosaurs, giant naps",
    category: "Comedy",
    age: "3-5",
    minutes: 12,
    episodes: 36,
    rating: 4.7,
    color: "mint",
    seed: "kidflix-dino",
    learns: ["Routines", "Turn taking", "Vocabulary"],
    description:
      "A very tired Triceratops runs a daycare for hatchlings who have not yet learned that stomping indoors is a choice.",
    parentNote: "Slapstick only. No chase sequences.",
  },
  {
    id: "starlight-stories",
    title: "Starlight Stories",
    tagline: "Bedtime tales that actually end",
    category: "Bedtime",
    age: "3-5",
    minutes: 10,
    episodes: 44,
    rating: 5,
    color: "primary",
    seed: "kidflix-star",
    learns: ["Listening", "Imagination", "Wind-down"],
    description:
      "Hand-painted folk tales read at a whisper, with the screen slowly dimming to almost black by the final minute.",
    parentNote: "Auto-stops at the end. Screen dims to reduce blue light.",
  },
  {
    id: "code-critters",
    title: "Code Critters",
    tagline: "Debug the bug, save the garden",
    category: "Science",
    age: "9-12",
    minutes: 26,
    episodes: 20,
    rating: 4.6,
    color: "grape",
    seed: "kidflix-code",
    learns: ["Sequencing", "Loops", "Logic"],
    description:
      "A squad of beetles writes instructions for their garden robot. When the robot misbehaves, the crew reads the code line by line.",
    parentNote: "Companion unplugged activity per episode.",
  },
  {
    id: "melody-market",
    title: "Melody Market",
    tagline: "A market stall for every instrument",
    category: "Music",
    age: "6-8",
    minutes: 18,
    episodes: 26,
    rating: 4.8,
    color: "bubblegum",
    seed: "kidflix-melody",
    learns: ["Rhythm", "Instruments", "World music"],
    description:
      "Every Saturday the market fills with instruments from somewhere new, and the whole town accidentally forms an orchestra.",
    parentNote: "Great for movement breaks. Lyrics on screen.",
  },
  {
    id: "ocean-oddballs",
    title: "Ocean Oddballs",
    tagline: "The weirdest neighbours in the reef",
    category: "Nature",
    age: "9-12",
    minutes: 22,
    episodes: 18,
    rating: 4.7,
    color: "mint",
    seed: "kidflix-ocean",
    learns: ["Ecosystems", "Adaptation", "Conservation"],
    description:
      "A pufferfish documentary host introduces reef residents who are strange, useful and occasionally extremely rude.",
    parentNote: "Gentle conservation framing, no predation footage.",
  },
  {
    id: "paint-parade",
    title: "Paint Parade",
    tagline: "Ten minutes, one messy masterpiece",
    category: "Art",
    age: "3-5",
    minutes: 11,
    episodes: 30,
    rating: 4.9,
    color: "sunny",
    seed: "kidflix-paint",
    learns: ["Colour mixing", "Shapes", "Fine motor"],
    description:
      "Follow-along painting with a narrator who celebrates smudges as an important artistic decision.",
    parentNote: "Pause-friendly. Materials list shown up front.",
  },
];

export const ageBands: { id: AgeBand | "all"; label: string; blurb: string }[] = [
  { id: "all", label: "All shows", blurb: "Everything approved for this profile" },
  { id: "3-5", label: "3–5 years", blurb: "Slow, soft, sing-along" },
  { id: "6-8", label: "6–8 years", blurb: "Curious, playful, hands-on" },
  { id: "9-12", label: "9–12 years", blurb: "Deeper stories and real science" },
];

export const categories = [
  "Adventure",
  "Nature",
  "Learn & make",
  "Feelings",
  "Science",
  "Comedy",
  "Bedtime",
  "Music",
  "Art",
];

export const collections = [
  {
    id: "calm-down",
    title: "Calm-down corner",
    blurb: "Slow pacing, soft sound, no cliffhangers",
    tone: "mint" as const,
    showIds: ["the-cloud-club", "starlight-stories", "paint-parade", "dino-daycare"],
  },
  {
    id: "curious-kids",
    title: "For the endlessly curious",
    blurb: "Ask a question, get an experiment",
    tone: "sunny" as const,
    showIds: ["tiny-tinkerers", "rocket-recess", "code-critters", "wonder-woods"],
  },
  {
    id: "move-it",
    title: "Wiggle it out",
    blurb: "Songs and stretches between the sitting",
    tone: "bubblegum" as const,
    showIds: ["melody-market", "noodle-kitchen", "luna-and-friends", "ocean-oddballs"],
  },
];

export const weekWatch = [
  { day: "M", minutes: 34 },
  { day: "T", minutes: 52 },
  { day: "W", minutes: 28 },
  { day: "T", minutes: 41 },
  { day: "F", minutes: 76 },
  { day: "S", minutes: 68 },
  { day: "S", minutes: 22 },
];

export const kidProfiles = [
  {
    id: "jamie",
    name: "Jamie",
    age: 6,
    band: "6-8" as AgeBand,
    color: "sunny" as const,
    avatarSeed: "kidflix-avatar-jamie",
    streak: 4,
    dailyLimit: 80,
    watchedToday: 48,
    favourite: "Tiny Tinkerers",
  },
  {
    id: "arun",
    name: "Arun",
    age: 4,
    band: "3-5" as AgeBand,
    color: "mint" as const,
    avatarSeed: "kidflix-avatar-arun",
    streak: 2,
    dailyLimit: 45,
    watchedToday: 20,
    favourite: "Dino Daycare",
  },
  {
    id: "nila",
    name: "Nila",
    age: 10,
    band: "9-12" as AgeBand,
    color: "grape" as const,
    avatarSeed: "kidflix-avatar-nila",
    streak: 7,
    dailyLimit: 100,
    watchedToday: 65,
    favourite: "Code Critters",
  },
];

export const badges = [
  { id: "explorer", label: "Forest explorer", note: "Finished Wonder Woods S1", tone: "mint" },
  { id: "builder", label: "Master builder", note: "12 Tinkerers builds", tone: "sunny" },
  { id: "calm", label: "Calm cloud", note: "7 breathing outros", tone: "grape" },
  { id: "reader", label: "Story listener", note: "20 bedtime tales", tone: "primary" },
];

export const getShow = (id: string) => shows.find((s) => s.id === id);

export const toneClass: Record<Show["color"], string> = {
  primary: "bg-primary text-primary-foreground",
  sunny: "bg-sunny text-sunny-foreground",
  mint: "bg-mint text-mint-foreground",
  bubblegum: "bg-bubblegum text-bubblegum-foreground",
  grape: "bg-grape text-grape-foreground",
};
