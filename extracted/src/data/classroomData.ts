export type ClassroomObjectId =
  | 'CHALK'
  | 'TABLE'
  | 'CLOCK'
  | 'CHAIR'
  | 'BLACKBOARD'
  | 'BAG'
  | 'CUPBOARD'
  | 'PENCIL'
  | 'BOOK'
  | 'CALENDAR'
  | 'GLOBE';

export type PositionId = 'IN' | 'ON' | 'UNDER' | 'BESIDE' | 'BEHIND' | 'BETWEEN';

export interface ClassroomObjectMeta {
  id: ClassroomObjectId;
  word: string;
  indonesian: string;
  pronunciation: string;
  exampleSentence: string;
  exampleIndonesian: string;
  accentColor: string;
}

export interface PositionMeta {
  id: PositionId;
  word: string;
  indonesian: string;
  description: string;
  exampleSentence: string;
  exampleIndonesian: string;
  accentColor: string;
}

export const CLASSROOM_OBJECTS: ClassroomObjectMeta[] = [
  {
    id: 'CHALK',
    word: 'CHALK',
    indonesian: 'Kapur tulis',
    pronunciation: '/tʃɔːk/',
    exampleSentence: 'The chalk is on the blackboard ledge.',
    exampleIndonesian: 'Kapur tulis itu ada di atas tempat kapur papan tulis.',
    accentColor: '#38BDF8',
  },
  {
    id: 'TABLE',
    word: 'TABLE',
    indonesian: 'Meja',
    pronunciation: '/ˈteɪ.bəl/',
    exampleSentence: 'There is a book on the table.',
    exampleIndonesian: 'Ada sebuah buku di atas meja.',
    accentColor: '#F59E0B',
  },
  {
    id: 'CLOCK',
    word: 'CLOCK',
    indonesian: 'Jam dinding',
    pronunciation: '/klɒk/',
    exampleSentence: 'The clock is beside the blackboard.',
    exampleIndonesian: 'Jam dinding itu ada di samping papan tulis.',
    accentColor: '#F472B6',
  },
  {
    id: 'CHAIR',
    word: 'CHAIR',
    indonesian: 'Kursi',
    pronunciation: '/tʃeər/',
    exampleSentence: 'The bag is under the chair.',
    exampleIndonesian: 'Tas itu ada di bawah kursi.',
    accentColor: '#0EA5E9',
  },
  {
    id: 'BLACKBOARD',
    word: 'BLACKBOARD',
    indonesian: 'Papan tulis',
    pronunciation: '/ˈblæk.bɔːd/',
    exampleSentence: 'Ustadzah Shofa writes on the blackboard.',
    exampleIndonesian: 'Ustadzah Shofa menulis di papan tulis.',
    accentColor: '#10B981',
  },
  {
    id: 'BAG',
    word: 'BAG',
    indonesian: 'Tas',
    pronunciation: '/bæɡ/',
    exampleSentence: 'My pencil is in the bag.',
    exampleIndonesian: 'Pensil saya ada di dalam tas.',
    accentColor: '#EC4899',
  },
  {
    id: 'CUPBOARD',
    word: 'CUPBOARD',
    indonesian: 'Lemari',
    pronunciation: '/ˈkʌb.əd/',
    exampleSentence: 'The books are in the cupboard.',
    exampleIndonesian: 'Buku-buku ada di dalam lemari.',
    accentColor: '#D97706',
  },
  {
    id: 'PENCIL',
    word: 'PENCIL',
    indonesian: 'Pensil',
    pronunciation: '/ˈpen.səl/',
    exampleSentence: 'The yellow pencil is on the table.',
    exampleIndonesian: 'Pensil kuning itu ada di atas meja.',
    accentColor: '#EAB308',
  },
  {
    id: 'BOOK',
    word: 'BOOK',
    indonesian: 'Buku',
    pronunciation: '/bʊk/',
    exampleSentence: 'I read an English book.',
    exampleIndonesian: 'Saya membaca buku Bahasa Inggris.',
    accentColor: '#3B82F6',
  },
  {
    id: 'CALENDAR',
    word: 'CALENDAR',
    indonesian: 'Kalender',
    pronunciation: '/ˈkæl.ən.dər/',
    exampleSentence: 'The calendar hangs beside the cupboard.',
    exampleIndonesian: 'Kalender itu tergantung di samping lemari.',
    accentColor: '#FB7185',
  },
  {
    id: 'GLOBE',
    word: 'GLOBE',
    indonesian: 'Bola dunia',
    pronunciation: '/ɡləʊb/',
    exampleSentence: 'The globe is on the teacher table.',
    exampleIndonesian: 'Bola dunia itu ada di atas meja guru.',
    accentColor: '#06B6D4',
  },
];

