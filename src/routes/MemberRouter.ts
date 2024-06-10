import express from "express"
import { getAllMembers, registerMember } from "../controller/MemberController";

const memberRouter = express.Router()

// userRouter.get("/registered" , getAllWorkers)
memberRouter.post("/memberregister", registerMember)
memberRouter.get("/allmembersregistered", getAllMembers)


export default memberRouter