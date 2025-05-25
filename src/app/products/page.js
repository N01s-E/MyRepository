"use client";

import React, { useState } from "react";
import Link from "next/link";

const products = [
  { id: 1, name: "Картопля", price: 20, image: "/potato.jpg" },
  { id: 2, name: "Морква (що вона тут робить?)", price: 150, image: "/carrot.jpg" },
  { id: 3, name: "Цибуля? Ще й за таку ціну?!", price: 200, image: "/onion.jpg" },
];

// Навігаційне меню
function NavBar() {
  return (
    <nav className="bg-yellow-400 p-4 mb-6 flex justify-center gap-8 font-semibold text-green-900">
      <Link href="/" className="hover:underline">
        Головна
      </Link>
      <Link href="/products" className="hover:underline">
        Продукти
      </Link>
    </nav>
  );
}

export default function ProductsPage() {
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setOrderPlaced(false);
  }

  function changeQty(id, qty) {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
    setOrderPlaced(false);
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setOrderPlaced(false);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Ваш кошик порожній!");
      return;
    }
    if (!orderData.name || !orderData.phone || !orderData.address) {
      alert("Будь ласка, заповніть усі поля форми.");
      return;
    }
    // Логіка відправки замовлення

    setOrderPlaced(true);
    setCart([]);
    setOrderData({ name: "", phone: "", address: "" });
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <>
      <NavBar />

      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Каталог товарів</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded p-4 flex flex-col">
              <img
                src={product.image}
                alt={product.name}
                className="h-32 object-cover mb-2"
              />
              <h2 className="font-semibold">{product.name}</h2>
              <p className="mb-2">{product.price} грн/кг</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-blue-600 text-white py-1 rounded"
              >
                Додати в кошик
              </button>
            </div>
          ))}
        </div>

        <hr className="my-6" />

        <p className="mb-2 text-sm text-gray-600">Ціна вказана за 1 кг</p>

        <h2 className="text-xl font-bold mb-2">
          Кошик ({cart.reduce((acc, item) => acc + item.qty, 0)} товарів)
        </h2>
        {cart.length === 0 && <p>Кошик порожній</p>}
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span>
              {item.name} ×{" "}
              <input
                type="number"
                value={item.qty}
                min="1"
                className="w-16 border rounded px-1"
                onChange={(e) => changeQty(item.id, Number(e.target.value))}
              />
            </span>
            <span>
              {item.price * item.qty} грн (ціна за {item.qty} кг)
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-600 font-bold"
            >
              Видалити
            </button>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <hr className="my-4" />
            <p className="text-lg font-semibold">Всього: {totalPrice} грн</p>
          </>
        )}

        <hr className="my-6" />

        <h2 className="text-xl font-bold mb-4">Оформлення замовлення</h2>

        {orderPlaced && (
          <p className="mb-4 text-green-600 font-semibold">
            Дякуємо за замовлення! Ми зв&aposяжемося з вами найближчим часом.
          </p>
        )}

        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="name">
              Ім&aposя
            </label>
            <input
              id="name"
              name="name"
              value={orderData.name}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="phone">
              Телефон
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={orderData.phone}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="address">
              Адреса доставки
            </label>
            <textarea
              id="address"
              name="address"
              value={orderData.address}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Оформити замовлення
          </button>
        </form>
      </div>
    </>
  );
}
