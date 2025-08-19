// import express from "express";
// import passport from "passport";

// const router = express.Router();

// // Route: /api/auth/google - Initiates Google Login
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// // Route: /api/auth/google/callback - Google redirect callback
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: `${process.env.CLIENT_URL}/login`,
//   }),
//   (req, res) => {
//     res.redirect(`${process.env.CLIENT_URL}/`);
//   }
// );

// // Route: /api/auth/status - Checks if user is authenticated
// router.get("/status", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.status(200).json({ authenticated: true, user: req.user });
//   } else {
//     res.status(200).json({ authenticated: false, user: null });
//   }
// });

// // Route: /api/auth/logout - Logs the user out
// router.post("/logout", (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     req.session.destroy(() => {
//       res.clearCookie("connect.sid");
//       res.status(200).json({ message: "Logout successful" });
//     });
//   });
// });

// export default router;


import express from "express";
import { passport } from "../config/passport.js";

const router = express.Router();

// Step 1: Google login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: true,
  }),
  (req, res) => {
    // ✅ Now user is attached to req.user and stored in session
    res.redirect(`${process.env.CLIENT_URL}/`);
  }
);

// Step 3: Check status
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ authenticated: true, user: req.user });
  }
  res.json({ authenticated: false, user: null });
});

// Step 4: Logout
router.post("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logout successful" });
    });
  });
});

export default router;
