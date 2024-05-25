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

  return isPasswordValid ? checkUser : null
}

export const userRegister = async (
  username: string,
  email: string,
  password: string
) => {
  const isExistingUserByEmail = await User.findOne({ where: { email } })
  const isExistingUserByUsername = await User.findOne({ where: { username } })

  if (isExistingUserByEmail && isExistingUserByEmail?.dataValues.confirmed === true) {
    return 1
  }
  else if (isExistingUserByUsername) {
    return 2
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPswd = await bcrypt.hash(password, salt)

  const newUser = await User.create({
    username,
    email,
    password: hashedPswd,
  })

  return 0
}
