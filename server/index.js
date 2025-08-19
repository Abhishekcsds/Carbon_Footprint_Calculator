// // External Modules
// import express from "express";
// import path from "path";
// import dotenv from "dotenv";
// import cors from "cors";
// import session from "express-session";
// import passport from "passport";
// import helmet from "helmet";
// import { fileURLToPath } from "url";
// import PgSession from "connect-pg-simple";

// // Internal Modules
// import { pool } from "./config/db.js";
// import "./config/passport.js";
// import authRouter from "./routes/auth.js";
// import householdRouter from "./routes/householdData.js";
// import contactUsRouter from "./routes/contactUs.js";

// // Environment Variables
// dotenv.config();

// // Initial Setup
// const app = express();
// const isProduction = process.env.NODE_ENV === "production";
// const port = process.env.PORT || 3001;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Middleware
// app.use(helmet());
// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials: true,
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Session setup with PostgreSQL store
// const sessionStore = new (PgSession(session))({
//   pool: pool,
//   tableName: "session",
// });
// app.use(
//   session({
//     store: sessionStore,
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: isProduction,
//       httpOnly: true,
//       sameSite: isProduction ? "none" : "lax",
//       maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     },
//   })
// );

// // Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // API Routes
// app.use("/api/auth", authRouter);
// app.use("/api/household", householdRouter);
// app.use("/api/contact", contactUsRouter);

// // Serve Frontend in Production
// if (isProduction) {
//   const clientBuildPath = path.join(__dirname, "../client/dist");
//   app.use(express.static(clientBuildPath));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(clientBuildPath, "index.html"));
//   });
// } else {
//     app.get("/", (req, res) => {
//         res.send("API is running in development mode...");
//     });
// }

// // Start Server
// app.listen(port, () => {
//   console.log(`🚀 Server is running on port ${port}`);
// });



// External Modules
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import helmet from "helmet";
import { fileURLToPath } from "url";
import PgSession from "connect-pg-simple";

// Internal Modules
import { pool } from "./config/db.js";
import "./config/passport.js";
import authRouter from "./routes/auth.js";
import householdRouter from "./routes/householdData.js";
import contactUsRouter from "./routes/contactUs.js";

// Environment Variables
dotenv.config();

// Initial Setup
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup with PostgreSQL store
const sessionStore = new (PgSession(session))({
  pool: pool,
  tableName: "session",
});
app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/household", householdRouter);
app.use("/api/contact", contactUsRouter);

// --- START: DEPLOYMENT CONFIGURATION ---
// This section serves the frontend in production
if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  // The path is relative to the 'server' directory
  const clientBuildPath = path.join(__dirname, "../client/dist");
  
  app.use(express.static(clientBuildPath));
  
  // For any request that doesn't match an API route, send the index.html file
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}
// --- END: DEPLOYMENT CONFIGURATION ---

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running`);
});
