 import bcrypt from "bcryptjs";
import { Schema, model, Document } from "mongoose";

export type UserRole = "student" | "faculty" | "hod" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  rollNumber?: string;
  department?: string;
  semester?: number;
  section?: string;
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "hod", "admin"],
      default: "student",
    },
    rollNumber: {
      type: String,
      trim: true,
      uppercase: true,
      sparse: true,
    },
    department: {
      type: String,
      trim: true,
      default: "Computer Applications",
    },
    semester: {
      type: Number,
      min: 1,
      max: 10,
    },
    section: {
      type: String,
      trim: true,
      uppercase: true,
      default: "A",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>("User", userSchema);

export default User;