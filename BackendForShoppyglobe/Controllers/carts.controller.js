import Cart from "../Models/carts.model.js";
import Product from "../Models/products.model.js";

//  Add a product to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [{ productId, quantity }],
      });
    } else {
      // Check if the product is already in the cart
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        // Update the quantity if item exists
        existingItem.quantity += quantity;
      } else {
        // Add the new product to the cart
        cart.items.push({ productId, quantity });
      }
    }
    await cart.save();
    res.status(201).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Oops, there was an error." });
  }
};

// Get all items in cart with product details
export const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId",
      "title price description stockQuantity"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }
    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items" });
  }
};

// Update product quantity in cart
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: "Cart item updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item" });
  }
};

// Remove product from cart
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    // Find the index of the item to remove
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Remove the item from the cart items array
    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({ message: "Cart item removed" });
  } catch (error) {
    res.status(500).json({ message: "Error removing cart item", error });
  }
};
