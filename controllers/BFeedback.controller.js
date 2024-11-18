import {Feedback} from "../models/association.js";
const fetchFeedback = async (req, res, next) => {
    try {
        const store_id = req.business.id;
        const feedbacks = await Feedback.findAll({where: {store_id}})
        return res.status(200).json({success: true, message: "Fetched successfully", feedbacks});   
    } catch (error) {
        console.log("Error caught");
        next(error);
    }
}

export default fetchFeedback;