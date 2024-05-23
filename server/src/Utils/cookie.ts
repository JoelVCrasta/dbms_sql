import express from "express"

let cookieAge = 1000 * 60 * 60 * 24 * 7 // 7 days

export const cookie = (res: express.Response) => {
  res.cookie("isLogged", "true", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    path: "/",
    // maxAge: cookieAge,
    expires: new Date(Date.now() + cookieAge),
  })
}
