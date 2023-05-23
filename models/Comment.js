import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
          },
    userName: {
      type : String
    },      
    comment: {
      type: String
    },
    like: {
      type: Number
    },
    time: {
      type: String
    }     
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.models.Comment || mongoose.model('Comment', orderSchema);

export default Comment;