export const POSITIONS: PositionMeta[] = [
  {
    id: 'IN',
    word: 'IN',
    indonesian: 'Di dalam',
    description: 'Benda berada di bagian dalam wadah atau ruang.',
    exampleSentence: 'The pencil is in the bag.',
    exampleIndonesian: 'Pensil itu ada di dalam tas.',
    accentColor: '#3B82F6',
  },
  {
    id: 'ON',
    word: 'ON',
    indonesian: 'Di atas',
    description: 'Benda berada di atas dan menyentuh permukaan.',
    exampleSentence: 'The globe is on the table.',
    exampleIndonesian: 'Bola dunia itu ada di atas meja.',
    accentColor: '#10B981',
  },
  {
    id: 'UNDER',
    word: 'UNDER',
    indonesian: 'Di bawah',
    description: 'Benda berada tepat di bawah benda lain.',
    exampleSentence: 'The bag is under the chair.',
    exampleIndonesian: 'Tas itu ada di bawah kursi.',
    accentColor: '#F59E0B',
  },
  {
    id: 'BESIDE',
    word: 'BESIDE',
    indonesian: 'Di samping',
    description: 'Benda berada tepat di sebelah/samping benda lain.',
    exampleSentence: 'The clock is beside the blackboard.',
    exampleIndonesian: 'Jam dinding ada di samping papan tulis.',
    accentColor: '#8B5CF6',
  },
  {
    id: 'BEHIND',
    word: 'BEHIND',
    indonesian: 'Di belakang',
    description: 'Benda berada tersembunyi di bagian belakang benda lain.',
    exampleSentence: 'The bag is behind the chair.',
    exampleIndonesian: 'Tas itu ada di belakang kursi.',
    accentColor: '#EC4899',
  },
  {
    id: 'BETWEEN',
    word: 'BETWEEN',
    indonesian: 'Di antara',
    description: 'Benda berada di tengah-tengah antara dua benda.',
    exampleSentence: 'The chalk is between the books.',
    exampleIndonesian: 'Kapur itu ada di antara buku-buku.',
    accentColor: '#06B6D4',
  },
];

// 9 missions strictly mandated for FIND THE OBJECT (Section G.4)
export const FIND_OBJECT_MISSIONS: ClassroomObjectId[] = [
  'CHALK',
  'TABLE',
  'CLOCK',
  'CHAIR',
  'BLACKBOARD',
  'BAG',
  'CUPBOARD',
  'BOOK',
  'GLOBE',
];

export interface WhereIsItQuestion {
  id: number;
  subject: ClassroomObjectId;
  anchor: ClassroomObjectId;
  anchorSecond?: ClassroomObjectId;
  position: PositionId;
  questionText: string;
  questionIndo: string;
  explanationIndo: string;
}

