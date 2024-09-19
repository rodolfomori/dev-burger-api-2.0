import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      _id: false,
    },
    products: [
      {
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        _id: false,
      },
    ],
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model('Order', OrderSchema);
