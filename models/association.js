import Store from './store.model.js';
import Offers from './offer.model.js';
import Business from './Business.model.js';
import User from './user.model.js';
import CardPurchaseTransaction from './cardPurchaseTransaction.model.js';
import OfferTransaction from './offerTransaction.model.js';
import Cards from './card.model.js';
import Feedback from './feedback.model.js';
import BusinessActivityLog from './businessActivityLog.model.js';
import StoresSubaccount from './storesSubaccount.model.js';
import Admin from './admin.model.js';
import AdminActivityLog from './adminActivityLog.model.js';

// Store and Offers associations
Store.hasMany(Offers, { foreignKey: 'store_id', as: 'Offers', onDelete: 'CASCADE' });
Offers.belongsTo(Store, { foreignKey: 'store_id', onDelete: 'CASCADE' });

// Other associations
User.hasMany(CardPurchaseTransaction, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(OfferTransaction, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Cards, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Feedback, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Business.hasMany(CardPurchaseTransaction, { foreignKey: 'business_id', onDelete: 'CASCADE' });
Business.hasMany(OfferTransaction, { foreignKey: 'business_id', onDelete: 'CASCADE' });
Business.hasMany(BusinessActivityLog, { foreignKey: 'business_id', onDelete: 'CASCADE' });
Business.hasMany(Feedback, { foreignKey: 'business_id', onDelete: 'CASCADE' });

Store.hasMany(StoresSubaccount, { foreignKey: 'store_id', onDelete: 'CASCADE' });
Store.hasMany(OfferTransaction, { foreignKey: 'store_id', onDelete: 'CASCADE' });
Store.hasMany(Feedback, { foreignKey: 'store_id', onDelete: 'CASCADE' });
Store.hasMany(BusinessActivityLog, { foreignKey: 'store_id', onDelete: 'CASCADE' });

StoresSubaccount.belongsTo(Store, { foreignKey: 'store_id', onDelete: 'CASCADE' });

CardPurchaseTransaction.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
CardPurchaseTransaction.belongsTo(Business, { foreignKey: 'business_id', onDelete: 'CASCADE' });

OfferTransaction.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
OfferTransaction.belongsTo(Business, { foreignKey: 'business_id', onDelete: 'CASCADE' });
OfferTransaction.belongsTo(Offers, { foreignKey: 'offer_id', onDelete: 'CASCADE' });
OfferTransaction.belongsTo(Store, { foreignKey: 'store_id', onDelete: 'CASCADE' });

Cards.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Cards.belongsTo(Business, { foreignKey: 'business_id', onDelete: 'CASCADE' });

Feedback.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Feedback.belongsTo(Store, { foreignKey: 'store_id', onDelete: 'CASCADE' });
Feedback.belongsTo(Business, { foreignKey: 'business_id', onDelete: 'CASCADE' });

BusinessActivityLog.belongsTo(Store, { foreignKey: 'store_id', onDelete: 'CASCADE' });
BusinessActivityLog.belongsTo(Business, { foreignKey: 'business_id', onDelete: 'CASCADE' });

Admin.hasMany(AdminActivityLog, { foreignKey: 'admin_id', onDelete: 'CASCADE' });
AdminActivityLog.belongsTo(Admin, { foreignKey: 'admin_id', onDelete: 'CASCADE' });

export {
    Store,
    Offers,
    Business,
    User,
    CardPurchaseTransaction,
    OfferTransaction,
    Cards,
    Feedback,
    BusinessActivityLog,
    StoresSubaccount,
    Admin,
    AdminActivityLog
};