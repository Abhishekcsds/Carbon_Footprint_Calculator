

// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import dotenv from "dotenv";
// import { pool } from "./db.js";

// dotenv.config();

// // Dynamic callback URL (Render vs Local)
// const callbackURL =
//   process.env.NODE_ENV === "production"
//     ? `${process.env.RENDER_EXTERNAL_URL}/api/auth/google/callback`
//     : "http://localhost:3001/api/auth/google/callback";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.OAUTH_CLIENT_ID,
//       clientSecret: process.env.OAUTH_SECRET,
//       callbackURL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const { rows } = await pool.query(
//           "SELECT * FROM users WHERE google_id = $1",
//           [profile.id]
//         );

//         let user;
//         if (rows.length > 0) {
//           user = rows[0];
//         } else {
//           const result = await pool.query(
//             `INSERT INTO users (google_id, name, email)
//              VALUES ($1, $2, $3) RETURNING *`,
//             [profile.id, profile.displayName, profile.emails[0].value]
//           );
//           user = result.rows[0];
//         }

//         return done(null, user);
//       } catch (err) {
//         console.error("Passport Strategy Error:", err);
//         return done(err, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id); // store user.id in session
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//     if (rows.length === 0) return done(new Error("User not found"));
//     done(null, rows[0]);
//   } catch (err) {
//     done(err);
//   }
// });

// export { passport }; // named export for clarity



import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

// ✅ Dynamic callback URL
const callbackURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.RENDER_EXTERNAL_URL}/api/auth/google/callback`
    : "http://localhost:3001/api/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE google_id = $1",
          [profile.id]
        );

        let user;
        if (rows.length > 0) {
          user = rows[0];
        } else {
          const result = await pool.query(
            `INSERT INTO users (google_id, name, email)
             VALUES ($1, $2, $3) RETURNING *`,
            [profile.id, profile.displayName, profile.emails[0].value]
          );
          user = result.rows[0];
        }

        return done(null, user);
      } catch (err) {
        console.error("Passport Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (rows.length === 0) return done(new Error("User not found"));
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});

export { passport };
