class student {
  // Student ID, Name, Contact
}

class teacher {}

class course {
  // Course Code, Course Name, Instructor, Schedule, Location
}

class schedule {
  // class time and day and location
}

class attendance {
  // Student ID
  // Course Code
  // Date
  // Attendance Status (Present/Absent)
  // Optional: Time of Attendance, Reason for Absence, etc.
}

// -- Create Attendance Table
// CREATE TABLE Attendance (
//     StudentID INT,
//     CourseCode VARCHAR(10),
//     Date DATE,
//     Status VARCHAR(10), -- 'Present' or 'Absent'
//     PRIMARY KEY (StudentID, CourseCode, Date),
//     FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
//     FOREIGN KEY (CourseCode) REFERENCES Courses(CourseCode)
// );

// -- Mark Student Attendance
// INSERT INTO Attendance (StudentID, CourseCode, Date, Status)
// VALUES (123, 'CSS110', '2024-02-01', 'Present');
