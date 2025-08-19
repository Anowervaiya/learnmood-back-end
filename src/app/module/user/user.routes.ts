import { Router } from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interfaces";

const router = Router()
router.post("/register", UserControllers.createUser)
router.get('/all-users',checkAuth(Role.ADMIN), UserControllers.getAllUsers)
router.delete('/delete/:id', checkAuth(Role.ADMIN) , UserControllers.deleteUser)
router.patch('/block/:id' , checkAuth(Role.ADMIN) , UserControllers.blockUser)
export const UserRoutes = router;