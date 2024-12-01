import { verifyJWT } from '../services/jwt.js';
import {Business, Store, Offers} from '../models/association.js';

const businessYourOffersController = async (req, res) => {
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

    const business = await Business.findByPk(decoded.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const stores = await Store.findAll({
      where: { store_id: business.business_id },
      include: [{
        model: Offers,
        attributes: ['offer_type', 'end_date']
      }],
      attributes: ['store_name', 'address', 'phone_number']
    });
    res.status(200).json(stores);
  } catch (error) {
    console.error('Error in businessYourOffersController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default businessYourOffersController;