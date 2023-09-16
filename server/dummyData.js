// Create dummy admin data
export const hashedPassword = "password123";
const adminData = [
  {
    _id: "admin1id",
    email: "admin1@example.com",
    password: hashedPassword,
    name: "Admin 1",
    role: "admin",
    committeeName: "Committee A",
    committeeId: "committee123",
    mobile: "1234567890",
  },
  {
    _id: "admin2id",
    email: "admin2@example.com",
    password: hashedPassword,
    name: "Admin 2",
    role: "admin",
    committeeName: "Committee B",
    committeeId: "committee456",
    mobile: "9876543210",
  },
  // Add more admin objects as needed
];

// Create dummy committee data
const committeeData = [
  {
    _id: "committee1id",
    name: "Committee A",
    description: "Description for Committee A",
    convenorName: "Convenor A",
    convenorId: "1",
    members: ["Member A", "Member B"],
    events: ["Event 1", "Event 2"],
  },
  {
    _id: "committee2id",
    name: "Committee B",
    description: "Description for Committee B",
    convenorName: "Convenor B",
    convenorId: "2",
    members: ["Member C", "Member D"],
    events: ["Event 3", "Event 4"],
  },
  // Add more committee objects as needed
];

// Create dummy event data
const eventsData = [
  {
    _id: "event1id",
    name: "Event 1",
    venue: "Venue A",
    startDate: "2023-09-20",
    endDate: "2023-09-22",
    description: "Description for Event 1",
    photos: ["photo1.jpg", "photo2.jpg"],
    isPhotoUploaded: true,
    bannerPath:
      "https://media.istockphoto.com/id/1255034209/vector/hackathon-isometric-landing-software-development.jpg?s=612x612&w=0&k=20&c=nKQrCZQHbQwosxp6NgNh_beKmKLcWyifiJMFtReZ588=",
    bannerName: "Banner 1",
    orderPath: "orders/order1.pdf",
    orderName: "Order 1",
    reportPath: "reports/report1.pdf",
    reportName: "Report 1",
    committee: [
      {
        id: "committee1id",
        name: "Committee A",
      },
      {
        id: "committee2id",
        name: "Committee B",
      },
    ],
    createdBy: [
      {
        id: "user1id",
        name: "User A",
      },
      {
        id: "user2id",
        name: "User B",
      },
    ],
    isPublished: true,
    isApproved: true,
    isCertificateGenerated: false,
    status: true,
  },
  {
    _id: "event2id",
    name: "Event 2",
    venue: "Venue B",
    startDate: "2023-10-05",
    endDate: "2023-10-08",
    description: "Description for Event 2",
    photos: ["photo3.jpg", "photo4.jpg"],
    isPhotoUploaded: true,
    bannerPath:
      "https://media.istockphoto.com/id/1257225341/vector/hackathon-isometric-landing-software-development.jpg?s=612x612&w=0&k=20&c=jAI9PyKnJZEi28iVdU7Ks-oIr0vRCO7s31bdO3hAj-o=",
    bannerName: "Banner 2",
    orderPath: "orders/order2.pdf",
    orderName: "Order 2",
    reportPath: "reports/report2.pdf",
    reportName: "Report 2",
    committee: [
      {
        id: "committee2id",
        name: "Committee B",
      },
    ],
    createdBy: [
      {
        id: "user2id",
        name: "User B",
      },
    ],
    isPublished: true,
    isApproved: false,
    isCertificateGenerated: false,
    status: false,
  },
  // Add more event objects as needed
];

// Create dummy user data
const userData = [
  {
    _id: "user1id",
    name: "User 1",
    email: "user1@example.com",
    phoneNo: "1234567890",
    employeeId: "emp12345",
    designation: "Faculty",
    regNo: "reg12345",
    semester: "Semester 1",
    course: "Course A",
    department: "Department X",
    type: "faculty",
    event: [
      {
        id: "event1id",
        name: "Event 1",
      },
      {
        id: "event2id",
        name: "Event 2",
      },
    ],
    status: true,
  },
  {
    _id: "user2id",
    name: "User 2",
    email: "user2@example.com",
    phoneNo: "9876543210",
    employeeId: "emp54321",
    designation: "Student",
    regNo: "reg54321",
    semester: "Semester 2",
    course: "Course B",
    department: "Department Y",
    type: "student",
    event: [
      {
        id: "event2id",
        name: "Event 2",
      },
    ],
    status: false,
  },
  // Add more user objects as needed
];

export { adminData, committeeData, eventsData, userData };
