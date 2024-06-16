import bcrypt from "bcryptjs"
import User from "../Models/User"

// Controller for user login
export const userLogin = async (email: string, password: string) => {
  const checkUser = await User.findOne({ where: { email } }) // check if user exists

  if (!checkUser) {
    return null
  }

  // Compare password with hashed password in database
  const isPasswordValid = await bcrypt.compare(
    password,
    checkUser?.dataValues.password || ""
  )

  return isPasswordValid ? checkUser : null
}

// Controller for user registration
export const userRegister = async (
  username: string,
  email: string,
  password: string
) => {
  const isExistingUserByEmail = await User.findOne({ where: { email } }) // check if user already exists
  const isExistingUserByUsername = await User.findOne({ where: { username } }) // check if username already exists

  if (
    isExistingUserByEmail &&
    isExistingUserByEmail?.dataValues.confirmed === true
  ) {
    return 1 // Email already exists
  } else if (isExistingUserByUsername) {
    return 2 // Username already exists
  }

  // Hash password before storing in database
  const salt = await bcrypt.genSalt(10)
  const hashedPswd = await bcrypt.hash(password, salt)

  // Create new user
  const newUser = await User.create({
    username,
    email,
    password: hashedPswd,
  })

  return 0 // User created successfully
}
