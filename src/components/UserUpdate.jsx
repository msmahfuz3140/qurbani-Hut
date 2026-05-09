"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function UserUpdate() {
  const [open, setOpen] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const image = formData.get("image");

    const { data, error } = await authClient.updateUser({
      name,
      image,
    });

    if (error) {
      alert(error.message || "Update Failed");
      return;
    }

    if (data) {
      alert("Profile Updated Successfully ✅");
      setOpen(false);
      location.reload();
    }
  };

  return (
    <>
      {/* Open Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-2 bg-black text-white rounded-lg"
      >
        Account Settings
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-6 shadow-xl">
            
            <h2 className="text-xl font-bold text-center">
              Update Profile
            </h2>

            <form onSubmit={onSubmit} className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="text-sm text-gray-500">
                  Full Name
                </label>
                <input
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                />
              </div>

              {/* Image */}
              <div>
                <label className="text-sm text-gray-500">
                  Avatar URL
                </label>
                <input
                  name="image"
                  required
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}