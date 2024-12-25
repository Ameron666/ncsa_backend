import asyncHandler from "express-async-handler";

import { prisma } from "../prisma.js";

export const getDaySchedules = asyncHandler(async (req, res) => {
  const daySchedules = await prisma.daySchedule.findMany({
    orderBy: {
      id: "asc",
    },
  });
  res.json(daySchedules);
});

export const getDaySchedule = asyncHandler(async (req, res) => {
  const daySchedule = await prisma.daySchedule.findUnique({
    where: { id: req.params.id },
  });

  if (!daySchedule) {
    res.status(404);
    throw new Error("DaySchedule not found!");
  }

  res.json(daySchedule);
});

export const createDaySchedule = asyncHandler(async (req, res) => {
  const { group, dayOfWeek, fields } = req.body;

  const daySchedule = await prisma.daySchedule.create({
    data: { group, dayOfWeek, fields },
  });

  res.status(201).json(daySchedule);
});

export const updateDaySchedule = asyncHandler(async (req, res) => {
  const { group, dayOfWeek, fields } = req.body;

  try {
    const daySchedule = await prisma.daySchedule.update({
      where: { id: req.params.id },
      data: { group, dayOfWeek, fields },
    });

    res.json(daySchedule);
  } catch (error) {
    res.status(404);
    throw new Error("DaySchedule not found!");
  }
});

export const deleteDaySchedule = asyncHandler(async (req, res) => {
  try {
    await prisma.daySchedule.delete({
      where: { id: req.params.id },
    });

    res.json({ message: "DaySchedule deleted!" });
  } catch (error) {
    res.status(404);
    throw new Error("DaySchedule not found!");
  }
});
