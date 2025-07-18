"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Food-specific image function with unique, high-quality images
const getFoodImageUrl = (itemName: string, category: string) => {
  // Create a mapping of food items to specific, unique image URLs
  const foodImageMap: { [key: string]: string } = {
    // Small Bites - Each with unique image
    "Korean Bun": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=400&fit=crop",
    "Chilli Korean Bun": "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=400&fit=crop",
    "Potato Wedges": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop",
    "Chilli Garlic Wedges": "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=600&h=400&fit=crop",
    "Cauliflower Florets": "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&h=400&fit=crop",
    "French Fries": "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&h=400&fit=crop",
    "Nachos": "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&h=400&fit=crop",
    "Honey Chilli Potato": "https://images.unsplash.com/photo-1615297928064-24977384d0da?w=600&h=400&fit=crop",
    "Mushroom Slider": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop",
    "Paneer Makhni Slider": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=400&fit=crop",
    "Chettni Paneer": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=400&fit=crop",
    "Tom Yum Paneer": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=400&fit=crop",
    "Bellpepper Soup": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
    "Cream of Mushroom": "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&h=400&fit=crop",
    "Manchow Soup": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&h=400&fit=crop",
    "Pesto Zucchini Soup": "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop",
    
    // Pasta - Each with unique pasta images
    "Arrabiata": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=600&h=400&fit=crop",
    "Alfredo": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&h=400&fit=crop",
    "Pink Sauce": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop",
    "Mafia": "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?w=600&h=400&fit=crop",
    "Pesto": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop",
    "Aglio e Olio": "/alioeolio.jpg",
    
    // Pizza - Each with unique pizza images
    "Margherita": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&h=400&fit=crop",
    "Mexican": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&h=400&fit=crop",
    "Fantasy": "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&fit=crop",
    "Cicilia": "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&h=400&fit=crop",
    "Neapolitan": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop",
    "Rustic": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop",
    "Paneer Tikka Pizza": "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=600&h=400&fit=crop",
    
    // Burgers - Each with unique burger images
    "Veg Burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
    "Mexican Burger": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=400&fit=crop",
    "Cheese Burger": "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=600&h=400&fit=crop",
    "Magic Mushroom": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=400&fit=crop",
    
    // Sandwiches & Rolls - Each with unique images
    "Veg Sandwich": "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=600&h=400&fit=crop",
    "Paneer Tikka Sandwich": "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=600&h=400&fit=crop",
    "Bombay Masala Sandwich": "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&h=400&fit=crop",
    "Spicy Paneer Roll": "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=400&fit=crop",
    
    // Indian Specials - Each with unique Indian food images
    "Amritsari Chole Kulche": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
    "Khao Suey": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop",
    "Paneer Tikka Masala": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&h=400&fit=crop",
    "Dal Makhni with Rice": "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop",
    
    // Chinese & Rice - Each with unique Asian food images
    "Veg Fried Rice": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop",
    "Hakka Noodles": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop",
    "Schezwan Noodles": "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&h=400&fit=crop",
    "Paneer Fried Rice": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop",
    
    // Drinks - Each with unique beverage images
    "Masala Chai": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop",
    "Cold Coffee": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop",
    "Iced Teas": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop",
    "Milkshakes": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&h=400&fit=crop",
  };
  
  // Return specific image or fallback to a default food image
  return foodImageMap[itemName] || `https://images.unsplash.com/photo-1504754528070-dd0352c29427?w=600&h=400&fit=crop`;
};

