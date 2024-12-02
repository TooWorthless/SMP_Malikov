// Enums
enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic_Leave",
    Graduated = "Graduated",
    Expelled = "Expelled"
}

enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special"
}

enum Semester {
    First = "First",
    Second = "Second"
}

enum Grade {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}

enum Faculty {
    Computer_Science = "Computer_Science",
    Economics = "Economics",
    Law = "Law",
    Engineering = "Engineering"
}





// Interfaces
interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

interface GradeRecord {
    studentId: number;
    courseId: number;
    grade: Grade;
    date: Date;
    semester: Semester;
}





// University System
class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: GradeRecord[] = [];
    private courseRegistrations: Map<number, Set<number>> = new Map(); // courseId -> Set of studentIds

    private studentIdCounter = 1;
    private courseIdCounter = 1;

    // Enroll/Registration
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = {
            id: this.studentIdCounter++,
            ...student
        };
        this.students.push(newStudent);
        return newStudent;
    }

    // Registration for the course
    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        if (!student) throw new Error("Student not found");
        if (!course) throw new Error("Course not found");
        if (student.faculty !== course.faculty) throw new Error("Student and course faculties do not match");
        if (student.status !== StudentStatus.Active) throw new Error("Only active students can register for courses");

        const registeredStudents = this.courseRegistrations.get(courseId) || new Set();
        if (registeredStudents.size >= course.maxStudents) throw new Error("Course is full");

        registeredStudents.add(studentId);
        this.courseRegistrations.set(courseId, registeredStudents);
    }

    // Grade setter
    setGrade(studentId: number, courseId: number, grade: Grade): void {
        const registeredStudents = this.courseRegistrations.get(courseId);
        if (!registeredStudents || !registeredStudents.has(studentId)) {
            throw new Error("Student is not registered for this course");
        }

        const semester = this.courses.find(c => c.id === courseId)?.semester;
        if (!semester) throw new Error("Course not found");

        this.grades.push({
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester
        });
    }

    //Update student status value
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);
        if (!student) throw new Error("Student not found");

        if (student.status === StudentStatus.Graduated || student.status === StudentStatus.Expelled) {
            throw new Error("Cannot change status of graduated or expelled student");
        }

        student.status = newStatus;
    }

    
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    
    getStudentGrades(studentId: number): GradeRecord[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    // Avg student value calculating
    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.getStudentGrades(studentId);
        if (studentGrades.length === 0) return 0;

        const total = studentGrades.reduce((sum, g) => sum + g.grade, 0);
        return total / studentGrades.length;
    }

  
    getTopStudentsByFaculty(faculty: Faculty): Student[] {
        const students = this.getStudentsByFaculty(faculty);
        return students.filter(student => {
            const avgGrade = this.calculateAverageGrade(student.id);
            return avgGrade >= Grade.Excellent;
        });
    }

    // Adding course functionality
    addCourse(course: Omit<Course, "id">): Course {
        const newCourse: Course = {
            id: this.courseIdCounter++,
            ...course
        };
        this.courses.push(newCourse);
        return newCourse;
    }
}
