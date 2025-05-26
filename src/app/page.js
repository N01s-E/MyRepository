"use client";

import Head from "next/head";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart, X, Trash2 } from "lucide-react";

const eatingPotatoes = [
  {
    name: "Беллароза",
    desc: "Сорт із червоною шкіркою та кремовою м'якоттю. Ідеальний для варіння, пюре та смаження. Має приємний, насичений смак та високу врожайність.",
    img: "/images/bellarosa.jpg",
    price: 25,
  },
  {
    name: "Ред Скарлет",
    desc: "Популярний серед господинь за гладку шкірку, чудово зберігається, зберігає форму після варіння, універсальний у приготуванні.",
    img: "/images/red_scarlet.jpg",
    price: 28,
  },
  {
    name: "Лаура",
    desc: "Сорт з насиченим смаком, гарно запікається, підходить для смаження фрі. Має яскраву жовту м'якоть та червону шкірку.",
    img: "/images/laura.jpg",
    price: 30,
  },
];

const plantingPotatoes = [
  {
    name: "Гала",
    desc: "Ранній сорт, добре переносить посуху, стійкий до хвороб. Має гарний вигляд та високу врожайність.",
    img: "/images/gala.jpg",
    price: 20,
  },
  {
    name: "Рівєра",
    desc: "Дуже ранній сорт, дозріває вже за 45 днів. Ідеальний для першого врожаю. Дає стабільно високі результати на різних ґрунтах.",
    img: "/images/riviera.jpg",
    price: 22,
  },
  {
    name: "Тірас",
    desc: "Сучасний сорт, який добре адаптується до клімату України. Стійкий до шкідників і хвороб, урожайний та витривалий.",
    img: "/images/tiras.jpg",
    price: 23,
  },
];

function Carousel({ items, onAddToCart, cartItems, setNotification }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (dir) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + items.length) % items.length);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
  };

  const currentItem = items[index];
  const isInCart = cartItems.some((item) => item.name === currentItem.name);

  const handleAdd = () => {
    if (isInCart) {
      setNotification(`Товар "${currentItem.name}" вже доданий у кошик!`);
      return;
    }
    onAddToCart({ ...currentItem, quantity: 1 });
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full max-w-sm flex items-center justify-center">
        <button
          onClick={() => paginate(-1)}
          className="absolute left-0 top-0 bottom-0 w-12 bg-transparent flex items-center justify-center"
          aria-label="Попередній товар"
        >
          <ChevronLeft className="w-6 h-6 text-green-800 hover:text-green-600" />
        </button>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center px-4"
          >
            <img
              src={currentItem.img}
              alt={currentItem.name}
              className="mx-auto max-h-48 rounded mb-3"
            />
            <h3 className="text-xl font-bold mb-1">{currentItem.name}</h3>
            <p className="mb-2">{currentItem.desc}</p>
            <p className="mb-2 font-semibold">{currentItem.price} грн за кг</p>
            <button
              onClick={handleAdd}
              disabled={isInCart}
              className={`px-4 py-2 rounded transition ${
                isInCart
                  ? "bg-gray-400 cursor-not-allowed text-gray-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isInCart ? "Вже в кошику" : "Додати в кошик"}
            </button>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => paginate(1)}
          className="absolute right-0 top-0 bottom-0 w-12 bg-transparent flex items-center justify-center"
          aria-label="Наступний товар"
        >
          <ChevronRight className="w-6 h-6 text-green-800 hover:text-green-600" />
        </button>
      </div>
    </div>
  );
}

function CartModal({ cartItems, onClose, updateQuantity, removeFromCart }) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (e, name) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      updateQuantity(name, value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Закрити кошик"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-green-900">Ваш кошик</h2>
        {cartItems.length === 0 ? (
          <p>Кошик порожній</p>
        ) : (
          <>
            <ul className="space-y-4 max-h-80 overflow-y-auto">
              {cartItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between border-b border-gray-200 pb-2"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.price} грн за кг
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleInputChange(e, item.name)}
                      className="w-16 border rounded px-2 py-1 text-center"
                    />
                  </div>
                  <div className="w-24 text-right font-semibold">
                    {(item.price * item.quantity).toFixed(2)} грн
                  </div>
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="ml-3 text-red-600 hover:text-red-800"
                    aria-label={`Видалити ${item.name} з кошика`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 font-semibold text-right text-green-900">
              Загальна сума: {totalPrice.toFixed(2)} грн
            </div>
            <button
              onClick={() => alert("Дякуємо за замовлення!")}
              className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
            >
              Оформити замовлення
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Kartopelka() {
  const [expandedEating, setExpandedEating] = useState(false);
  const [expandedPlanting, setExpandedPlanting] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
    setNotification(`Товар "${item.name}" додано в кошик!`);
  };

  const updateQuantity = (name, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: quantity } : item
      )
    );
  };

  const removeFromCart = (name) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
    setNotification(`Товар "${name}" видалено з кошика!`);
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Head>
        <title>Картопелька від Оксани</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-white-50 via-yellow-100 to-white-50 text-green-900 p-6 relative">
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed top-4 right-4 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center hover:bg-green-700"
          aria-label="Відкрити кошик"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalCount > 0 && (
            <span className="ml-1 bg-yellow-400 text-green-900 rounded-full px-2 text-xs font-bold select-none">
              {totalCount}
            </span>
          )}
        </button>

        <h1 className="text-4xl font-bold text-center mb-4 text-yellow-600">
          <Link href="/" className="no-underline text-yellow-600 hover:text-yellow-700">
            Картопелька від Оксани 🥔
          </Link>
        </h1>
        <p className="text-center mb-10">Привіт з грядки! Доставка по Києву: 068 731 01 20</p>

        <div className="grid grid-cols-2 gap-16 w-full">
          <div className="flex flex-col items-center">
            <button
              onClick={() => setExpandedEating(!expandedEating)}
              className="w-96 bg-green-200 hover:bg-green-300 text-2xl font-semibold hover:font-bold py-6 rounded shadow mb-2"
            >
              Картопля для поїдання 🍽️
            </button>
            <AnimatePresence>
              {expandedEating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden w-full max-w-md bg-yellow-100 p-4 rounded shadow"
                >
                  <Carousel
                    items={eatingPotatoes}
                    onAddToCart={addToCart}
                    cartItems={cartItems}
                    setNotification={setNotification}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={() => setExpandedPlanting(!expandedPlanting)}
              className="w-96 bg-green-200 hover:bg-green-300 text-2xl font-semibold hover:font-bold py-6 rounded shadow mb-2"
            >
              Картопля на посів 🌱
            </button>
            <AnimatePresence>
              {expandedPlanting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden w-full max-w-md bg-yellow-100 p-4 rounded shadow"
                >
                  <Carousel
                    items={plantingPotatoes}
                    onAddToCart={addToCart}
                    cartItems={cartItems}
                    setNotification={setNotification}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {notification && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-700 text-yellow-200 px-6 py-3 rounded shadow-lg z-50">
            {notification}
          </div>
        )}

        <AnimatePresence>
          {isCartOpen && (
            <CartModal
              cartItems={cartItems}
              onClose={() => setIsCartOpen(false)}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
