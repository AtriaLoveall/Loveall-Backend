import sequelize from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import Business from "./Business.model.js";

const Store = sequelize.define('stores', {
    store_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    store_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    store_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    owner_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [10, 15]
        }
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING
    },
    otp_expiration_time: {
        type: DataTypes.DATE
    },
    address: {
        type: DataTypes.STRING
    },
    business_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Business,
            key: 'business_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    manager_name: {
        type: DataTypes.STRING
    },
    manager_phone_no: {
        type: DataTypes.STRING
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
    tableName: 'stores',
    timestamps: false
});

Business.hasMany(Store, { foreignKey: 'business_id', onDelete: 'CASCADE' });
Store.belongsTo(Business, { foreignKey: 'business_id', onDelete: 'CASCADE' });

export default Store;