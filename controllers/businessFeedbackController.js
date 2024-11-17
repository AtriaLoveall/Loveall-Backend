import { verifyJWT } from '../services/jwt.js';
import { Feedback } from '../models/association.js';
import { Op } from 'sequelize';

const businessFeedbackController = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = verifyJWT(token);
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { ratingFilter, dateFilter } = req.query;

    let whereClause = { business_id: decoded.id };
    if (ratingFilter) {
      whereClause.no_of_stars = ratingFilter;
    }

    let order = [['date', 'DESC']];
    if (dateFilter === 'oldest') {
      order = [['date', 'ASC']];
    }

    const feedbacks = await Feedback.findAll({
      where: whereClause,
      order: order,
      attributes: ['feedback_id', 'no_of_stars', 'feedback', 'date']
    });

    res.status(200).json({ data: feedbacks });
  } catch (error) {
    console.error('Error in businessFeedbackController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default businessFeedbackController;