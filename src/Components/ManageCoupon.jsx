import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageCoupon = () => {
    const [coupons, setCoupons] = useState([]);
    const [form, setForm] = useState({
        code: '',
        expiryDate: '',
        description: '',
        discount: '',
    });
    const [editing, setEditing] = useState(null);

    // Fetch all coupons
    const fetchCoupons = async () => {
        try {
            const response = await axios.get('https://product-hunt-server-five.vercel.app/coupons');
            setCoupons(response.data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editing) {
                // Update coupon
                await axios.patch(`https://product-hunt-server-five.vercel.app/coupons/${editing}`, form);
                Swal.fire('Success!', 'Coupon updated successfully!', 'success');
            } else {
                // Add coupon
                await axios.post('https://product-hunt-server-five.vercel.app/coupons', form);
                Swal.fire('Success!', 'Coupon added successfully!', 'success');
            }

            fetchCoupons();
            setForm({ code: '', expiryDate: '', description: '', discount: '' });
            setEditing(null);
        } catch (error) {
            console.error('Error saving coupon:', error);
            Swal.fire('Error!', 'Failed to save coupon. Try again.', 'error');
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action will permanently delete the coupon.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://product-hunt-server-five.vercel.app/coupons/${id}`);
                    Swal.fire('Deleted!', 'Coupon has been deleted.', 'success');
                    fetchCoupons();
                } catch (error) {
                    console.error('Error deleting coupon:', error);
                    Swal.fire('Error!', 'Failed to delete coupon.', 'error');
                }
            }
        });
    };

    // Handle edit
    const handleEdit = (coupon) => {
        setEditing(coupon._id);
        setForm({
            code: coupon.code,
            expiryDate: coupon.expiryDate.split('T')[0],
            description: coupon.description,
            discount: coupon.discount,
        });
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">Manage Coupons</h2>
    
          {/* Coupon Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-6 mb-8 grid gap-4"
          >
            <h3 className="text-xl font-semibold text-gray-700">
              {editing ? 'Edit Coupon' : 'Add New Coupon'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Coupon Code"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                required
                className="input input-bordered w-full"
              />
              <input
                type="date"
                placeholder="Expiry Date"
                value={form.expiryDate}
                onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                required
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Coupon Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                className="textarea textarea-bordered w-full md:col-span-2"
              ></textarea>
              <input
                type="number"
                placeholder="Discount Amount (%)"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                required
                className="input input-bordered w-full"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4 w-full"
            >
              {editing ? 'Update Coupon' : 'Add Coupon'}
            </button>
          </form>
    
          {/* Coupons List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coupons.map((coupon) => (
              <div key={coupon._id} className="card bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800">{coupon.code}</h3>
                <p className="text-sm text-gray-500">
                  Expiry: {new Date(coupon.expiryDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700">{coupon.description}</p>
                <p className="text-sm text-gray-500 font-bold">
                  Discount: {coupon.discount}%
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(coupon)}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
};

export default ManageCoupon;
