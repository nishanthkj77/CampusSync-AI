import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { env } from "../utils/env";

const demoUsers = [
  {
    name: "Demo Student",
    email: "student.demo@campus.edu",
    password: "123456",
    role: "student",
  },
  {
    name: "Demo Faculty",
    email: "faculty.demo@campus.edu",
    password: "123456",
    role: "faculty",
  },
  {
    name: "Demo HOD",
    email: "hod.demo@campus.edu",
    password: "123456",
    role: "hod",
  },
  {
    name: "Demo Admin",
    email: "admin.demo@campus.edu",
    password: "123456",
    role: "admin",
  },
];

const seedUsers = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);

    console.log("✅ MongoDB connected for seeding");

    const demoEmails = demoUsers.map((user) => user.email);

    await User.deleteMany({
      email: {
        $in: demoEmails,
      },
    });

    const usersToCreate = await Promise.all(
      demoUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    await User.insertMany(usersToCreate);

    console.log("✅ Demo users created successfully");
    console.log("----------------------------------");

    demoUsers.forEach((user) => {
      console.log(`${user.role.toUpperCase()} → ${user.email} / ${user.password}`);
    });

    console.log("----------------------------------");

    await mongoose.disconnect();

    process.exit(0);
  } catch (error) {
    console.error("❌ Demo user seeding failed");
    console.error(error);

    await mongoose.disconnect();

    process.exit(1);
  }
};

seedUsers();