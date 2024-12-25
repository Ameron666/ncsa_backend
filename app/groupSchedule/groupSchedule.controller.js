import asyncHandler from "express-async-handler";

import { prisma } from "../prisma.js";

export const getGroupSchedules = asyncHandler(async (req, res) => {
  const groupSchedules = await prisma.groupSchedule.findMany({
    orderBy: {
      id: "asc",
    },
  });
  res.json(groupSchedules);
});

export const getGroupSchedule = asyncHandler(async (req, res) => {
  const groupSchedule = await prisma.groupSchedule.findUnique({
    where: { id: req.params.id },
  });

  if (!groupSchedule) {
    res.status(404);
    throw new Error("GroupSchedule not found!");
  }

  res.json(groupSchedule);
});

export const createGroupSchedule = asyncHandler(async (req, res) => {
  const {
    group,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = req.body;

  const groupSchedule = await prisma.groupSchedule.create({
    data: {
      group,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    },
  });

  res.status(201).json(groupSchedule);
});

export const updateGroupSchedule = asyncHandler(async (req, res) => {
  const {
    group,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = req.body;

  try {
    const groupSchedule = await prisma.groupSchedule.update({
      where: { id: req.params.id },
      data: {
        group,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      },
    });

    res.json(groupSchedule);
  } catch (error) {
    res.status(404);
    throw new Error("GroupSchedule not found!");
  }
});

export const deleteGroupSchedule = asyncHandler(async (req, res) => {
  try {
    await prisma.groupSchedule.delete({
      where: { id: req.params.id },
    });

    res.json({ message: "GroupSchedule deleted!" });
  } catch (error) {
    res.status(404);
    throw new Error("GroupSchedule not found!");
  }
});
