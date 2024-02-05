import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String,  //cloundinary url
            required: true
        },
        thumbnail: {
            type: String,  //cloundinary url
            required: true
        },
        title: {
            type: String,  
            required: true
        },
        description: {
            type: String,  
            required: true
        },
        duration: {
            type: Number,  //cloundinary url
            required: true
        },
        views: {
            type: Number,  //cloundinary url
            default: 0
        },
        isPublished: {
            type: Number,  //cloundinary url
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)
videoSchema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model("Video", videoSchema)