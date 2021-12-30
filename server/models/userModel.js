import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      currentTime: () => {
        let currDate = new Date();
        // 3 saat öncesi olduğu için utc_offset -180 çıkıyor
        let utc_offset = currDate.getTimezoneOffset();
        // normalde formül + fakat yukarıdaki sonuç negatif çıktığı için - yaptım ki toplasın
        let result = currDate.setMinutes(currDate.getMinutes() - utc_offset);
        return result;
      },
    },
  }
);

const User = mongoose.model('User', userSchema);

export default User;
