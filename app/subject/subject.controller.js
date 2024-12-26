import asyncHandler from "express-async-handler"
import { prisma } from "../prisma.js"

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Private
export const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await prisma.subject.findMany({
    orderBy: {
      id: "asc"
    }
  })
  res.json(subjects)
})

// @desc    Get single subject
// @route   GET /api/subjects/:id
// @access  Private
export const getSubject = asyncHandler(async (req, res) => {
  const subject = await prisma.subject.findUnique({
    where: { id: req.params.id }
  })

  if (!subject) {
    res.status(404)
    throw new Error("Subject not found!")
  }

  res.json(subject)
})

// @desc    Create new subject
// @route   POST /api/subjects
// @access  Private
export const createSubject = asyncHandler(async (req, res) => {
  const { fullName } = req.body

  if (!fullName) {
    res.status(400)
    throw new Error("Please add all required fields!")
  }

  const subject = await prisma.subject.create({
    data: { fullName }
  })

  res.status(201).json(subject)
})

// @desc    Update subject
// @route   PUT /api/subjects/:id
// @access  Private
export const updateSubject = asyncHandler(async (req, res) => {
  const { fullName } = req.body

  try {
    const subject = await prisma.subject.update({
      where: { id: req.params.id },
      data: { fullName }
    })

    res.json(subject)
  } catch (error) {
    res.status(404)
    throw new Error("Subject not found!")
  }
})

// @desc    Delete subject
// @route   DELETE /api/subjects/:id
// @access  Private
export const deleteSubject = asyncHandler(async (req, res) => {
  try {
    await prisma.subject.delete({
      where: { id: req.params.id }
    })

    res.json({ message: "Subject deleted!" })
  } catch (error) {
    res.status(404)
    throw new Error("Subject not found!")
  }
})
