import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler ( async (req, res) => {
    res.status(200).json({
        message: "hello gaurav here's your journey to backend"
    })
})

export {registerUser}