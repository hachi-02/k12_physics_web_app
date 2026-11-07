import type { TextbookGradeSeed } from '../textbook';
import { CHAPTER_1 } from './grade6-chapter1';
import { CHAPTER_8 } from './grade6-chapter8';
import { CHAPTER_9 } from './grade6-chapter9';
import { CHAPTER_10 } from './grade6-chapter10';

export const TEXTBOOK_GRADE_6: TextbookGradeSeed = {
  grade: 6,
  subject: 'Vật lý (KHTN 6)',
  bookSeries: 'Kết nối tri thức với cuộc sống',
  chapters: [CHAPTER_1, CHAPTER_8, CHAPTER_9, CHAPTER_10]
};
