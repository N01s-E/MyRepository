"use client";

import React, { useState } from "react";
import Link from "next/link";  // імпортуємо Link

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export default function Kartopelka() {
  const [order, setOrder] = useState({ name: "", phone: "", type: "", quantity: 1 });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Прийнято! Оксана дочистить картоплю і Вам зателефонує🍟");
    setOrder({ name: "", phone: "", type: "", quantity: 1 });
  };

  const foodVarieties = ["Беллароза", "Ред Скарлет", "Гранада", "Словянка", "Лаура"];
  const seedVarieties = ["Гала", "Рівєра", "Журавинка", "Арізона", "Тірас"];

  return (
    <div className="min-h-screen bg-white text-green-900 p-6">
      <NavBar />

      <h1 className="text-4xl font-bold text-center mb-2 text-yellow-600">Картопелька від Оксани 🥔</h1>
      <p className="text-center mb-6">Привіт з грядки! Доставка по Києву: 068 731 01 20</p>

      {/* Кнопка-посилання на сторінку /products можна вже прибрати, бо є в навігації */}
      {/* <div className="text-center mb-8">
        <Link href="/products" legacyBehavior>
          <a className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded">
            Перейти до каталогу товарів
          </a>
        </Link>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-2xl font-semibold mb-2">Картопля для поїдання 🍽️</h2>
            <ul className="list-disc list-inside">
              {foodVarieties.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-2xl font-semibold mb-2">Картопля на посів 🌱</h2>
            <ul className="list-disc list-inside">
              {seedVarieties.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-xl mx-auto">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Замовити картопельку</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              value={order.name}
              onChange={handleChange}
              placeholder="Ваше ім'я"
              required
            />
            <Input
              name="phone"
              value={order.phone}
              onChange={handleChange}
              placeholder="Телефон для зв'язку"
              required
            />

            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Зв&aposяжіться зі мною
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
