import bcrypt from "bcryptjs"
import User from "../Models/User"

export const userLogin = async (email: string, password: string) => {
  const checkUser = await User.findOne({ where: { email } })

  if (!checkUser) {
    return null
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    checkUser?.dataValues.password || ""
  )

  console.log(isPasswordValid)

  return isPasswordValid ? checkUser : null
}

export const userRegister = async (
  username: string,
  email: string,
  password: string
) => {
  const isExistingUser = await User.findOne({ where: { email } })
  if (isExistingUser) {
    return null
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPswd = await bcrypt.hash(password, salt)

  const newUser = await User.create({
    username,
    email,
    password: hashedPswd,
  })

  return newUser
}
