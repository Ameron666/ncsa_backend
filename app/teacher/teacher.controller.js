import asyncHandler from "express-async-handler"

import { prisma } from "../prisma.js"

export const getTeachers = asyncHandler(async (req, res) => {
  const teachers = await prisma.teacher.findMany({
    orderBy: {
      id: "asc"
    }
  })
  res.json(teachers)
})

export const getTeacher = asyncHandler(async (req, res) => {
  const teacher = await prisma.teacher.findUnique({
    where: { id: req.params.id }
  })

  if (!teacher) {
    res.status(404)
    throw new Error("Teacher not found!")
  }

  res.json(teacher)
})

export const createTeacher = asyncHandler(async (req, res) => {
  const { fullName, position, login, password } = req.body

  if (!fullName || !position || !login || !password) {
    res.status(400)
    throw new Error("Please add all required fields!")
  }

  const teacher = await prisma.teacher.create({
    data: { fullName, position, login, password }
  })

  res.status(201).json(teacher)
})

export const updateTeacher = asyncHandler(async (req, res) => {
  const { fullName, position, login, password } = req.body

  try {
    const teacher = await prisma.teacher.update({
      where: { id: req.params.id },
      data: { fullName, position, login, password }
    })

    res.json(teacher)
  } catch (error) {
    res.status(404)
    throw new Error("Teacher not found!")
  }
})

export const deleteTeacher = asyncHandler(async (req, res) => {
  try {
    await prisma.teacher.delete({
      where: { id: req.params.id }
    })

    res.json({ message: "Teacher deleted!" })
  } catch (error) {
    res.status(404)
    throw new Error("Teacher not found!")
  }
})
