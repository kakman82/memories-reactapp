import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
      // when a post is liked, user id will be pushed into array
      // length of this array gives like count as well
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    // timestamps: {
    //   currentTime: () => {
    //     let currDate = new Date();
    //     // 3 saat öncesi olduğu için utc_offset -180 çıkıyor
    //     let utc_offset = currDate.getTimezoneOffset();
    //     // normalde formül + fakat yukarıdaki sonuç negatif çıktığı için - yaptım ki toplasın
    //     let result = currDate.setMinutes(currDate.getMinutes() - utc_offset);
    //     return result;
    //   },
    // },
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
