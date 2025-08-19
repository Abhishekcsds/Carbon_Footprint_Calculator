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




import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { pool } from "./db.js";  // ✅ correct relative path

dotenv.config();

// Dynamic callback URL (local vs Render production)
const callbackURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.RENDER_EXTERNAL_URL}/api/auth/google/callback`
    : "http://localhost:3001/api/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_SECRET,
      callbackURL, // ✅ clean shorthand
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE google_id = $1",
          [profile.id]
        );

        if (rows.length > 0) {
          return done(null, rows[0]);
        }

        // Create new user if not found
        const result = await pool.query(
          `INSERT INTO users (google_id, name, email)
           VALUES ($1, $2, $3)
           RETURNING *`,
          [profile.id, profile.displayName, profile.emails[0].value]
        );

        return done(null, result.rows[0]);
      } catch (err) {
        console.error("Passport Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (rows.length === 0) return done(new Error("User not found"));
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});

export default passport; // ✅ Always export
