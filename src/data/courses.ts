import { Course } from '../types';

export const courses: Course[] = [
  {
    code: 'ARB 211',
    title: 'Advance Arabic Reading',
    instructor: 'Ust, Abdulmaleek',
    creditHours: 3
  },
  {
    code: 'ARB 201',
    title: 'Arabic language',
    instructor: 'Ust, Abdulmaleek',
    creditHours: 3
  },
  {
    code: 'Quran',
    title: 'Quran memorization',
    instructor: 'Ust, Muhammad',
    creditHours: 4
  },
  {
    code: 'TAJ 201',
    title: 'Phonology',
    instructor: 'Ust, Ibrahim',
    creditHours: 2
  },
  {
    code: 'Mutoon 201',
    title: 'Memorization of selected books',
    instructor: 'Ust, Mustopha',
    creditHours: 3
  },
  {
    code: 'FIQ/HAD 201',
    title: 'Islamic jurisprudence & Hadith',
    instructor: 'Ust, Muhammad & Ust, Mustopha',
    creditHours: 6
  }
];

export const getCourseByCourseCode = (courseCode: string): Course | undefined => {
  return courses.find(course => course.code === courseCode);
};