export const WHERE_IS_IT_QUESTIONS: WhereIsItQuestion[] = [
  {
    id: 1,
    subject: 'PENCIL',
    anchor: 'BAG',
    position: 'IN',
    questionText: 'WHERE IS THE PENCIL?',
    questionIndo: 'Di manakah pensil berada?',
    explanationIndo: 'The pencil is IN the bag (Pensil ada di dalam tas).',
  },
  {
    id: 2,
    subject: 'GLOBE',
    anchor: 'TABLE',
    position: 'ON',
    questionText: 'WHERE IS THE GLOBE?',
    questionIndo: 'Di manakah bola dunia berada?',
    explanationIndo: 'The globe is ON the table (Bola dunia ada di atas meja).',
  },
  {
    id: 3,
    subject: 'BAG',
    anchor: 'CHAIR',
    position: 'UNDER',
    questionText: 'WHERE IS THE BAG?',
    questionIndo: 'Di manakah tas berada?',
    explanationIndo: 'The bag is UNDER the chair (Tas ada di bawah kursi).',
  },
  {
    id: 4,
    subject: 'CLOCK',
    anchor: 'BLACKBOARD',
    position: 'BESIDE',
    questionText: 'WHERE IS THE CLOCK?',
    questionIndo: 'Di manakah jam dinding berada?',
    explanationIndo: 'The clock is BESIDE the blackboard (Jam dinding ada di samping papan tulis).',
  },
  {
    id: 5,
    subject: 'BOOK',
    anchor: 'GLOBE',
    position: 'BEHIND',
    questionText: 'WHERE IS THE BOOK?',
    questionIndo: 'Di manakah buku berada?',
    explanationIndo: 'The book is BEHIND the globe (Buku ada di belakang bola dunia).',
  },
  {
    id: 6,
    subject: 'CHALK',
    anchor: 'BOOK',
    anchorSecond: 'GLOBE',
    position: 'BETWEEN',
    questionText: 'WHERE IS THE CHALK?',
    questionIndo: 'Di manakah kapur tulis berada?',
    explanationIndo: 'The chalk is BETWEEN the book and the globe (Kapur ada di antara buku dan bola dunia).',
  },
  {
    id: 7,
    subject: 'BOOK',
    anchor: 'BAG',
    position: 'IN',
    questionText: 'WHERE IS THE BOOK?',
    questionIndo: 'Di manakah buku berada?',
    explanationIndo: 'The book is IN the bag (Buku ada di dalam tas).',
  },
  {
    id: 8,
    subject: 'CHALK',
    anchor: 'TABLE',
    position: 'ON',
    questionText: 'WHERE IS THE CHALK?',
    questionIndo: 'Di manakah kapur tulis berada?',
    explanationIndo: 'The chalk is ON the table (Kapur ada di atas meja).',
  },
  {
    id: 9,
    subject: 'BOOK',
    anchor: 'CHAIR',
    position: 'UNDER',
    questionText: 'WHERE IS THE BOOK?',
    questionIndo: 'Di manakah buku berada?',
    explanationIndo: 'The book is UNDER the chair (Buku ada di bawah kursi).',
  },
  {
    id: 10,
    subject: 'CALENDAR',
    anchor: 'BLACKBOARD',
    position: 'BESIDE',
    questionText: 'WHERE IS THE CALENDAR?',
    questionIndo: 'Di manakah kalender berada?',
    explanationIndo: 'The calendar is BESIDE the blackboard (Kalender ada di samping papan tulis).',
  },
  {
    id: 11,
    subject: 'BAG',
    anchor: 'CHAIR',
    position: 'BEHIND',
    questionText: 'WHERE IS THE BAG?',
    questionIndo: 'Di manakah tas berada?',
    explanationIndo: 'The bag is BEHIND the chair (Tas ada di belakang kursi).',
  },
  {
    id: 12,
    subject: 'PENCIL',
    anchor: 'BOOK',
    anchorSecond: 'BAG',
    position: 'BETWEEN',
    questionText: 'WHERE IS THE PENCIL?',
    questionIndo: 'Di manakah pensil berada?',
    explanationIndo: 'The pencil is BETWEEN the book and the bag (Pensil ada di antara buku dan tas).',
  },
];

export function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
