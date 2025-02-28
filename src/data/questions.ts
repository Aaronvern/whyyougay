import { QuestionType } from '../types';

export const questions: QuestionType[] = [
  {
    text: "If your project had a theme song, which genre would it be?",
    emoji: "🎶",
    options: [
      { text: "Rock - for those hardcore coding sessions", emoji: "🔥" },
      { text: "Disco - because your code deserves a dance party", emoji: "💃" },
      { text: "Synthwave - retro futurism for modern problems", emoji: "🚀" },
      { text: "Classical - elegant solutions require elegant music", emoji: "🎻" }
    ],
    funFact: "Studies show that listening to music while coding can increase productivity by up to 20%... or lead to spontaneous keyboard drumming sessions."
  },
  {
    text: "What's the biggest challenge in your projects?",
    emoji: "🤔",
    options: [
      { text: "Debugging - where did that semicolon go?", emoji: "😵‍💫" },
      { text: "Procrastination - I'll finish it tomorrow, promise", emoji: "⏳" },
      { text: "Finding motivation - is this project really worth it?", emoji: "🤷" },
      { text: "Running out of snacks - the true developer crisis", emoji: "🍕" }
    ],
    funFact: "The average developer spends 70% of their time debugging and 30% of their time explaining why it's taking so long."
  },
  {
    text: "If your project was a superhero, what would its power be?",
    emoji: "🦸",
    options: [
      { text: "Lightning-fast execution - speed is my middle name", emoji: "⚡" },
      { text: "Predicting errors - I can see bugs before they happen", emoji: "🔮" },
      { text: "Looking cool with no real purpose - style over substance", emoji: "🕶️" },
      { text: "Automating everything - why work when robots can?", emoji: "🤖" }
    ],
    funFact: "If coding projects were superheroes, most would have the power of invisibility... because nobody can see how they actually work."
  },
  {
    text: "Choose an animal for your project:",
    emoji: "🐱",
    options: [
      { text: "A slow but wise turtle - steady wins the race", emoji: "🐢" },
      { text: "A magical unicorn - all sparkle, questionable existence", emoji: "🦄" },
      { text: "A gorilla - powerful but prone to breaking things", emoji: "🦍" },
      { text: "A clown fish - swimming through chaos with a smile", emoji: "🐠" }
    ],
    funFact: "In the animal kingdom of software, most projects start as eager rabbits and end as hibernating bears."
  },
  {
    text: "How do you celebrate when your code finally works?",
    emoji: "🎉",
    options: [
      { text: "Victory dance around the room", emoji: "💃" },
      { text: "Immediately break it by 'improving' it", emoji: "🔨" },
      { text: "Take a screenshot as proof it once worked", emoji: "📸" },
      { text: "Stare in disbelief wondering what fixed it", emoji: "😲" }
    ],
    funFact: "92% of developers have performed a 'success ritual' after fixing a particularly stubborn bug. The other 8% are lying."
  }
];