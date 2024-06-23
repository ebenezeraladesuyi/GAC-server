import { Request, Response } from "express";
import memberModel from "../model/MembersModel";


//register a user
export const registerMember = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      when,
      how,
      will,
    } = req.body;

    const checkExist = await memberModel.findOne({ email });

    if (checkExist) {
      return res.status(500).json({
        message: "This email has been used",
      });
    } else {

      const users = await memberModel.create({
        name,
        email,
        phoneNumber,
        when,
        how,
        will,
      });
  
      return res.status(200).json({
        message: "member registered",
        data: users,
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "failed to register member",
      data: error?.message,
    });
  }
};

// get all members
export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const users = await memberModel.find();

    return res.status(200).json({
      message: "gotten all members",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      message: "failed to get all members",
      data: error,
    });
  }
};


