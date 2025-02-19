import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserStatistics = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalProducts: 0, acceptedProducts: 0, pendingProducts: 0 });

    useEffect(() => {
        if (user?.email) {
            axios.get(`https://product-hunt-server-five.vercel.app/user/statistics?email=${user.email}`)
                .then(response => {
                    setStats(response.data);
                })
                .catch(error => {
                    console.error("Error fetching user statistics:", error);
                });
        }
    }, [user]);

    const chartData = {
        labels: ["Total Products", "Accepted Products", "Pending Products"],
        datasets: [
            {
                label: "User Product Statistics",
                data: [stats.totalProducts, stats.acceptedProducts, stats.pendingProducts],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">Your Product Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Summary</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-100 rounded-lg text-center">
                            <h4 className="text-lg font-medium">Total</h4>
                            <p className="text-2xl font-bold">{stats.totalProducts}</p>
                        </div>
                        <div className="p-4 bg-green-100 rounded-lg text-center">
                            <h4 className="text-lg font-medium">Accepted</h4>
                            <p className="text-2xl font-bold">{stats.acceptedProducts}</p>
                        </div>
                        <div className="p-4 bg-yellow-100 rounded-lg text-center">
                            <h4 className="text-lg font-medium">Pending</h4>
                            <p className="text-2xl font-bold">{stats.pendingProducts}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="w-full max-w-sm bg-white p-6 shadow-lg rounded-lg">
                        <Pie data={chartData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserStatistics;