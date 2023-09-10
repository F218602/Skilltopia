// question.interface.ts

export interface QuizQuestion {
    questionNo: number;
    question: string;
    options: string[];
    correctOption: number;
  }
  
  export interface Quiz {
    moduleID: number;
    moduleName: string;
    questionCount: number;
    questions: QuizQuestion[];
  }