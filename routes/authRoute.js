const express = require("express");
const router = express.Router();
const {
    createUser,
    loginUserCtrl,
    getAllUser,
    getSingleUser,
    deleteSingleUser,
    updateSingleUser
} = require("../controllers/userCtrl");

const { authMiddleware, isAdmin } = require("../middleware/authMiddleware")


router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getAllUser);
router.get("/:id", authMiddleware, isAdmin, getSingleUser);
router.delete("/:id", authMiddleware, isAdmin, deleteSingleUser);
router.put("/edit-user", authMiddleware, isAdmin, updateSingleUser);

module.exports = router;