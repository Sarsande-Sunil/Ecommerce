const Order = require("../models/orderModel");

const Product = require("../models/productModels");

const ErorroHandler = require("../utils/errorHandller");

// import async await error handler
const catchAsyncErrors = require("../midddleware/catchAsyncerror");

const ApiFeatures = require("../utils/apifeatures");

// create new order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get sinple order or order details

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErorroHandler("product not found with given id ", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// find login user orders my orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all orders

// find login user orders my orders only admin acess it
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.itemPrice;
  });
  console.log(totalAmount);

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

/// update order status only admin can do this

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErorroHandler("You have Already acess this order"));
  }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliverAt = Date.now();
  }
  
  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// if stock has 5 and quantity = 3      5-3  2 = product
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// delete order

exports.deleteOrders = catchAsyncErrors(async (req, res, next) => {

  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return next(new ErorroHandler("product not found with given id ", 404));
  }

  await order.remove();
  
  res.status(200).json({
    success: true,
  });

});

