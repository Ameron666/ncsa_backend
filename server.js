import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";

import { errorHandler, notFound } from "./app/middleware/error.middleware.js";
import { prisma } from "./app/prisma.js";

import authRoutes from "./app/auth/auth.routes.js";
import userRoutes from "./app/user/user.routes.js";
import roomRoutes from "./app/room/room.routes.js";
import groupRoutes from "./app/group/group.routes.js";
import studentRoutes from "./app/student/student.routes.js";
import teacherRoutes from "./app/teacher/teacher.routes.js";
import subjectRoutes from "./app/subject/subject.routes.js";
import dayScheduleRoutes from "./app/daySchedule/daySchedule.routes.js";
import groupScheduleRoutes from "./app/groupSchedule/groupSchedule.routes.js";

import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

async function main() {
  if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

  app.use(express.json());

  const __dirname = path.resolve();

  app.use("/uploads", express.static(path.join(__dirname, "/uploads/")));

  app.use("/api/rooms", roomRoutes);
  app.use("/api/subjects", subjectRoutes);
  app.use("/api/groups", groupRoutes);
  app.use("/api/teachers", teacherRoutes);
  app.use("/api/students", studentRoutes);

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/day-schedules", dayScheduleRoutes);
  app.use("/api/group-schedules", groupScheduleRoutes);

  app.use(notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;

  app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
