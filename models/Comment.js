const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'BlogPost',
                key: 'id'
            }
        },
        user_id : {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'Comment',
        timestamps: false,
        freezeTableName: true,
        underscored: true,

    }
);

module.exports = Comment;