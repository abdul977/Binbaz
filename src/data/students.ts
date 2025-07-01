import { StudentWithResults } from '../types';

// Demo student data
export const students: StudentWithResults[] = [
  {
    id: "BIA2024001",
    name: "Ahmad Abdullah",
    email: "ahmad.abdullah@example.com",
    semester: "First Semester 2024/2025",
    program: "Islamic Studies",
    enrollmentYear: "2024",
    photo: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    results: [
      { courseCode: "ARB 211", testScore: 35, examScore: 52, marks: 87, grade: "A", status: "passed" },
      { courseCode: "ARB 201", testScore: 38, examScore: 54, marks: 92, grade: "A+", status: "passed" },
      { courseCode: "Quran", testScore: 40, examScore: 55, marks: 95, grade: "A+", status: "passed" },
      { courseCode: "TAJ 201", testScore: 30, examScore: 48, marks: 78, grade: "B+", status: "passed" },
      { courseCode: "Mutoon 201", testScore: 32, examScore: 50, marks: 82, grade: "A-", status: "passed" },
      { courseCode: "FIQ/HAD 201", testScore: 35, examScore: 53, marks: 88, grade: "A", status: "passed" }
    ]
  },
  {
    id: "BIA2024002",
    name: "Fatima Hassan",
    email: "fatima.hassan@example.com",
    semester: "First Semester 2024/2025",
    program: "Islamic Studies",
    enrollmentYear: "2024",
    photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    results: [
      { courseCode: "ARB 211", testScore: 32, examScore: 48, marks: 80, grade: "A-", status: "passed" },
      { courseCode: "ARB 201", testScore: 30, examScore: 46, marks: 76, grade: "B+", status: "passed" },
      { courseCode: "Quran", testScore: 36, examScore: 54, marks: 90, grade: "A", status: "passed" },
      { courseCode: "TAJ 201", testScore: 25, examScore: 40, marks: 65, grade: "C+", status: "passed" },
      { courseCode: "Mutoon 201", testScore: 28, examScore: 44, marks: 72, grade: "B", status: "passed" },
      { courseCode: "FIQ/HAD 201", testScore: 33, examScore: 51, marks: 84, grade: "A", status: "passed" }
    ]
  },
  {
    id: "BIA2024003",
    name: "Ibrahim Mohammed",
    email: "ibrahim.mohammed@example.com",
    semester: "First Semester 2024/2025",
    program: "Islamic Studies",
    enrollmentYear: "2024",
    photo: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    results: [
      { courseCode: "ARB 211", testScore: 30, examScore: 45, marks: 75, grade: "B+", status: "passed" },
      { courseCode: "ARB 201", testScore: 33, examScore: 49, marks: 82, grade: "A-", status: "passed" },
      { courseCode: "Quran", testScore: 35, examScore: 52, marks: 87, grade: "A", status: "passed" },
      { courseCode: "TAJ 201", testScore: 36, examScore: 54, marks: 90, grade: "A", status: "passed" },
      { courseCode: "Mutoon 201", testScore: 26, examScore: 42, marks: 68, grade: "C+", status: "passed" },
      { courseCode: "FIQ/HAD 201", testScore: 31, examScore: 48, marks: 79, grade: "B+", status: "passed" }
    ]
  },
  {
    id: "BIA2024004",
    name: "Aisha Rahman",
    email: "aisha.rahman@example.com",
    semester: "First Semester 2024/2025",
    program: "Islamic Studies",
    enrollmentYear: "2024",
    photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    results: [
      { courseCode: "ARB 211", testScore: 37, examScore: 55, marks: 92, grade: "A+", status: "passed" },
      { courseCode: "ARB 201", testScore: 36, examScore: 53, marks: 89, grade: "A", status: "passed" },
      { courseCode: "Quran", testScore: 38, examScore: 57, marks: 95, grade: "A+", status: "passed" },
      { courseCode: "TAJ 201", testScore: 35, examScore: 52, marks: 87, grade: "A", status: "passed" },
      { courseCode: "Mutoon 201", testScore: 37, examScore: 54, marks: 91, grade: "A+", status: "passed" },
      { courseCode: "FIQ/HAD 201", testScore: 37, examScore: 55, marks: 92, grade: "A+", status: "passed" }
    ]
  },
  {
    id: "BIA2024005",
    name: "Yusuf Ali",
    email: "yusuf.ali@example.com",
    semester: "First Semester 2024/2025",
    program: "Islamic Studies",
    enrollmentYear: "2024",
    photo: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    results: [
      { courseCode: "ARB 211", testScore: 26, examScore: 42, marks: 68, grade: "C+", status: "passed" },
      { courseCode: "ARB 201", testScore: 18, examScore: 27, marks: 45, grade: "F", status: "failed" },
      { courseCode: "Quran", testScore: 32, examScore: 48, marks: 80, grade: "A-", status: "passed" },
      { courseCode: "TAJ 201", testScore: 24, examScore: 38, marks: 62, grade: "C", status: "passed" },
      { courseCode: "Mutoon 201", testScore: 22, examScore: 33, marks: 55, grade: "D+", status: "passed" },
      { courseCode: "FIQ/HAD 201", testScore: 29, examScore: 44, marks: 73, grade: "B", status: "passed" }
    ]
  },
  {
    id: "BIA2024006",
    name: "Abubakar Haruna",
    email: "abubakar.haruna@example.com",
    semester: "First Semester 2024/2025",
    program: "Islamic Studies",
    enrollmentYear: "2024",
    photo: "https://vdqbjdfhcxdkpsdrojtd.supabase.co/storage/v1/object/public/media-binbaz//Haruna%20Abubakar_Kwara%20state.jpg",
    results: [
      { courseCode: "Quran", testScore: 22, examScore: 38, marks: 60, grade: "C", status: "passed" },
      { courseCode: "TAJ 201", testScore: 36, examScore: 49, marks: 85, grade: "A", status: "passed" },
      { courseCode: "FIQ/HAD 201", testScore: 34, examScore: 45, marks: 79, grade: "B+", status: "passed" },
      { courseCode: "ARB 211", testScore: 35, examScore: 10, marks: 45, grade: "F", status: "failed" },
      { courseCode: "ARB 201", testScore: 40, examScore: 54, marks: 94, grade: "A+", status: "passed" },
      { courseCode: "Mutoon 201", testScore: 35, examScore: 39, marks: 74, grade: "B", status: "passed" }
    ]
  },
  {
    id: "BIA2024007",
    name: "Zakariya Kilishi",
    email: "zakariya.kilishi@example.com",
    semester: "First Semester 2024/2025",
    program: "Islamic Studies",
    enrollmentYear: "2024",
    photo: "https://vdqbjdfhcxdkpsdrojtd.supabase.co/storage/v1/object/public/media-binbaz//Zakariya%20Kilishi%20kwara.jpg",
    results: [
      { courseCode: "TAJ 201", testScore: 22, examScore: 42, marks: 64, grade: "C+", status: "passed" },
      { courseCode: "FIQ/HAD 201", testScore: 22, examScore: 42, marks: 64, grade: "C+", status: "passed" },
      { courseCode: "ARB 211", testScore: 26, examScore: 60, marks: 86, grade: "A", status: "passed" },
      { courseCode: "ARB 201", testScore: 38, examScore: 48, marks: 86, grade: "A", status: "passed" },
      { courseCode: "Mutoon 201", testScore: 24, examScore: 34, marks: 58, grade: "D+", status: "passed" }
    ]
  },
  {
    id: "BIA2024008",
    name: "Ismaila Jummai Muhammad",
    email: "ismaila.jummai@example.com",
    semester: "First Semester 2024/2025",
    program: "Islamic Studies",
    enrollmentYear: "2024",
    photo: "https://vdqbjdfhcxdkpsdrojtd.supabase.co/storage/v1/object/public/media-binbaz//Jumai%20ismaila,%20Nasarawa%20state.jpg",
    results: [
      { courseCode: "Quran", testScore: 36, examScore: 57, marks: 93, grade: "A+", status: "passed" },
      { courseCode: "TAJ 201", testScore: 22, examScore: 45, marks: 67, grade: "C+", status: "passed" },
      { courseCode: "FIQ/HAD 201", testScore: 22, examScore: 45, marks: 67, grade: "C+", status: "passed" },
      { courseCode: "ARB 211", testScore: 27, examScore: 40, marks: 67, grade: "C+", status: "passed" },
      { courseCode: "ARB 201", testScore: 38, examScore: 57, marks: 95, grade: "A+", status: "passed" },
      { courseCode: "Mutoon 201", testScore: 36, examScore: 51, marks: 87, grade: "A", status: "passed" }
    ]
  },
  {
    id: "BIA2024009",
    name: "Summaryah oiza Muhammad",
    email: "summaryah.oiza@example.com",
    semester: "First Semester 2024/2025",
    program: "Islamic Studies",
    enrollmentYear: "2024",
    photo: "https://vdqbjdfhcxdkpsdrojtd.supabase.co/storage/v1/object/public/media-binbaz//Summayah_oiza_Muhammad.jpg",
    results: [
      { courseCode: "Quran", testScore: 23, examScore: 35, marks: 58, grade: "C", status: "passed" },
      { courseCode: "ARB 201", testScore: 20, examScore: 30, marks: 50, grade: "C-", status: "passed" },
      { courseCode: "TAJ 201", testScore: 18, examScore: 26, marks: 44, grade: "F", status: "failed" }
    ]
  },
  {
    id: "BIA2024010",
    name: "Saratu Ohunene Sa'aed",
    email: "saratu.ohunene@example.com",
    semester: "First Semester 2024/2025",
    program: "Islamic Studies",
    enrollmentYear: "2024",
    photo: "https://vdqbjdfhcxdkpsdrojtd.supabase.co/storage/v1/object/public/media-binbaz//Saratu_Ohunene_Saed.jpg",
    results: [
      { courseCode: "Quran", testScore: 22, examScore: 32, marks: 54, grade: "C-", status: "passed" },
      { courseCode: "ARB 201", testScore: 19, examScore: 29, marks: 48, grade: "D+", status: "passed" },
      { courseCode: "TAJ 201", testScore: 20, examScore: 30, marks: 50, grade: "C-", status: "passed" }
    ]
  },
  {
    id: "BIA2024011",
    name: "Muhammad Haleemah",
    email: "muhammad.haleemah@example.com",
    semester: "First Semester 2024/2025",
    program: "Islamic Studies",
    enrollmentYear: "2024",
    photo: "https://vdqbjdfhcxdkpsdrojtd.supabase.co/storage/v1/object/public/media-binbaz//Haleemah_Muhammad.jpg",
    results: [
      { courseCode: "Quran", testScore: 23, examScore: 35, marks: 58, grade: "C", status: "passed" },
      { courseCode: "ARB 201", testScore: 22, examScore: 34, marks: 56, grade: "C", status: "passed" },
      { courseCode: "TAJ 201", testScore: 20, examScore: 30, marks: 50, grade: "C-", status: "passed" }
    ]
  },
  {
    id: "BIA2024012",
    name: "Shuaeeb Onize Keefayah",
    email: "shuaeeb.onize@example.com",
    semester: "First Semester 2024/2025",
    program: "Islamic Studies",
    enrollmentYear: "2024",
    photo: "https://vdqbjdfhcxdkpsdrojtd.supabase.co/storage/v1/object/public/media-binbaz//Shuaeeb_Onize_Keefayah_Kogi_State.jpg",
    results: [
      { courseCode: "Quran", testScore: 22, examScore: 34, marks: 56, grade: "C", status: "passed" },
      { courseCode: "ARB 201", testScore: 17, examScore: 25, marks: 42, grade: "D", status: "passed" },
      { courseCode: "TAJ 201", testScore: 17, examScore: 25, marks: 42, grade: "D", status: "passed" }
    ]
  }
];

export const getStudentById = (studentId: string): StudentWithResults | undefined => {
  return students.find(student => student.id === studentId);
};