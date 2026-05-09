"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { UserUpdate } from "@/components/UserUpdate";
import Image from "next/image";

const MyProfile = () => {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 space-y-8">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border">
            {user?.image ? (
              <Image
                src={user.image}
                alt="profile"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-3xl font-bold">
                {user?.name?.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>

          <UserUpdate />
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-6 border-t pt-6">
          
          <div>
            <p className="text-sm text-gray-400">Member Since</p>
            <p className="font-semibold">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Last Update</p>
            <p className="font-semibold">
              {user?.updatedAt
                ? new Date(user.updatedAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-gray-400">Shipping Address</p>
            <p className="font-semibold">
              412 New York, Beach City, USA 90210
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t pt-6 flex flex-wrap gap-4">
          <button className="px-5 py-2 bg-black text-white rounded-lg">
            Order History
          </button>

          <button className="px-5 py-2 border rounded-lg">
            Wishlist
          </button>

          <button className="px-5 py-2 border rounded-lg">
            Security Settings
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyProfile;