import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/ApiResponse.js"; 

const registerUser = asyncHandler ( async (req, res) => {
    // (Algorithms):
    // get user details from frontend 
    // validation - not empty
    // check if user already exist: username && email
    // check for the images, check for the avatar!
    // upload them to cloudinary, check for avatar!
    // create user object - create entry db
    // remove password and refresh token field from response
    // check for user creation 
    // return response..

    const { fullName, email, username, password } = req.body
    console.log("email: ", email);

    // This can be done with each parameters that to be checked 
    // if(fullName === "") {
    //     throw new ApiError(400, "full name is required")
    // }

    // better approach: 
    if(
        [fullName, email, username, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath =  req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = await uploadCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await user.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.this.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

export {
    registerUser,
}