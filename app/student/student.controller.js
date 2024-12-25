import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";

export const getStudents = asyncHandler(async (req, res) => {
  const students = await prisma.student.findMany({
    orderBy: {
      id: "asc",
    },
  });
  res.json(students);
});

export const getStudent = asyncHandler(async (req, res) => {
  const student = await prisma.student.findUnique({
    where: { id: req.params.id },
  });

  if (!student) {
    res.status(404);
    throw new Error("Student not found!");
  }

  res.json(student);
});

export const createStudent = asyncHandler(async (req, res) => {
  const { fullName, recordBookNumber, group, subgroup, login, password } =
    req.body;

  if (!fullName || !recordBookNumber || !group || !login || !password) {
    res.status(400);
    throw new Error("Please add all required fields!");
  }

  const student = await prisma.student.create({
    data: { fullName, recordBookNumber, group, subgroup, login, password },
  });

  res.status(201).json(student);
});

export const updateStudent = asyncHandler(async (req, res) => {
  const { fullName, recordBookNumber, group, subgroup, login, password } =
    req.body;

  try {
    const student = await prisma.student.update({
      where: { id: req.params.id },
      data: { fullName, recordBookNumber, group, subgroup, login, password },
    });

    res.json(student);
  } catch (error) {
    res.status(404);
    throw new Error("Student not found!");
  }
});

export const deleteStudent = asyncHandler(async (req, res) => {
  try {
    await prisma.student.delete({
      where: { id: req.params.id },
    });

    res.json({ message: "Student deleted!" });
  } catch (error) {
    res.status(404);
    throw new Error("Student not found!");
  }
});
