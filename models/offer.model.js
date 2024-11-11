import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Offers = sequelize.define('offers', {
    offer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    store_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    offer_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    discount_percentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    minimum_purchase: {
        type: DataTypes.DECIMAL(10, 2)
    },
    maximum_discount: {
        type: DataTypes.DECIMAL(10, 2)
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'offers',
    timestamps: false
});

export default Offers;