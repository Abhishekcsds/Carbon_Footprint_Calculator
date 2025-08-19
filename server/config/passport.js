// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { pool } from "./db.js";
// import dotenv from "dotenv";

// dotenv.config();

// // --- START OF FIX ---

// // Determine the callback URL based on the environment.
// // This ensures an absolute URL is always used, which is required by Google.
// const callbackURL = process.env.NODE_ENV === 'production'
//   ? `${process.env.RENDER_EXTERNAL_URL}/api/auth/google/callback`
//   : 'http://localhost:3001/api/auth/google/callback';

// // --- END OF FIX ---

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.OAUTH_CLIENT_ID,
//       clientSecret: process.env.OAUTH_SECRET,
//       callbackURL: callbackURL, // Use the corrected, absolute URL
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const { rows } = await pool.query(
//           "SELECT * FROM users WHERE google_id = $1",
//           [profile.id]
//         );

//         if (rows.length > 0) {
//           return done(null, rows[0]);
//         }

//         const newUser = {
//           google_id: profile.id,
//           name: profile.displayName,
//           email: profile.emails[0].value,
//         };

//         const result = await pool.query(
//           `INSERT INTO users (google_id, name, email) VALUES ($1, $2, $3) RETURNING *`,
//           [newUser.google_id, newUser.name, newUser.email]
//         );

//         return done(null, result.rows[0]);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//     if (!rows.length) {
//       return done(new Error("User not found"));
//     }
//     done(null, rows[0]);
//   } catch (err) {
//     done(err);
//   }
// });




// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { pool } from "./db.js";
// import dotenv from "dotenv";

// dotenv.config();

// // This dynamically sets the correct callback URL based on the environment.
// // Render provides the RENDER_EXTERNAL_URL variable automatically in production.
// const callbackURL = process.env.NODE_ENV === 'production'
//   ? `${process.env.RENDER_EXTERNAL_URL}/api/auth/google/callback`
//   : 'http://localhost:3001/api/auth/google/callback';

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.OAUTH_CLIENT_ID,
//       clientSecret: process.env.OAUTH_SECRET,
//       callbackURL: callbackURL, // Use the dynamic callback URL
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Check if user exists in the database
//         const { rows } = await pool.query(
//           "SELECT * FROM users WHERE google_id = $1",
//           [profile.id]
//         );

//         if (rows.length > 0) {
//           // User found, return the user
//           return done(null, rows[0]);
//         }

//         // If user does not exist, create a new user
//         const newUser = {
//           google_id: profile.id,
//           name: profile.displayName,
//           email: profile.emails[0].value,
//         };

//         const result = await pool.query(
//           `INSERT INTO users (google_id, name, email) VALUES ($1, $2, $3) RETURNING *`,
//           [newUser.google_id, newUser.name, newUser.email]
//         );

//         // Return the new user
//         return done(null, result.rows[0]);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// // Serialize user to store in the session
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Deserialize user to retrieve from the session
// passport.deserializeUser(async (id, done) => {
//   try {
//     const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//     if (!rows.length) {
//       return done(new Error("User not found"));
//     }
//     done(null, rows[0]);
//   } catch (err) {
//     done(err);
//   }
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

// VERY IMPORTANT for Render (trust proxy for secure cookies)
app.set("trust proxy", 1);

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g. https://prithwe-llm8.onrender.com
    credentials: true,
  })
);
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
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // cookies only over https in prod
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

// Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const clientBuildPath = path.join(__dirname, "../client/dist");

  app.use(express.static(clientBuildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
