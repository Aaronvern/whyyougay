export interface OptionType {
  text: string;
  emoji: string;
}

export interface QuestionType {
  text: string;
  emoji: string;
  options: OptionType[];
  funFact?: string;
}