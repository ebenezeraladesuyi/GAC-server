import express from "express"
import { deleteMember, getAllMembers, registerMember } from "../controller/MemberController";

const memberRouter = express.Router()

// userRouter.get("/registered" , getAllWorkers)
memberRouter.post("/memberregister", registerMember)
memberRouter.get("/allmembersregistered", getAllMembers)
memberRouter.delete("/deletemember/:id", deleteMember)


export default memberRouter