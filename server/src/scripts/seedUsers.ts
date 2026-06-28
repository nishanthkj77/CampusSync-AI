import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { env } from "../utils/env";



const seedUsers = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);

    await User.deleteMany({});

    await User.create([
      {
        name: "Demo Student",
        email: "student.demo@campus.edu",
        password: "123456",
        role: "student",
        rollNumber: "23MCA001",
        department: "Computer Applications",
        semester: 2,
        section: "A",
      },
      {
        name: "Nishanth K J",
        email: "nishanth.demo@campus.edu",
        password: "123456",
        role: "student",
        rollNumber: "23MCA002",
        department: "Computer Applications",
        semester: 2,
        section: "A",
      },
      {
        name: "Sakthibharathi G",
        email: "sakthi.demo@campus.edu",
        password: "123456",
        role: "student",
        rollNumber: "23MCA003",
        department: "Computer Applications",
        semester: 2,
        section: "A",
      },
      {
        name: "Vijayalakshmi J",
        email: "vijayalakshmi.demo@campus.edu",
        password: "123456",
        role: "student",
        rollNumber: "23MCA004",
        department: "Computer Applications",
        semester: 2,
        section: "A",
      },
      {
        name: "Arun Kumar",
        email: "arun.demo@campus.edu",
        password: "123456",
        role: "student",
        rollNumber: "23MCA005",
        department: "Computer Applications",
        semester: 2,
        section: "A",
      },
      {
        name: "Demo Faculty",
        email: "faculty.demo@campus.edu",
        password: "123456",
        role: "faculty",
        department: "Computer Applications",
        section: "A",
      },
      {
        name: "Demo HOD",
        email: "hod.demo@campus.edu",
        password: "123456",
        role: "hod",
        department: "Computer Applications",
      },
      {
        name: "Demo Admin",
        email: "admin.demo@campus.edu",
        password: "123456",
        role: "admin",
        department: "Administration",
      },
    ]);

    console.log("✅ Demo users seeded successfully");
    process.exit(0);
  } catch (error) {
    console.log("❌ Seed failed", error);
    process.exit(1);
  }
};

seedUsers();