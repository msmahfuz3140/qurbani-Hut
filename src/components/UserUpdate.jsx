"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Input,
  Modal,
  Surface,
  TextField,
  toast,
} from "@heroui/react";
import { FaUserEdit } from "react-icons/fa";
import {
  IoLinkOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";

export function UserUpdate({ customTrigger, isOpen, onOpenChange }) {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updateFormData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.updateUser({
      name: updateFormData.name,
      image: updateFormData.image,
    });
    console.log(data, error);
    if (error) {
      toast.danger("Update Failed", {
        description: error.message || "Something went wrong. Please try again.",
        timeout: 3000,
      });
      return;
    }

    if (data) {
      toast.success("Profile Updated Successfully", {
        description: "Your profile information has been updated.",
        timeout: 3000,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      {customTrigger ? (
        customTrigger
      ) : (
        <Button
          className="bg-stone-900 text-stone-50 font-bold px-8 h-12 rounded-xl hover:bg-orange-500 transition-all active:scale-95 text-xs uppercase tracking-widest"
          startContent={<IoSettingsOutline size={18} />}
        >
          Account Settings
        </Button>
      )}

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <FaUserEdit className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Update Profile</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                  <TextField
                    isRequired
                    name="name"
                    validate={(v) =>
                      v.trim().length < 3
                        ? "Please enter a valid full name (at least 3 characters)"
                        : null
                    }
                    className="space-y-2"
                  >
                    <label className="text-stone-900 text-xs font-black uppercase tracking-widest ml-1">
                      Full Name
                    </label>
                    <div className="relative flex items-center">
                      <IoPersonOutline className="absolute left-4 text-stone-400 size-5 z-10" />
                      <Input
                        name="name"
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      />
                    </div>
                    <FieldError className="text-red-500 text-[10px] font-bold uppercase ml-1" />
                  </TextField>
                  <TextField
                    isRequired
                    name="image"
                    validate={(v) =>
                      !v.startsWith("https://")
                        ? "Please enter a valid url (must start with https://)"
                        : null
                    }
                    className="space-y-2"
                  >
                    <label className="text-stone-900 text-xs font-black uppercase tracking-widest ml-1">
                      Avatar URL
                    </label>
                    <div className="relative flex items-center">
                      <IoLinkOutline className="absolute left-4 text-stone-400 size-5 z-10" />
                      <Input
                        name="image"
                        placeholder="https://example.com/avatar.jpg"
                        className="w-full pl-11 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      />
                    </div>
                    <FieldError className="text-red-500 text-[10px] font-bold uppercase ml-1" />
                  </TextField>
                  <div className="flex items-center gap-4">
                    <Button
                      className="bg-white text-stone-700 border border-stone-200 rounded-xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-stone-50 transition-all active:scale-[0.98] px-8 h-12 shadow-sm"
                      slot="close"
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-stone-900 text-stone-50 font-bold px-8 h-12 rounded-xl hover:bg-orange-500 transition-all active:scale-95 text-xs uppercase tracking-widest"
                      type="submit"
                      slot="close"
                    >
                      Update
                    </Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
