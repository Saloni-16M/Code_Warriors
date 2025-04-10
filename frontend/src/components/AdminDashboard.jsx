import { useEffect, useState } from "react";
import { fetchNgos, fetchResorts, updateNgo, updateResort } from "../services/apiService";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [ngos, setNgos] = useState([]);
    const [resorts, setResorts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState({});
    const [approvalStatus, setApprovalStatus] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ngosData, resortsData] = await Promise.all([fetchNgos(), fetchResorts()]);
                setNgos(ngosData);
                setResorts(resortsData);

                const initialComments = {};
                const initialApprovalStatus = {};

                ngosData.forEach(ngo => {
                    initialComments[ngo._id] = ngo.adminComments || "";
                    initialApprovalStatus[ngo._id] = ngo.isApproved ? "true" : "false";
                });

                resortsData.forEach(resort => {
                    initialComments[resort._id] = resort.adminComments || "";
                    initialApprovalStatus[resort._id] = resort.isApproved ? "true" : "false";
                });

                setComments(initialComments);
                setApprovalStatus(initialApprovalStatus);
            } catch (err) {
                setError("Failed to load data. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleVerify = async (id, type) => {
        try {
            const updateFunc = type === "ngo" ? updateNgo : updateResort;
            const updatedData = await updateFunc(id, { isVerified: true });

            if (type === "ngo") {
                setNgos(prevNgos => prevNgos.map(ngo => (ngo._id === id ? updatedData : ngo)));
            } else {
                setResorts(prevResorts => prevResorts.map(resort => (resort._id === id ? updatedData : resort)));
            }
        } catch (err) {
            alert(`Failed to verify ${type}`);
        }
    };

    const handleCommentChange = (id, value) => {
        setComments(prev => ({ ...prev, [id]: value }));
    };

    const handleApprovalChange = (id, value) => {
        setApprovalStatus(prev => ({ ...prev, [id]: value }));
    };
    const handleSave = async (id, type) => {
        const comment = comments[id]?.trim() || "";
        const isApproved = approvalStatus[id] === "true";
    
        try {
            const entityData = type === "ngo"
                ? ngos.find(ngo => ngo._id === id)
                : resorts.find(resort => resort._id === id);
    
            const updateFunc = type === "ngo" ? updateNgo : updateResort;
            const updatedData = await updateFunc(id, {
                isApproved,
                adminComments: comment,
                phone_no: entityData?.phone_no || "1234567890" // Ensure phone_no is sent for both NGOs and Resorts
            });
    
            if (type === "ngo") {
                setNgos(prevNgos => prevNgos.map(ngo => (ngo._id === id ? updatedData : ngo)));
            } else {
                setResorts(prevResorts => prevResorts.map(resort => (resort._id === id ? updatedData : resort)));
            }
    
            alert(`${type.toUpperCase()} updated successfully!`);
        } catch (error) {
            alert(`Error updating ${type}`);
        }
    };
    
    
    if (loading) return <p>Loading data...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="admin-dashboard">
            <h2>Registered NGOs</h2>
            {ngos.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Admin Comments</th>
                            <th>Approval</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ngos.map(ngo => (
                            <tr key={ngo._id}>
                                <td>{ngo.name}</td>
                                <td>{ngo.email}</td>
                                <td>{ngo.location}</td>
                                <td>{ngo.isVerified ? "Verified" : "Pending"}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={comments[ngo._id] || ""}
                                        onChange={(e) => handleCommentChange(ngo._id, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={approvalStatus[ngo._id] || ""}
                                        onChange={(e) => handleApprovalChange(ngo._id, e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="true">Approved</option>
                                        <option value="false">Rejected</option>
                                    </select>
                                </td>
                                <td>
                                    {!ngo.isVerified && (
                                        <button onClick={() => handleVerify(ngo._id, "ngo")}>Verify</button>
                                    )}
                                    <button onClick={() => handleSave(ngo._id, "ngo")}>Save</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No NGOs registered.</p>
            )}

            <h2>Registered Resorts</h2>
            {resorts.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Admin Comments</th>
                            <th>Approval</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resorts.map(resort => (
                            <tr key={resort._id}>
                                <td>{resort.name}</td>
                                <td>{resort.email}</td>
                                <td>{resort.location}</td>
                                <td>{resort.isVerified ? "Verified" : "Pending"}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={comments[resort._id] || ""}
                                        onChange={(e) => handleCommentChange(resort._id, e.target.value)}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={approvalStatus[resort._id] || ""}
                                        onChange={(e) => handleApprovalChange(resort._id, e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="true">Approved</option>
                                        <option value="false">Rejected</option>
                                    </select>
                                </td>
                                <td>
                                    {!resort.isVerified && (
                                        <button onClick={() => handleVerify(resort._id, "resort")}>Verify</button>
                                    )}
                                    <button onClick={() => handleSave(resort._id, "resort")}>Save</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No Resorts registered.</p>
            )}
        </div>
    );
};

export default AdminDashboard;