import dotenv from "dotenv"

dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET
export const HOST = process.env.HOST
export const PORT = process.env.PORT