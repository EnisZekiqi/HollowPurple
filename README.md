# HollowPurple

HollowPurple is a fully functional eCommerce website where users can browse products, add them to their cart or favorites, and place orders. It provides a seamless shopping experience with features like product search, category filtering, and dynamic UI updates.

---

## Features

### 1. **Product Browsing**
- To view products, click the **"Check Products"** button on the hero section.
- Products are displayed dynamically, fetched from a `JSON` file stored in the public folder.

### 2. **Search Functionality**
- Use the **search bar** in the navbar to find products by name or description.
- Filters through all available products and displays relevant results instantly.

### 3. **Navbar Icons**
- **Order Details Icon**: Displays a notification for completed orders. Clicking redirects to a page with detailed order information.
- **Favorites Icon**: Shows the number of products added to favorites. Clicking opens a drawer with the list of favorite products.
- **Cart Icon**: Displays the number of products added to the cart. Clicking redirects to the cart page.

### 4. **Product Details Page**
- Clicking on a product directs you to its detailed page.
- Detailed information includes:
  - Product name
  - Price
  - Stock availability
  - Description
- Actions available:
  - **Add to Favorites**: Adds the product to your favorites list.
  - **Add to Cart**: Adds the product to your cart.
  - **Order Now**: Opens a modal to place an order directly.

### 5. **Favorites Drawer**
- Displays all products added to favorites.
- Actions available:
  - Add to Cart
  - Remove from Favorites

### 6. **Cart Page**
- Displays all products added to the cart.
- Users can review their selections and proceed to place orders.

### 7. **Order Now Workflow**
- Clicking **Order Now** opens a modal with input fields for order details.
- Completing the form triggers an animated tick, signifying a successful order.
- A notification with primary order details appears on the **Order Details Icon**.
- Clicking the icon redirects to a detailed order page.

### 8. **Shortcuts**
- **Brands**: Filter products by specific brands. Clicking a brand displays all relevant products.
- **Tech**: Filter products by technology-related categories.

---

## How It Works

1. **Hero Section**: Start by clicking the "Check Products" button to load the product list.
2. **Search**: Use the search bar in the navbar to find specific products.
3. **Filter by Category**: Use the shortcuts (Brands/Tech) to filter products.
4. **Product Details**: Click on a product to view its details and perform actions like adding to favorites or cart.
5. **Favorites Drawer**: View and manage your favorite products.
6. **Cart Page**: Review your cart and place an order.
7. **Order Now**: Fill in the required details in the modal to complete your order.

---

## Technologies Used

- **React.js**: Frontend framework for building the UI.
- **React Router**: For handling navigation between pages.
- **Local Storage**: To persist favorites, cart items, and order details.
- **Tailwind CSS**: For responsive and modern styling.
- **Framer Motion**: For animations and transitions.
- **Custom JSON API**: Used for storing and fetching product data.

---

## Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/hollowpurple.git
   cd hollowpurple
