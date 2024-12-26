import asyncHandler from "express-async-handler"
import { prisma } from "../prisma.js"

export const getRooms = asyncHandler(async (req, res) => {
  const rooms = await prisma.room.findMany({
    orderBy: {
      id: "asc"
    }
  })
  res.json(rooms)
})

export const getRoom = asyncHandler(async (req, res) => {
  const room = await prisma.room.findUnique({
    where: { id: req.params.id }
  })

  if (!room) {
    res.status(404)
    throw new Error("Room not found!")
  }

  res.json(room)
})

export const createRoom = asyncHandler(async (req, res) => {
  const { fullName, floor } = req.body

  if (!fullName || !floor) {
    res.status(400)
    throw new Error("Please add all required fields!")
  }

  try {
    const room = await prisma.room.create({
      data: { fullName, floor }
    })
    res.status(201).json(room)
  } catch (error) {
    console.error("Error creating room:", error)
    res.status(500)
    throw new Error("Failed to create room!")
  }
})

export const updateRoom = asyncHandler(async (req, res) => {
  const { fullName, floor } = req.body

  try {
    const room = await prisma.room.update({
      where: { id: req.params.id },
      data: { fullName, floor }
    })

    res.json(room)
  } catch (error) {
    res.status(404)
    throw new Error("Room not found!")
  }
})

export const deleteRoom = asyncHandler(async (req, res) => {
  try {
    await prisma.room.delete({
      where: { id: req.params.id }
    })

    res.json({ message: "Room deleted!" })
  } catch (error) {
    res.status(404)
    throw new Error("Room not found!")
  }
})
