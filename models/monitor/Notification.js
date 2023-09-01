const { userTypeEnum } = require('../../helpers/enums');

module.exports = (sequelize, datatypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      id: {
        type: datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: datatypes.INTEGER,
        allowNull: false,
      },
      userType: {
        type: datatypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [Object.values(userTypeEnum)],
            msg: `userType must be in ${Object.values(userTypeEnum)}`,
          },
        },
      },
      /** notification: { title: "", body: ""} */
      notification: {
        type: datatypes.JSON,
        allowNull: false,
        get() { return JSON.parse(this.getDataValue('notification')); }, // prettier-ignore
        set(value) { this.setDataValue('notification', JSON.stringify(value)); }, // prettier-ignore
      },
      /** data: {   type: "",   entity_id: "",   entity_type: "", } */
      data: {
        type: datatypes.JSON,
        allowNull: false,
        get() { return JSON.parse(this.getDataValue('data')); }, // prettier-ignore
        set(value) { this.setDataValue('data', JSON.stringify(value)); }, // prettier-ignore
      },
    },

    {
      timestamps: true,
      freezeTableName: true,
      indexes: [
        {
          name: 'notification_user',
          fields: ['userId'],
        },
      ],
    },
  );

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, { foreignKey: 'userId', constraints: false }); // prettier-ignore
  };

  return Notification;
};