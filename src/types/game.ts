import { ClassroomObjectId, PositionId } from '../data/classroomData';

export interface QuestionOption {
  id: 'A' | 'B' | 'C';
  text: string;
  isCorrect: boolean;
}

export interface QuestionData {
  id: number;
  questionText: string;
  questionIndo: string;
  targetObject: string;
  targetPreposition: 'in' | 'on' | 'under' | 'beside' | 'behind' | 'between';
  scenePosition: PositionId;
  sceneSubject: ClassroomObjectId;
  sceneAnchor: ClassroomObjectId;
  sceneAnchorSecond?: ClassroomObjectId;
  difficulty?: 'easy' | 'medium' | 'hard';
  visualHintText: string;
  options: QuestionOption[];
  explanation: string;
  explanationIndo: string;
}

export interface LevelData {
  id: number;
  name: string;
  zoneTitle: string;
  zoneSub: string;
  backgroundTheme: 'classroom' | 'library' | 'study-area' | 'magic-board' | 'treasure-gate';
  enemyName: string;
  enemyTitle: string;
  enemyDescription: string;
  enemyIllustrationKey: 'dusty' | 'goblin' | 'king-pencil' | 'naughty-eraser' | 'paper-dragon';
  questions: QuestionData[];
  rewardStars: number;
  unlockedHint: string;
}

export interface VocabularyItem {
  id: string;
  category: 'classroom-objects' | 'prepositions';
  word: string;
  indonesian: string;
  exampleSentence: string;
  exampleIndonesian: string;
  objectId?: ClassroomObjectId;
  positionId?: PositionId;
  visualTag: string;
}

export type AvatarGender = 'boy' | 'girl';

export interface PlayerProfile {
  name: string;
  gender: AvatarGender;
  school: string;
  classGrade: string;
}
