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
          <Card.Content className="p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
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
                <Chip
                  variant="flat"
                  className="bg-orange-500 text-white font-black uppercase tracking-[0.2em] text-[9px] h-5 rounded-md self-center md:self-auto"
                >
                  Trusted Supporter
                </Chip>
              </div>
              <p className="text-stone-500 font-medium flex items-center justify-center md:justify-start gap-2">
                <IoLocationOutline className="text-orange-500" /> New York, USA
              </p>
            </div>
            <UserUpdate />
          </Card.Content>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 space-y-6">
            <Card className="border border-stone-200 shadow-sm rounded-xl bg-white">
              <Card.Header className="px-6 pt-6 pb-2">
                <Card.Title className="text-xs font-black uppercase tracking-[0.3em] text-stone-400">
                  Quick Access
                </Card.Title>
              </Card.Header>
              <Card.Content className="p-2 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center justify-between p-4 hover:bg-stone-50 rounded-xl transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-stone-100 rounded-lg text-stone-900 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                        {item.icon}
                      </div>
                      <span className="font-bold text-stone-800 text-sm tracking-tight">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.count && (
                        <span className="text-xs font-black text-stone-300">
                          {item.count}
                        </span>
                      )}
                      <IoChevronForward className="text-stone-300" />
                    </div>
                  </button>
                ))}
              </Card.Content>
            </Card>

            <Card className="border-none shadow-xl rounded-xl bg-orange-500 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-serif italic">QurbaniHut Rewards</h3>
                <div>
                  <p className="text-4xl font-bold">450</p>
                  <p className="text-orange-100 text-xs font-black uppercase tracking-widest">
                    Salaam Points Balance
                  </p>
                </div>
                <Button className="w-full bg-stone-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest h-10">
                  Redeem Points
                </Button>
              </div>
            </Card>
          </div>

          <div className="md:col-span-7">
            <Card className="border border-stone-200 shadow-sm rounded-xl bg-white h-full">
              <Card.Header className="px-8 pt-8 pb-4 border-b border-stone-100">
                <Card.Title className="text-xl font-bold text-stone-900 uppercase tracking-tight">
                  Personal Information
                </Card.Title>
              </Card.Header>
              <Card.Content className="p-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest">
                      Email Address
                    </p>
                    <p className="text-stone-800 font-bold">{user?.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest">
                      Member Since
                    </p>
                    <p className="text-stone-800 font-bold">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest">
                      Shipping Address
                    </p>
                    <p className="text-stone-800 font-bold">
                      412 New York, Beach City, USA 90210
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

                <div className="pt-4">
                  <Button
                    variant="bordered"
                    className="border-stone-200 text-stone-900 font-bold rounded-xl px-6 bg-stone-200 hover:bg-stone-300"
                  >
                    Manage All Data
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
