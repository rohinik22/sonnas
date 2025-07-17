"use client";
import { useState } from "react";
import Image from "next/image";

const unsplash = (query: string) =>
  `https://source.unsplash.com/600x400/?${query.replace(/\s/g, "+")},food`;

const menuItems = [
   {
    category: "Small Bites",
    items: [
      { name: "Korean Bun", price: "160", description: "Cheese-filled garlic bun", image: unsplash("korean garlic bun") },
      { name: "Chilli Korean Bun", price: "170", description: "Spicy twist on garlic bun", image: unsplash("spicy garlic bun") },
      { name: "Potato Wedges", price: "120", description: "Classic crispy wedges", image: unsplash("potato wedges") },
      { name: "Chilli Garlic Wedges", price: "150", description: "Wedges with garlic & chilli", image: unsplash("chilli wedges") },
      { name: "Cauliflower Florets", price: "260", description: "Crispy florets with in-house dip", image: unsplash("cauliflower bites") },
      { name: "French Fries", price: "100", description: "Salted, peri peri or cheesy", image: unsplash("french fries") },
      { name: "Nachos", price: "180", description: "With dip, loaded or Mexican", image: unsplash("nachos") },
      { name: "Honey Chilli Potato", price: "180", description: "Sweet, spicy crispy potatoes", image: unsplash("honey chilli potato") },
      { name: "Mushroom Slider", price: "185", description: "Mini burger with mushroom filling", image: unsplash("mushroom burger") },
      { name: "Paneer Makhni Slider", price: "185", description: "Mini burger with rich paneer filling", image: unsplash("paneer slider") },
      { name: "Chettni Paneer", price: "260", description: "South Indian-style chutney paneer", image: unsplash("paneer starter") },
      { name: "Tom Yum Paneer", price: "260", description: "Thai style zesty paneer", image: unsplash("tom yum paneer") },
      { name: "Bellpepper Soup", price: "180", description: "Smooth bellpepper-based soup", image: unsplash("bell pepper soup") },
      { name: "Cream of Mushroom", price: "180", description: "Classic creamy mushroom soup", image: unsplash("mushroom soup") },
      { name: "Manchow Soup", price: "150", description: "Spicy Indo-Chinese soup", image: unsplash("manchow soup") },
      { name: "Pesto Zucchini Soup", price: "190", description: "Unique blend of pesto & zucchini", image: unsplash("pesto soup") },
    ],
  },
  {
    category: "Pasta",
    items: [
      { name: "Arrabiata", price: "230", description: "Red sauce pasta (penne/spaghetti)", image: unsplash("arrabiata pasta") },
      { name: "Alfredo", price: "230", description: "White sauce pasta", image: unsplash("alfredo pasta") },
      { name: "Pink Sauce", price: "260", description: "Mix of red and white sauces", image: unsplash("pink sauce pasta") },
      { name: "Mafia", price: "260", description: "Spicy pink sauce", image: unsplash("spicy pasta") },
      { name: "Pesto", price: "280", description: "Basil pesto pasta", image: unsplash("pesto pasta") },
      { name: "Aglio e Olio", price: "290", description: "Garlic & olive oil pasta", image: unsplash("aglio e olio pasta") },
    ],
  },
  {
    category: "Pizza",
    items: [
      { name: "Margherita", price: "230", description: "Classic tomato & cheese", image: unsplash("margherita pizza") },
      { name: "Mexican", price: "270", description: "Loaded veggies", image: unsplash("mexican pizza") },
      { name: "Fantasy", price: "290", description: "Paneer, bell peppers, oregano", image: unsplash("fantasy pizza") },
      { name: "Cicilia", price: "290", description: "Mushroom, pickled onion, basil", image: unsplash("mushroom pizza") },
      { name: "Neapolitan", price: "290", description: "Olives, jalapeno, garlic oil", image: unsplash("neapolitan pizza") },
      { name: "Rustic", price: "290", description: "Garlic oil, spinach, oregano", image: unsplash("rustic pizza") },
      { name: "Paneer Tikka Pizza", price: "290", description: "Spicy paneer tikka toppings", image: unsplash("paneer tikka pizza") },
    ],
  },
  {
    category: "Soups",
    items: [
      { name: "Bellpepper Soup", price: "180", description: "Smooth bellpepper-based soup", image: unsplash("bell pepper soup") },
      { name: "Cream of Mushroom", price: "180", description: "Classic creamy mushroom soup", image: unsplash("mushroom soup") },
      { name: "Manchow Soup", price: "150", description: "Spicy Indo-Chinese soup", image: unsplash("manchow soup") },
      { name: "Pesto Zucchini Soup", price: "190", description: "Unique blend of pesto & zucchini", image: unsplash("pesto soup") },
    ],
  },
  {
    category: "Burgers",
    items: [
      { name: "Veg Burger", price: "160", description: "Simple and satisfying", image: unsplash("veg burger") },
      { name: "Mexican Burger", price: "170", description: "Spicy and cheesy", image: unsplash("mexican burger") },
      { name: "Cheese Burger", price: "190", description: "Loaded with cheese", image: unsplash("cheese burger") },
      { name: "Magic Mushroom", price: "180", description: "Stuffed mushroom patty", image: unsplash("mushroom burger") },
    ],
  },
  {
    category: "Sandwiches & Rolls",
    items: [
      { name: "Veg Sandwich", price: "150", description: "Classic veg filling", image: unsplash("veg sandwich") },
      { name: "Paneer Tikka Sandwich", price: "180", description: "Smoky paneer filling", image: unsplash("paneer sandwich") },
      { name: "Bombay Masala Sandwich", price: "180", description: "Spicy mashed potato sandwich", image: unsplash("bombay sandwich") },
      { name: "Spicy Paneer Roll", price: "180", description: "Rolled spicy paneer filling", image: unsplash("paneer roll") },
    ],
  },
  {
    category: "Indian Specials",
    items: [
      { name: "Amritsari Chole Kulche", price: "240", description: "Homemade Punjabi style chole", image: unsplash("chole kulche") },
      { name: "Khao Suey", price: "290", description: "Coconut noodle curry", image: unsplash("khao suey") },
      { name: "Paneer Tikka Masala", price: "260", description: "Served with rice/kulcha", image: unsplash("paneer tikka masala") },
      { name: "Dal Makhni with Rice", price: "295", description: "Rich creamy dal", image: unsplash("dal makhani") },
    ],
  },
  {
    category: "Chinese & Rice",
    items: [
      { name: "Veg Fried Rice", price: "180", description: "Loaded with veggies", image: unsplash("veg fried rice") },
      { name: "Hakka Noodles", price: "220", description: "Classic Indo-Chinese noodles", image: unsplash("hakka noodles") },
      { name: "Schezwan Noodles", price: "240", description: "Spicy garlic noodles", image: unsplash("schezwan noodles") },
      { name: "Paneer Fried Rice", price: "240", description: "With kaju and paneer", image: unsplash("paneer fried rice") },
    ],
  },
  {
    category: "Drinks",
    items: [
      { name: "Masala Chai", price: "80", description: "Hot & spiced", image: unsplash("masala chai") },
      { name: "Cold Coffee", price: "120", description: "Iced coffee blend", image: unsplash("cold coffee") },
      { name: "Iced Teas", price: "120", description: "Peach, lemon, blueberry", image: unsplash("iced tea") },
      { name: "Milkshakes", price: "160", description: "KitKat, Vanilla, Chocolate", image: unsplash("milkshake") },
    ],
  },
];


export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(menuItems[0].category);
  const currentItems = menuItems.find((cat) => cat.category === activeCategory)?.items || [];

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
                />
              </div>
              <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-lg sm:text-xl font-bold text-white">{item.name}</h4>
                    <span className="text-xl sm:text-2xl font-bold text-red-400">₹{item.price}</span>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm">{item.description}</p>
                </div>
                <button
                  className="mt-3 sm:mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full transition-all text-sm sm:text-base"
                  onClick={() => alert(`Added ${item.name} to cart`)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}