'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import CitySelect from './CitySelect';

type OrderFormProps = {
  productName: string;
  productPrice: number;
};

const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  city: "",
  npBranch: "",
  notes: "",
  payment: "card",
};

export default function OrderForm({ productName, productPrice }: OrderFormProps) {
  const pathname = usePathname();

  const [form, setForm] = useState(initialState);
  const [quantity, setQuantity] = useState(1); // нове поле
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [cities, setCities] = useState<{ Ref: string; Description: string }[]>([]);
  const [branches, setBranches] = useState<{ Ref: string; Description: string }[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingBranches, setLoadingBranches] = useState(false);

  // Завантаження міст
  useEffect(() => {
    setLoadingCities(true);
    fetch("/api/nova-poshta/cities")
      .then(res => res.json())
      .then(data => setCities(data))
      .catch(() => setCities([]))
      .finally(() => setLoadingCities(false));
  }, []);

  // Завантаження відділень
  useEffect(() => {
    if (!form.city) {
      setBranches([]);
      return;
    }
    setLoadingBranches(true);
    fetch(`/api/nova-poshta/branches?cityRef=${form.city}`)
      .then(res => res.json())
      .then(data => setBranches(data))
      .catch(() => setBranches([]))
      .finally(() => setLoadingBranches(false));
  }, [form.city]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const orderData = {
      ...form,
      productName,
      productPrice,
      quantity, // додаємо кількість
      totalPrice: productPrice * quantity,
      pageUrl: pathname,
    };

    try {
      const res = await fetch("/api/send-form-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        setSuccess(true);
        setForm(initialState);
        setQuantity(1);
      } else {
        setError("Помилка відправки. Спробуйте ще раз.");
      }
    } catch {
      setError("Помилка мережі. Спробуйте ще раз.");
    }
    setLoading(false);
  };

  return (
    <form className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Форма замовлення</h2>

      <div className="mb-3">
        <p><strong>Товар:</strong> {productName}</p>
        <p><strong>Ціна за 1 шт:</strong> {productPrice} грн</p>
      </div>

      <div className="mb-3">
        <label className="block mb-1">Кількість</label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            −
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="input input-bordered w-20 text-center no-arrows"
          />
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>
      </div>


      <div className="mb-3">
        <label className="block mb-1">Ім&apos;я</label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Прізвище</label>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Номер мобільного</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Місто</label>
        <CitySelect
          cities={cities}
          value={form.city}
          onChange={(ref) => setForm(prev => ({ ...prev, city: ref, npBranch: '' }))}
        />
        {loadingCities && <span className="text-xs text-gray-400">Завантаження міст...</span>}
      </div>

      <div className="mb-3">
        <label className="block mb-1">Відділення Нової пошти</label>
        <select
          name="npBranch"
          value={form.npBranch}
          onChange={handleChange}
          required
          className="select select-bordered w-full"
          disabled={!form.city}
        >
          <option value="">Оберіть відділення</option>
          {branches.map(branch => (
            <option key={branch.Ref} value={branch.Description}>
              {branch.Description}
            </option>
          ))}
        </select>
        {loadingBranches && <span className="text-xs text-gray-400">Завантаження відділень...</span>}
      </div>

      <div className="mb-3">
        <label className="block mb-1">Примітки</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1">Оплата</label>
        <select
          name="payment"
          value={form.payment}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="cod">Післяплата</option>
          <option value="card">За реквізитами</option>
        </select>
      </div>

      {/* Підсумок замовлення */}
      <div className="mb-6 p-3 border rounded bg-gray-50">
        <p><strong>Товар:</strong> {productName}</p>
        <p><strong>Ціна за шт:</strong> {productPrice} грн</p>
        <p><strong>Кількість:</strong> {quantity}</p>
        <p><strong>Сума:</strong> {productPrice * quantity} грн</p>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">Замовлення успішно відправлено!</p>}

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Відправка..." : "Замовити"}
      </button>
    </form>
  );
}
