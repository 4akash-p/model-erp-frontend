import { useState } from 'react';
import { createModel } from '../api/modelService';

export default function CreateModel() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    height: '',
    gender: 'MALE',
    chest: '',
    lowerWaist: '',
    hips: '',
    shoeSize: '',
    eyes: '',
  });
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append fields
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append images
    images.forEach((img) => formData.append('images', img));

    try {
      const res = await createModel(formData);
      setMessage('Model created successfully!');
      console.log('Response:', res);
    } catch (err) {
      console.error('Create failed:', err);
      setMessage('Failed to create model');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Model</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'age', 'height', 'chest', 'lowerWaist', 'hips', 'shoeSize', 'eyes'].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className="w-full border px-4 py-2 rounded"
          />
        ))}

        <select name="gender" value={form.gender} onChange={handleChange} className="w-full border px-4 py-2 rounded">
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full border px-4 py-2 rounded"
        />

        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
          Submit
        </button>
      </form>

      {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
    </div>
  );
}
