import asyncHandler from "express-async-handler"
import { prisma } from "../prisma.js"

export const getGroups = asyncHandler(async (req, res) => {
  const groups = await prisma.group.findMany({
    orderBy: {
      id: "asc"
    }
  })
  res.json(groups)
})

export const getGroup = asyncHandler(async (req, res) => {
  const group = await prisma.group.findUnique({
    where: { id: req.params.id }
  })

  if (!group) {
    res.status(404)
    throw new Error("Group not found!")
  }

  res.json(group)
})

export const createGroup = asyncHandler(async (req, res) => {
  const { fullName, course } = req.body

  if (!fullName || !course) {
    res.status(400)
    throw new Error("Please add all required fields!")
  }

  const group = await prisma.group.create({
    data: { fullName, course }
  })

  res.status(201).json(group)
})

export const updateGroup = asyncHandler(async (req, res) => {
  const { fullName, course } = req.body

  try {
    const group = await prisma.group.update({
      where: { id: req.params.id },
      data: { fullName, course }
    })

    res.json(group)
  } catch (error) {
    res.status(404)
    throw new Error("Group not found!")
  }
})

export const deleteGroup = asyncHandler(async (req, res) => {
  try {
    await prisma.group.delete({
      where: { id: req.params.id }
    })

    res.json({ message: "Group deleted!" })
  } catch (error) {
    res.status(404)
    throw new Error("Group not found!")
  }
})
