import Business from '../models/Business.model.js';
import { verifyJWT } from '../services/jwt.js';

// Fetch Business Profile
export const getBusinessProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = verifyJWT(token);
    } catch (error) {
      return res.status(401).json({ success: false, message: error.message });
    }

    const business = await Business.findOne({ where: { business_id: decoded.id } });
    
    if (!business) {
      return res.status(404).json({ success: false, message: 'Business not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        business_name: business.business_name,
        business_address: business.business_address,
        city: business.city,
        state: business.state,
        zip_code: business.zip_code,
        contact_number: business.contact_number,
        business_email: business.business_email,
        business_purpose: business.business_purpose,
        updated_at: business.updated_at
      }
    });
  } catch (error) {
    console.error('Error fetching business profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Update Business Profile
export const updateBusinessProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = verifyJWT(token);
    } catch (error) {
      return res.status(401).json({ success: false, message: error.message });
    }

    const {
      business_name,
      business_address,
      city,
      state,
      zip_code,
      contact_number,
      business_email,
      business_purpose
    } = req.body;

    const [updatedRows] = await Business.update(
      {
        business_name,
        business_address,
        city,
        state,
        zip_code,
        contact_number,
        business_email,
        business_purpose,
        updated_at: new Date()
      },
      {
        where: { business_id: decoded.id }
      }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ success: false, message: 'Business not found or no changes made' });
    }

    res.status(200).json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating business profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
