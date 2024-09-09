class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const cartItem = new ShoppingCartItem(product, quantity);
      this.items.push(cartItem);
    }
    this.displayCart();
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.displayCart();
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  displayCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = "";

    this.items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.textContent = `${item.product.name} - Quantity: ${
        item.quantity
      } - Total: $${item.getTotalPrice().toFixed(2)}`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.onclick = () => {
        this.removeItem(item.product.id);
      };

      itemDiv.appendChild(removeButton);
      cartItemsDiv.appendChild(itemDiv);
    });

    const totalPriceDiv = document.createElement("div");
    totalPriceDiv.textContent = `Total Price: $${this.getTotalPrice().toFixed(
      2
    )}`;
    cartItemsDiv.appendChild(totalPriceDiv);
  }
}

const product1 = new Product(1, "Tomate", 0.9);
const product2 = new Product(2, "Banana", 1.3);
const product3 = new Product(3, "Orange", 12);

const shoppingCart = new ShoppingCart();

const productListDiv = document.getElementById("product-list");

const products = [product1, product2, product3];
products.forEach((product) => {
  const productDiv = document.createElement("div");
  productDiv.textContent = `${product.name} - $${product.price.toFixed(2)}`;

  const addButton = document.createElement("button");
  addButton.textContent = "Add to Cart";
  addButton.onclick = () => {
    shoppingCart.addItem(product, 1);
  };

  productDiv.appendChild(addButton);
  productListDiv.appendChild(productDiv);
});

shoppingCart.displayCart();
