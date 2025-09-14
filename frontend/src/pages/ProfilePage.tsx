import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }
    fetch(`${API_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) throw new Error(data.message);
        setProfile(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!profile) return <p className="text-center">Profile not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="space-y-2">
        <div>
          <b>Name:</b> {profile.name}
        </div>
        <div>
          <b>Email:</b> {profile.email}
        </div>
        <div>
          <b>Admin:</b> {profile.isAdmin ? "Yes" : "No"}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
