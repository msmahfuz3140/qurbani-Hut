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
  IoPersonOutline,
  IoCloudUploadOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { useState, useRef } from "react";

export function UserUpdate({ customTrigger, isOpen, onOpenChange }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToImgBB = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("https://api.imgbb.com/1/upload?key=4d32a86827c8de0164de48f5f849e29a", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.data.url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUpdateSuccess(false);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const imageUrl = formData.get("image");
    
    let finalImage = imageUrl || undefined;
    
    // If a file was selected, upload it to ImgBB
    if (imageFile) {
      try {
        const uploadedUrl = await uploadToImgBB(imageFile);
        finalImage = uploadedUrl;
      } catch (error) {
        toast.danger("Upload Failed", {
          description: "Could not upload image. Please try a URL instead.",
          timeout: 3000,
        });
        setUploading(false);
        return;
      }
    }

    const updateData = {};
    if (name && name.toString().trim().length >= 3) {
      updateData.name = name.toString().trim();
    }
    if (finalImage) {
      updateData.image = finalImage;
    }

    if (Object.keys(updateData).length === 0) {
      toast.danger("Nothing to update", {
        description: "Please provide at least a name or image.",
        timeout: 3000,
      });
      setUploading(false);
      return;
    }

    const { data, error } = await authClient.updateUser(updateData);

    setUploading(false);

    if (error) {
      toast.danger("Update Failed", {
        description: error.message || "Something went wrong. Please try again.",
        timeout: 3000,
      });
      return;
    }

    if (data) {
      setUpdateSuccess(true);
      toast.success("Profile Updated Successfully", {
        description: "Your profile information has been updated.",
        timeout: 3000,
      });
      setImagePreview(null);
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      {customTrigger ? (
        customTrigger
      ) : (
        <Button
          className="bg-stone-900 text-stone-50 font-bold px-8 h-12 rounded-xl hover:bg-blue-500 transition-all active:scale-95 text-xs uppercase tracking-widest"
          startContent={<IoSettingsOutline size={18} />}
        >
          Update Profile
        </Button>
      )}

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-blue-100 text-blue-600">
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
                      <div className="absolute left-4 text-stone-400 z-10">
                        <IoPersonOutline size={18} />
                      </div>
                      <Input
                        name="name"
                        placeholder="User Name"
                        className="w-full pl-11 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <FieldError className="text-red-500 text-[10px] font-bold uppercase ml-1" />
                  </TextField>

                  {/* File Upload Section */}
                  <div className="space-y-2">
                    <label className="text-stone-900 text-xs font-black uppercase tracking-widest ml-1 block">
                      Profile Photo
                    </label>
                    <div className="flex flex-col gap-3">
                      {/* File Upload Button */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="relative flex items-center justify-center gap-3 w-full py-4 bg-stone-50 border-2 border-dashed border-stone-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all group"
                      >
                        <IoCloudUploadOutline className="size-6 text-stone-400 group-hover:text-blue-500 transition-colors" />
                        <span className="text-sm font-semibold text-stone-500 group-hover:text-blue-600 transition-colors">
                          {imageFile ? imageFile.name : "Click to upload from device"}
                        </span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>

                      {/* Image Preview */}
                      {imagePreview && (
                        <div className="relative w-20 h-20 mx-auto rounded-xl overflow-hidden border-2 border-blue-500 shadow-md">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setImageFile(null);
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                          >
                            ×
                          </button>
                        </div>
                      )}

                      {/* OR Divider */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-stone-200"></div>
                        <span className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">Or</span>
                        <div className="flex-1 h-px bg-stone-200"></div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-stone-900 text-xs font-black uppercase tracking-widest ml-1">
                          Image URL
                        </label>
                        <Input
                          name="image"
                          placeholder="https://example.com/avatar.jpg"
                          className="w-full px-4 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-2">
                    <Button
                      className="w-full sm:w-auto bg-white text-stone-700 border border-stone-200 rounded-xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-stone-50 transition-all active:scale-[0.98] px-8 h-12 shadow-sm"
                      slot="close"
                      variant="secondary"
                      onPress={() => {
                        setImagePreview(null);
                        setImageFile(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="w-full sm:w-auto bg-stone-900 text-stone-50 font-bold px-8 h-12 rounded-xl hover:bg-blue-500 transition-all active:scale-95 text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                      slot="close"
                      isDisabled={uploading || updateSuccess}
                    >
                      {uploading ? "Uploading..." : updateSuccess ? "Updated!" : "Update"}
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