const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name!'],
    },
    email: {
      type: String,
      index: true,
      unique: true,
      required: [true, 'A user must have an email!'],
    },
    password: {
      type: String,
      required: [true, 'A user must hava a password!'],
    },
  },
  { timestamps: true }
);

schema.pre('save', function (next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;

        next();
      });
    });
  } else return next();
});

module.exports = model('User', schema);