const menuItems = [
   {
    category: "Small Bites",
    items: [
      { name: "Korean Bun", price: "160", description: "Cheese-filled garlic bun", image: getFoodImageUrl("Korean Bun", "Small Bites") },
      { name: "Chilli Korean Bun", price: "170", description: "Spicy twist on garlic bun", image: getFoodImageUrl("Chilli Korean Bun", "Small Bites") },
      { name: "Potato Wedges", price: "120", description: "Classic crispy wedges", image: getFoodImageUrl("Potato Wedges", "Small Bites") },
      { name: "Chilli Garlic Wedges", price: "150", description: "Wedges with garlic & chilli", image: getFoodImageUrl("Chilli Garlic Wedges", "Small Bites") },
      { name: "Cauliflower Florets", price: "260", description: "Crispy florets with in-house dip", image: getFoodImageUrl("Cauliflower Florets", "Small Bites") },
      { name: "French Fries", price: "100", description: "Salted, peri peri or cheesy", image: getFoodImageUrl("French Fries", "Small Bites") },
      { name: "Nachos", price: "180", description: "With dip, loaded or Mexican", image: getFoodImageUrl("Nachos", "Small Bites") },
      { name: "Honey Chilli Potato", price: "180", description: "Sweet, spicy crispy potatoes", image: getFoodImageUrl("Honey Chilli Potato", "Small Bites") },
      { name: "Mushroom Slider", price: "185", description: "Mini burger with mushroom filling", image: getFoodImageUrl("Mushroom Slider", "Small Bites") },
      { name: "Paneer Makhni Slider", price: "185", description: "Mini burger with rich paneer filling", image: getFoodImageUrl("Paneer Makhni Slider", "Small Bites") },
      { name: "Chettni Paneer", price: "260", description: "South Indian-style chutney paneer", image: getFoodImageUrl("Chettni Paneer", "Small Bites") },
      { name: "Tom Yum Paneer", price: "260", description: "Thai style zesty paneer", image: getFoodImageUrl("Tom Yum Paneer", "Small Bites") },
      { name: "Bellpepper Soup", price: "180", description: "Smooth bellpepper-based soup", image: getFoodImageUrl("Bellpepper Soup", "Small Bites") },
      { name: "Cream of Mushroom", price: "180", description: "Classic creamy mushroom soup", image: getFoodImageUrl("Cream of Mushroom", "Small Bites") },
      { name: "Manchow Soup", price: "150", description: "Spicy Indo-Chinese soup", image: getFoodImageUrl("Manchow Soup", "Small Bites") },
      { name: "Pesto Zucchini Soup", price: "190", description: "Unique blend of pesto & zucchini", image: getFoodImageUrl("Pesto Zucchini Soup", "Small Bites") },
    ],
  },
  {
    category: "Pasta",
    items: [
      { name: "Arrabiata", price: "230", description: "Red sauce pasta (penne/spaghetti)", image: getFoodImageUrl("Arrabiata", "Pasta") },
      { name: "Alfredo", price: "230", description: "White sauce pasta", image: getFoodImageUrl("Alfredo", "Pasta") },
      { name: "Pink Sauce", price: "260", description: "Mix of red and white sauces", image: getFoodImageUrl("Pink Sauce", "Pasta") },
      { name: "Mafia", price: "260", description: "Spicy pink sauce", image: getFoodImageUrl("Mafia", "Pasta") },
      { name: "Pesto", price: "280", description: "Basil pesto pasta", image: getFoodImageUrl("Pesto", "Pasta") },
      { name: "Aglio e Olio", price: "290", description: "Garlic & olive oil pasta", image: getFoodImageUrl("Aglio e Olio", "Pasta") },
    ],
  },
  {
    category: "Pizza",
    items: [
      { name: "Margherita", price: "230", description: "Classic tomato & cheese", image: getFoodImageUrl("Margherita", "Pizza") },
      { name: "Mexican", price: "270", description: "Loaded veggies", image: getFoodImageUrl("Mexican", "Pizza") },
      { name: "Fantasy", price: "290", description: "Paneer, bell peppers, oregano", image: getFoodImageUrl("Fantasy", "Pizza") },
      { name: "Cicilia", price: "290", description: "Mushroom, pickled onion, basil", image: getFoodImageUrl("Cicilia", "Pizza") },
      { name: "Neapolitan", price: "290", description: "Olives, jalapeno, garlic oil", image: getFoodImageUrl("Neapolitan", "Pizza") },
      { name: "Rustic", price: "290", description: "Garlic oil, spinach, oregano", image: getFoodImageUrl("Rustic", "Pizza") },
      { name: "Paneer Tikka Pizza", price: "290", description: "Spicy paneer tikka toppings", image: getFoodImageUrl("Paneer Tikka Pizza", "Pizza") },
    ],
  },
  {
    category: "Soups",
    items: [
      { name: "Bellpepper Soup", price: "180", description: "Smooth bellpepper-based soup", image: getFoodImageUrl("Bellpepper Soup", "Soups") },
      { name: "Cream of Mushroom", price: "180", description: "Classic creamy mushroom soup", image: getFoodImageUrl("Cream of Mushroom", "Soups") },
      { name: "Manchow Soup", price: "150", description: "Spicy Indo-Chinese soup", image: getFoodImageUrl("Manchow Soup", "Soups") },
      { name: "Pesto Zucchini Soup", price: "190", description: "Unique blend of pesto & zucchini", image: getFoodImageUrl("Pesto Zucchini Soup", "Soups") },
    ],
  },
  {
    category: "Burgers",
    items: [
      { name: "Veg Burger", price: "160", description: "Simple and satisfying", image: getFoodImageUrl("Veg Burger", "Burgers") },
      { name: "Mexican Burger", price: "170", description: "Spicy and cheesy", image: getFoodImageUrl("Mexican Burger", "Burgers") },
      { name: "Cheese Burger", price: "190", description: "Loaded with cheese", image: getFoodImageUrl("Cheese Burger", "Burgers") },
      { name: "Magic Mushroom", price: "180", description: "Stuffed mushroom patty", image: getFoodImageUrl("Magic Mushroom", "Burgers") },
    ],
  },
  {
    category: "Sandwiches & Rolls",
    items: [
      { name: "Veg Sandwich", price: "150", description: "Classic veg filling", image: getFoodImageUrl("Veg Sandwich", "Sandwiches & Rolls") },
      { name: "Paneer Tikka Sandwich", price: "180", description: "Smoky paneer filling", image: getFoodImageUrl("Paneer Tikka Sandwich", "Sandwiches & Rolls") },
      { name: "Bombay Masala Sandwich", price: "180", description: "Spicy mashed potato sandwich", image: getFoodImageUrl("Bombay Masala Sandwich", "Sandwiches & Rolls") },
      { name: "Spicy Paneer Roll", price: "180", description: "Rolled spicy paneer filling", image: getFoodImageUrl("Spicy Paneer Roll", "Sandwiches & Rolls") },
    ],
  },
  {
    category: "Indian Specials",
    items: [
      { name: "Amritsari Chole Kulche", price: "240", description: "Homemade Punjabi style chole", image: getFoodImageUrl("Amritsari Chole Kulche", "Indian Specials") },
      { name: "Khao Suey", price: "290", description: "Coconut noodle curry", image: getFoodImageUrl("Khao Suey", "Indian Specials") },
      { name: "Paneer Tikka Masala", price: "260", description: "Served with rice/kulcha", image: getFoodImageUrl("Paneer Tikka Masala", "Indian Specials") },
      { name: "Dal Makhni with Rice", price: "295", description: "Rich creamy dal", image: getFoodImageUrl("Dal Makhni with Rice", "Indian Specials") },
    ],
  },
  {
    category: "Chinese & Rice",
    items: [
      { name: "Veg Fried Rice", price: "180", description: "Loaded with veggies", image: getFoodImageUrl("Veg Fried Rice", "Chinese & Rice") },
      { name: "Hakka Noodles", price: "220", description: "Classic Indo-Chinese noodles", image: getFoodImageUrl("Hakka Noodles", "Chinese & Rice") },
      { name: "Schezwan Noodles", price: "240", description: "Spicy garlic noodles", image: getFoodImageUrl("Schezwan Noodles", "Chinese & Rice") },
      { name: "Paneer Fried Rice", price: "240", description: "With kaju and paneer", image: getFoodImageUrl("Paneer Fried Rice", "Chinese & Rice") },
    ],
  },
  {
    category: "Drinks",
    items: [
      { name: "Masala Chai", price: "80", description: "Hot & spiced", image: getFoodImageUrl("Masala Chai", "Drinks") },
      { name: "Cold Coffee", price: "120", description: "Iced coffee blend", image: getFoodImageUrl("Cold Coffee", "Drinks") },
      { name: "Iced Teas", price: "120", description: "Peach, lemon, blueberry", image: getFoodImageUrl("Iced Teas", "Drinks") },
      { name: "Milkshakes", price: "160", description: "KitKat, Vanilla, Chocolate", image: getFoodImageUrl("Milkshakes", "Drinks") },
    ],
  },
];


