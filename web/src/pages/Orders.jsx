import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadOrders();
    }, [filter]);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const params = {};
            if (filter !== 'all') params.status = filter;
            const res = await api.get('/orders', { params });
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.put(`/orders/${id}`, { status: newStatus });
            setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    return (
        <div className="dashboard-layout">
            <div className="sidebar-container"><Sidebar /></div>
            <Navbar authed />
            <div className="main">
                <div className="main-body" style={{ padding: 20 }}>
                    <div className="header" style={{ marginBottom: 20 }}>
                        <h2>Incoming Orders</h2>
                        <div className="filters" style={{ display: 'flex', gap: 10 }}>
                            <select className="select" value={filter} onChange={e => setFilter(e.target.value)}>
                                <option value="all">All Status</option>
                                <option value="new">New</option>
                                <option value="processed">Processed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="table-container">
                            <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                                        <th style={{ padding: 10 }}>Date</th>
                                        <th style={{ padding: 10 }}>Customer</th>
                                        <th style={{ padding: 10 }}>Form</th>
                                        <th style={{ padding: 10 }}>Details</th>
                                        <th style={{ padding: 10 }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                            <td style={{ padding: 10 }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td style={{ padding: 10 }}>
                                                <div style={{ fontWeight: 'bold' }}>{order.contactId?.name || 'Unknown'}</div>
                                                <div className="muted" style={{ fontSize: '0.9em' }}>{order.contactId?.phone}</div>
                                            </td>
                                            <td style={{ padding: 10 }}>{order.formName}</td>
                                            <td style={{ padding: 10 }}>
                                                {Object.entries(order.formData).map(([key, val]) => (
                                                    <div key={key}>
                                                        <span className="muted">{key}:</span> {val}
                                                    </div>
                                                ))}
                                            </td>
                                            <td style={{ padding: 10 }}>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                    style={{
                                                        padding: '4px 8px',
                                                        borderRadius: 4,
                                                        border: '1px solid #ddd',
                                                        backgroundColor: order.status === 'new' ? '#dbeafe' : 'white'
                                                    }}
                                                >
                                                    <option value="new">New</option>
                                                    <option value="processed">Processed</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan={5} style={{ padding: 20, textAlign: 'center', color: '#888' }}>
                                                No orders found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
