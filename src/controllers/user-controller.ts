import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../models/user-model";
import { ResponseHandler } from "../lib/response-handlers/response-handler";
import { CustomError } from "../lib/exceptions/custom-error";

/**
 * @class UserControllers
 * @description Handles user-related operations such as creating, retrieving, and updating users.
 */
class UserControllers {
  /**
   * @method createUser
   * @description Creates a new user in the database.
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next function
   * @body { firstName, lastName, email } - The user data to create
   * @returns {Promise<void>} - A promise that resolves when the user is created
   */
  static async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { firstName, lastName, email } = req.body;

      if (!firstName || !lastName || !email) {
        throw new CustomError(
          "firstName, lastName and email are required",
          400
        );
      }

      const user = await User.create({
        firstName,
        lastName,
        email,
      });

      if (!user) {
        throw new CustomError("Failed to create user", 500);
      }

      ResponseHandler.ok(res, 201, "User created successfully", user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method getAllUsers
   * @description Retrieves all users from the database.
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next function
   */
  static async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await User.find();
      ResponseHandler.ok(res, 200, "Users retrieved successfully", users);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method getUserById
   * @description Retrieves a user by their ID.
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next function
   * @param id - The ID of the user to retrieve
   */
  static async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError("Invalid user id", 400);
      }

      const user = await User.findById(id);

      if (!user) {
        throw new CustomError("User not found", 404);
      }

      ResponseHandler.ok(res, 200, "User retrieved successfully", user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method updateUser
   * @description Updates a user by their ID.
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next function
   * @body { firstName, lastName, email } - The updated user data
   */

  static async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { firstName, lastName, email } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError("Invalid user id", 400);
      }

      if (!firstName || !lastName || !email) {
        throw new CustomError(
          "firstName, lastName and email are required",
          400
        );
      }

      const user = await User.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          email,
        },
        { new: true }
      );

      if (!user) {
        throw new CustomError("user with id does not exist", 404);
      }

      ResponseHandler.ok(res, 200, "User updated successfully", user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method deleteUser
   * @description Deletes a user by their ID.
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next function
   * @param id - The ID of the user to delete
   * @returns {Promise<void>} - A promise that resolves when the user is deleted
   */

  static async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError("Invalid user id", 400);
      }

      await User.findByIdAndDelete(id);

      ResponseHandler.ok(res, 200, "User deleted successfully", null);
    } catch (error) {
      next(error);
    }
  }
}

export { UserControllers };
