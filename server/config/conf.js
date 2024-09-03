import dotenv from "dotenv";

  dotenv.config();

const conf = {  // write process becouase we access it in backend node js
  profileproHost: String(process.env.VITE_PROFILEPRO_HOST),
  profileproUser: String(process.env.VITE_PROFILEPRO_USER),
  profileproPassword: String(process.env.VITE_PROFILEPRO_PASSWORD),
  profileproDatabase: String(process.env.VITE_PROFILEPRO_DATABASE),
  profileproKey: String(process.env.VITE_PROFILEPRO_JWT_SECRET_KEY),

  profileproEMAIL_USER: String(process.env.VITE_PROFILEPRO_EMAIL_USER),
  profileproEMAIL_PASSWORD: String(process.env.VITE_PROFILEPRO_EMAIL_PASS),
  profileproPersonalMail: String(process.env.VITE_PROFILEPRO_PERSONAL_EMAIL),
};

export default conf;