export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(menuItems[0].category);
  const { addToCart, cartItems, updateQuantity } = useCart();
  const currentItems = menuItems.find((cat) => cat.category === activeCategory)?.items || [];

  // Function to get quantity of item in cart
  const getItemQuantity = (itemName: string) => {
    const cartItem = cartItems.find(item => item.name === itemName);
    return cartItem ? cartItem.quantity : 0;
  };

  // Function to handle add to cart without authentication check
  const handleAddToCart = (item: any) => {
    const cartItem = {
      id: `${item.name}-${activeCategory}`,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      category: activeCategory
    };
    addToCart(cartItem);
  };

  // Function to handle quantity updates without authentication check
  const handleQuantityUpdate = (itemName: string, newQuantity: number) => {
    updateQuantity(`${itemName}-${activeCategory}`, newQuantity);
  };

  return (
    <section
      id="menu"
      className="py-20 backdrop-blur-sm text-white min-h-screen block w-full"
      style={{ display: 'block', minHeight: '100vh', visibility: 'visible' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
            Explore Our <span className="text-red-600">Delicious Menu</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300">Select a category to explore handcrafted dishes.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 px-2">
          {menuItems.map(({ category }) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-5 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base ${
                activeCategory === category
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentItems.map((item, index) => (
            <div
              key={item.name}
              className="bg-zinc-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl group transition-shadow flex flex-col"
            >
              <div className="relative h-32 sm:h-40 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to a local placeholder if image fails to load
                    const target = e.currentTarget as HTMLImageElement;
                    target.src = '/placeholder.jpg';
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  unoptimized
                />
              </div>
              <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-lg sm:text-xl font-bold text-white">{item.name}</h4>
                    <span className="text-xl sm:text-2xl font-bold text-white-400">₹{item.price}</span>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm">{item.description}</p>
                </div>
                
                {/* Cart Controls */}
                <div className="mt-3 sm:mt-4">
                  {getItemQuantity(item.name) === 0 ? (
                    <button
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full transition-all text-sm sm:text-base font-medium"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 bg-red-600 rounded-full px-3 py-2">
                        <button
                          onClick={() => handleQuantityUpdate(item.name, getItemQuantity(item.name) - 1)}
                          className="w-8 h-8 rounded-full bg-red-700 hover:bg-red-800 flex items-center justify-center transition-colors"
                        >
                          <Minus className="h-4 w-4 text-white" />
                        </button>
                        
                        <span className="text-white font-semibold min-w-[2rem] text-center">
                          {getItemQuantity(item.name)}
                        </span>
                        
                        <button
                          onClick={() => handleQuantityUpdate(item.name, getItemQuantity(item.name) + 1)}
                          className="w-8 h-8 rounded-full bg-red-700 hover:bg-red-800 flex items-center justify-center transition-colors"
                        >
                          <Plus className="h-4 w-4 text-white" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Total</div>
                        <div className="text-lg font-bold text-white">
                          ₹{(parseFloat(item.price) * getItemQuantity(item.name)).toFixed(0)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}