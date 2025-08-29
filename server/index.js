

// server/index.js
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import { passport } from "./config/passport.js";
import helmet from "helmet";
import { fileURLToPath } from "url";
import PgSession from "connect-pg-simple";

import { pool } from "./config/db.js";
import authRouter from "./routes/auth.js";
import householdRouter from "./routes/householdData.js";
import contactUsRouter from "./routes/contactUs.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// ✅ Trust proxy (needed on Render for cookies to work)
app.set("trust proxy", 1);

app.use(helmet());

// ✅ CORS setup for Render + local
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Sessions stored in Postgres
const sessionStore = new (PgSession(session))({
  pool,
  tableName: "session",
});

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in prod (Render)
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// 🔍 Debugging helper: log session IDs
app.use((req, res, next) => {
  console.log("Session ID:", req.sessionID);
  next();
});

// ✅ Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/household", householdRouter);
app.use("/api/contact", contactUsRouter);

// ✅ Serve frontend build in production
if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const clientBuildPath = path.join(__dirname, "../client/dist");

  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🌍 CLIENT_URL: ${process.env.CLIENT_URL}`);
  console.log(`🌍 RENDER_EXTERNAL_URL: ${process.env.RENDER_EXTERNAL_URL}`);
});
