import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminStatistics = () => {
    const [data, setData] = useState({
        products: 0,
        pendingProducts: 0,
        acceptedProducts: 0,
        reviews: 0,
        users: 0,
    });

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get('https://product-hunt-server-five.vercel.app/admin/statistics');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStatistics();
    }, []);

    const chartData = {
        labels: ['Total Products', 'Accepted Products', 'Pending Products', 'Reviews', 'Users'],
        datasets: [
            {
                label: 'Site Statistics',
                data: [
                    data.products,
                    data.acceptedProducts,
                    data.pendingProducts,
                    data.reviews,
                    data.users,
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">Statistics</h2>
            <div className="flex justify-center items-center">
                <div className="w-full max-w-min px-4 py-6 bg-white shadow-lg rounded-lg border border-gray-300">
                    <Pie data={chartData} />
                </div>
            </div>
        </div>
    );
};

export default AdminStatistics;
