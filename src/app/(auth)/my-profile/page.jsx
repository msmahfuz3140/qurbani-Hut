"use client";

import React from "react";
import { Avatar, Button, Card, Chip } from "@heroui/react";
import {
  IoLocationOutline,
  IoCubeOutline,
  IoHeartOutline,
  IoShieldCheckmarkOutline,
  IoChevronForward,
  IoSettingsOutline,
} from "react-icons/io5";
import { authClient } from "@/lib/auth-client";
import { UserUpdate } from "@/components/UserUpdate";



const MyProfile = () => {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;


  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-serif italic animate-pulse">Loading profile...</p>
      </div>
    );
  }

  const menuItems = [
    { label: "Order History", icon: <IoCubeOutline />, count: "12" },
    { label: "My Wishlist", icon: <IoHeartOutline />, count: "24" },
    {
      label: "Security & Privacy",
      icon: <IoShieldCheckmarkOutline />,
      count: null,
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 font-sans">
      <div className="container mx-auto space-y-6">
        <Card className="border border-stone-200 shadow-sm rounded-xl overflow-hidden bg-white">
          <Card.Content className="p-6 md:p-10 flex flex-col justify-center items-center gap-8">
            <Avatar className="w-32 h-32">
              <Avatar.Image
                referrerPolicy="no-referrer"
                alt={user?.name}
                src={user?.image}
              />
              <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-4xl font-serif text-stone-900 tracking-tight">
                  {user?.name}
                </h1>

              </div>

            </div>
            <UserUpdate />
          </Card.Content>
        </Card>

        <Card className="bg-white">
          <Card.Header className="px-8 pt-8 pb-4 border-b border-stone-100">
            <Card.Title className="text-xl font-bold text-stone-900 uppercase tracking-tight">
              Personal Information
            </Card.Title>
          </Card.Header>
          <Card.Content className="p-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest">
                  User Name
                </p>
                <p className="text-stone-800 font-bold">{user?.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest">
                  Email Address
                </p>
                <p className="text-stone-800 font-bold">{user?.email}</p>
              </div>
              <div className="space-y-1">
              </div>
              <div className="space-y-1 sm:col-span-2">
                <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest">
                  Shipping Address
                </p>
                <p className="text-stone-800 font-bold">
                  Netrakona, Mymensingh, Bangladesh
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest">
                  Last Profile Update
                </p>
                <p className="text-stone-800 font-bold">
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    : "N/A"}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default MyProfile;
