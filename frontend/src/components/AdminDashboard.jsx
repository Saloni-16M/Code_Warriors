import { useEffect, useState } from "react";
import { fetchNgos, fetchResorts, approveNgo, approveResort, updateNgo, updateResort } from "../services/apiService";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [ngos, setNgos] = useState([]);
    const [resorts, setResorts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ngosData = await fetchNgos();
                const resortsData = await fetchResorts();
                setNgos(ngosData);
                setResorts(resortsData);

                // Store existing comments in state
                const initialComments = {};
                ngosData.forEach(ngo => initialComments[ngo._id] = ngo.adminComments || "");
                resortsData.forEach(resort => initialComments[resort._id] = resort.adminComments || "");

                setComments(initialComments);
            } catch (err) {
                setError("Failed to load data. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleApprovalChange = async (id, type) => {
        try {
            if (type === "ngo") {
                const updatedNgo = await approveNgo(id, { isApproved: true });
                setNgos(prev => prev.map(ngo =>
                    ngo._id === id ? { ...ngo, adminApprovalStatus: "Approved", loginId: updatedNgo.loginId } : ngo
                ));
            } else {
                const updatedResort = await approveResort(id, { isApproved: true });
                setResorts(prev => prev.map(resort =>
                    resort._id === id ? { ...resort, adminApprovalStatus: "Approved", loginId: updatedResort.loginId } : resort
                ));
            }
            alert(`${type === "ngo" ? "NGO" : "Resort"} approved successfully!`);
        } catch (error) {
            alert(`Error approving ${type}`);
        }
    };

    const handleSave = async (id, type) => {
        try {
            if (type === "ngo") {
                await updateNgo(id, { adminComments: comments[id] });
            } else {
                await updateResort(id, { adminComments: comments[id] });
            }

            // Fetch updated data to reflect changes
            const updatedNgos = await fetchNgos();
            const updatedResorts = await fetchResorts();
            setNgos(updatedNgos);
            setResorts(updatedResorts);

            alert(`${type === "ngo" ? "NGO" : "Resort"} comment saved!`);
        } catch (error) {
            alert(`Error saving ${type} comment.`);
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
                            <th>Admin Comments</th>
                            <th>Add Comment</th>
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
                                <td>{ngo.adminComments || "No comments yet"}</td>
                                <td>
                                    {!ngo.adminComments && (
                                        <input
                                            type="text"
                                            value={comments[ngo._id]}
                                            onChange={(e) =>
                                                setComments(prev => ({ ...prev, [ngo._id]: e.target.value }))
                                            }
                                        />
                                    )}
                                </td>
                                <td>{ngo.adminApprovalStatus}</td>
                                <td>
                                    {ngo.adminApprovalStatus !== "Approved" && (
                                        <button onClick={() => handleApprovalChange(ngo._id, "ngo")}>Approve</button>
                                    )}
                                    {!ngo.adminComments && (
                                        <button onClick={() => handleSave(ngo._id, "ngo")}>Save</button>
                                    )}
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
                            <th>Admin Comments</th>
                            <th>Add Comment</th>
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
                                <td>{resort.adminComments || "No comments yet"}</td>
                                <td>
                                    {!resort.adminComments && (
                                        <input
                                            type="text"
                                            value={comments[resort._id]}
                                            onChange={(e) =>
                                                setComments(prev => ({ ...prev, [resort._id]: e.target.value }))
                                            }
                                        />
                                    )}
                                </td>
                                <td>{resort.adminApprovalStatus}</td>
                                <td>
                                    {resort.adminApprovalStatus !== "Approved" && (
                                        <button onClick={() => handleApprovalChange(resort._id, "resort")}>Approve</button>
                                    )}
                                    {!resort.adminComments && (
                                        <button onClick={() => handleSave(resort._id, "resort")}>Save</button>
                                    )}
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
