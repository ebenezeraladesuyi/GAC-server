import { Request, Response } from "express";
import ministriesModel from "../model/AyoAweMinRegModel";
import cloudinary from "../config/cloudinary";

// Create a new Ministry entry
// export const registerMinistry = async (req: Request, res: Response) => {
//     try {
//       const {
//         title,
//         firstName,
//         middleName,
//         lastName,
//         email,
//         phoneNumber,
//         whatsapp,
//         // address,
//         city,
//         state,
//         country,
//         gender,
//         ministryCall,
//         other,
//         whichMinistry,
//         why,
//       } = req.body;

//       if (!req.file) {
//         return res.status(400).json({ message: "Please upload an image" });
//     }

//     const ayoAweMinImage = req.file.path;
  
//       // Check if ministry already exists
//       const checkExist = await ministriesModel.findOne({ email });
  
//       if (checkExist) {
//         return res.status(400).json({
//           message: "This email has already been used",
//         });
//       }
  
//       // Create a new ministry entry
//       const newMinistry = await ministriesModel.create({
//         title,
//         firstName,
//         middleName,
//         lastName,
//         email,
//         phoneNumber,
//         whatsapp,
//         // address,
//         city,
//         state,
//         country,
//         gender,
//         ministryCall,
//         other,
//         whichMinistry,
//         why,
//         ayoAweMinImage
//       });
      
//       await newMinistry.save();

//       return res.status(201).json({
//         message: "Minister registered successfully",
//         data: newMinistry,
//       });
//     } catch (error: any) {
//       return res.status(400).json({
//         message: "Failed to register minister",
//         error: error?.message,
//       });
//     }
//   };

export const registerMinistry = async (req: Request, res: Response) => {
    try {
      const {
        title,
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        whatsapp,
        city,
        state,
        country,
        gender,
        ministryCall,
        other,
        whichMinistry,
        why,
      } = req.body;
  
      if (!req.file) {
        return res.status(400).json({ message: "Please upload an image" });
      }
  
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "ministries", // Cloudinary folder name
      });
  
      // Check if ministry already exists
      const checkExist = await ministriesModel.findOne({ email });
  
      if (checkExist) {
        return res.status(400).json({
          message: "This email has already been used",
        });
      }
  
      // Create a new ministry entry with Cloudinary image URL
      const newMinistry = await ministriesModel.create({
        title,
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        whatsapp,
        city,
        state,
        country,
        gender,
        ministryCall,
        other,
        whichMinistry,
        why,
        ayoAweMinImage: result.secure_url, 
      });
  
      await newMinistry.save();
  
      return res.status(201).json({
        message: "Minister registered successfully",
        data: newMinistry,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Failed to register minister",
        error: error?.message,
      });
    }
  };

// Get all Ministry entries
export const getAllMinisters = async (req: Request, res: Response) => {
    try {
        const ministries = await ministriesModel.find();
        res.status(200).json({
            success: true,
            data: ministries,
            message: "All minister gotten",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching ministries",
            error: (error as Error).message,
        });
    }
};

// Get a single Ministry entry by ID
export const getMinistryById = async (req: Request, res: Response) => {
    try {
        const ministry = await ministriesModel.findById(req.params.id);
        if (!ministry) {
            return res.status(404).json({
                success: false,
                message: "Ministry entry not found",
            });
        }
        res.status(200).json({
            success: true,
            data: ministry,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching ministry entry",
            error: (error as Error).message,
        });
    }
};

// Update a Ministry entry by ID
export const updateMinistry = async (req: Request, res: Response) => {
    try {
        const updatedMinistry = await ministriesModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedMinistry) {
            return res.status(404).json({
                success: false,
                message: "Ministry entry not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Ministry entry updated successfully",
            data: updatedMinistry,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating ministry entry",
            error: (error as Error).message,
        });
    }
};

// Delete a Ministry entry by ID
export const deleteMinistry = async (req: Request, res: Response) => {
    try {
        const deletedMinistry = await ministriesModel.findByIdAndDelete(req.params.id);
        if (!deletedMinistry) {
            return res.status(404).json({
                success: false,
                message: "Ministry entry not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Ministry entry deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting ministry entry",
            error: (error as Error).message,
        });
    }
};
