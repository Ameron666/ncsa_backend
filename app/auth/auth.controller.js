import { hash, verify } from "argon2"
import asyncHandler from "express-async-handler"

import { prisma } from "../prisma.js"
import { UserFields } from "../utils/user.utils.js"
import { generateToken } from "./generate-token.js"

// @desc    Авторизация пользователя (ищем в user, teacher и student)
// @route   POST /api/auth/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body

  // Сначала ищем в таблице user
  let foundUser = await prisma.user.findUnique({ where: { login } })
  let role = "user"

  // Если не найдено, ищем в таблице teacher
  if (!foundUser) {
    foundUser = await prisma.teacher.findUnique({ where: { login } })
    role = "teacher"
  }

  // Если не найдено, ищем в таблице student
  if (!foundUser) {
    foundUser = await prisma.student.findUnique({ where: { login } })
    role = "student"
  }
  console.log(role, foundUser)

  if (!foundUser) {
    res.status(401)
    throw new Error("Неверный логин или пароль")
  }

  // Проверка пароля (предполагается, что пароли хранятся в виде хэша)
  // const isValidPassword = await verify(foundUser.password, password)
  // if (!isValidPassword) {
  //   res.status(401)
  //   throw new Error("Неверный логин или пароль")
  // }

  // Генерация токена
  // const token = generateToken(foundUser.id)

  // Возвращаем данные пользователя с указанием роли и токен
  res.json({ user: { ...foundUser, role } })
})

// @desc    Регистрация пользователя (только для модели user)
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { login, email, password, name } = req.body

  // Проверяем, существует ли пользователь с таким логином в любой из таблиц
  let existingUser = await prisma.user.findUnique({ where: { login } })
  if (!existingUser) {
    existingUser = await prisma.teacher.findUnique({ where: { login } })
  }
  if (!existingUser) {
    existingUser = await prisma.student.findUnique({ where: { login } })
  }

  if (existingUser) {
    res.status(400)
    throw new Error("Пользователь с таким логином уже существует")
  }

  // Хэшируем пароль
  // const hashedPassword = await hash(password)

  const user = await prisma.user.create({
    data: {
      login,
      email,
      password,
      name
    },
    select: UserFields
  })

  // const token = generateToken(user.id)

  res.json({ user })
})
