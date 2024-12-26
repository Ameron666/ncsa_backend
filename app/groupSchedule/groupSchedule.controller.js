import asyncHandler from "express-async-handler"
import { prisma } from "../prisma.js"

// @desc Get all GroupSchedules
// @route GET /api/group-schedules
// @access Private
export const getGroupSchedules = asyncHandler(async (req, res) => {
  const groupSchedules = await prisma.groupSchedule.findMany({
    orderBy: { id: "asc" }
  })
  res.json(groupSchedules)
})

// @desc Get a single GroupSchedule by ID
// @route GET /api/group-schedules/:id
// @access Private
export const getGroupSchedule = asyncHandler(async (req, res) => {
  const groupSchedule = await prisma.groupSchedule.findUnique({
    where: { id: req.params.id }
  })

  if (!groupSchedule) {
    res.status(404)
    throw new Error("GroupSchedule not found!")
  }

  res.json(groupSchedule)
})

// @desc Create a new GroupSchedule
// @route POST /api/group-schedules
// @access Private
export const createGroupSchedule = asyncHandler(async (req, res) => {
  const {
    group,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  } = req.body

  // Validate input
  if (!group) {
    res.status(400)
    throw new Error("Group is required.")
  }

  const groupSchedule = await prisma.groupSchedule.create({
    data: {
      group,
      monday: monday || [],
      tuesday: tuesday || [],
      wednesday: wednesday || [],
      thursday: thursday || [],
      friday: friday || [],
      saturday: saturday || [],
      sunday: sunday || []
    }
  })

  res.status(201).json(groupSchedule)
})

// @desc Update an existing GroupSchedule
// @route PUT /api/group-schedules/:id
// @access Private
export const updateGroupSchedule = asyncHandler(async (req, res) => {
  const {
    id,
    group,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  } = req.body

  try {
    const groupSchedule = await prisma.groupSchedule.upsert({
      where: { id: id || ""},
      create: {
        group: group || [],
        monday: monday || [],
        tuesday: tuesday || [],
        wednesday: wednesday || [],
        thursday: thursday || [],
        friday: friday || [],
        saturday: saturday || [],
        sunday: sunday || []
      },
      update: {
        group: group || undefined,
        monday: monday || undefined,
        tuesday: tuesday || undefined,
        wednesday: wednesday || undefined,
        thursday: thursday || undefined,
        friday: friday || undefined,
        saturday: saturday || undefined,
        sunday: sunday || undefined
      }
    })

    res.json(groupSchedule)
  } catch (error) {
    res.status(404)
    throw new Error("GroupSchedule not found!")
  }
})

// @desc Delete a GroupSchedule
// @route DELETE /api/group-schedules/:id
// @access Private
export const deleteGroupSchedule = asyncHandler(async (req, res) => {
  try {
    await prisma.groupSchedule.delete({
      where: { id: req.params.id }
    })

    res.json({ message: "GroupSchedule deleted!" })
  } catch (error) {
    res.status(404)
    throw new Error("GroupSchedule not found!")
  }
})
