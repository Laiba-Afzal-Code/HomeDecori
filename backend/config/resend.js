import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

console.log("RESEND KEY:", process.env.RESEND_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;