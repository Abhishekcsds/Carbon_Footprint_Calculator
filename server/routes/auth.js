


// import express from "express";
// import { passport } from "../config/passport.js";

// const router = express.Router();

// // Step 1: Google login
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// // Step 2: Callback
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: `${process.env.CLIENT_URL}/login`,
//     session: true,
//   }),
//   (req, res) => {
//     // ✅ Redirect to frontend after login
//     res.redirect(`${process.env.CLIENT_URL}/`);
//   }
// );

// // Step 3: Check status
// router.get("/status", (req, res) => {
//   if (req.isAuthenticated()) {
//     return res.json({ authenticated: true, user: req.user });
//   }
//   res.json({ authenticated: false, user: null });
// });

// // Step 4: Logout
// router.post("/logout", (req, res, next) => {
//   req.logout(err => {
//     if (err) return next(err);
//     req.session.destroy(() => {
//       res.clearCookie("connect.sid", { path: "/" });
//       res.json({ message: "Logout successful" });
//     });
//   });
// });

// export default router;



// server/routes/auth.js
import express from "express";
import { passport } from "../config/passport.js";

const router = express.Router();

// Step 1: Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: true,
  }),
  (req, res) => {
    // ✅ Ensure session is saved before redirect
    req.session.save(() => {
      res.redirect(`${process.env.CLIENT_URL}/`);
    });
  }
);

// Step 3: Check auth status
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
