# oys-application

- Login page with authentication using Spring Security at backend. User passwords are stored at the database encrypted.
- Homepage with sliding announcements feature. Announcements can only be added by users who have admin roles.
- For student users, exam and homework submission dates are marked on the calendar at reminder component. Also they are able to see exam and homeworks submission dates that are in 10 days.
- Admin users can deactivate-activate users and create new users. Admins will be given a randomly generated password that they can send to the user, which can be changed.
- Admins can create new courses. They can choose classroom, course hours and instructors. Schedule conflicts are managed automatically at DBMS layer.
- Admins can create new classrooms providing their facilities. 
- All users can view the list of users, announcements, courses and clasrooms. 
- Student, assistant and lecturer users can view the courses that they are assigned.
- Students can enroll to any course they can from the course list. Schedule conflicts are handled by database, backend and frontend layers.
- Lecturers can add assistants to their courses. Schedule conflicts are again handled by database, backend and frontend layers.
- Lecturers and assistants can create exams and homeworks providing dates and required details. Homework details are uploaded to the database in pdf format.
- Students can download homework details at homework pages, and submit pdf files before the deadline.
- Assistant and lecturers can grade exams and homeworks at their pages.
- Students can view detailed information about their grades, including mean, standard deviation and column graph of grade distribution.
- Every user can edit their profile and upload an avatar.
- Students, assistants and lecturers can mark their busy times on their tables.
- Every user can reach and view any users profile from users page. They also can start a private message clicking the letter icon on their rows.
- Every user can chat in realtime both in group chat (everyone) or with any user they want privately. This is implemented using websocket.
