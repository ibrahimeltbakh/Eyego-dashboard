"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { register as registerAction } from "@/lib/features/auth/authSlice";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import {
  formAnimation,
  inputAnimation,
  registerFields,
  renderPasswordInput,
  renderRegularInput,
} from "@/components/auth/authFunctions";
import { ClipLoader } from "react-spinners";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");
  const router = useRouter();

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const result = await dispatch(registerAction(data));
    if (result.meta.requestStatus === "fulfilled") {
      showToast.success(`${result.payload.message}`, {
        duration: 4000,
        progress: true,
        position: "top-right",
        transition: "bounceIn",
        icon: "",
        sound: true,
      });
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } else if (result.meta.requestStatus === "rejected") {
      showToast.error(`${result.payload.message}`, {
        duration: 4000,
        progress: true,
        position: "top-right",
        transition: "bounceIn",
        icon: "",
        sound: true,
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen flex">
      <div className="w-full bg-gradient-to-br from-gray-600 to-gray-800  md:w-1/2 flex items-center justify-center  p-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={formAnimation}
          className="w-full max-w-md bg-white bg-gradient-to-b from-slate-700 to-slate-900 p-8 rounded-xl shadow-lg space-y-6">
          <motion.h2
            variants={inputAnimation}
            className="text-3xl font-extrabold text-center text-blue-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
            Create an Account
          </motion.h2>
          <motion.h3
            variants={inputAnimation}
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}>
            Join To Eyego
          </motion.h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {registerFields.map((field) =>
              field.type === "password"
                ? renderPasswordInput(
                    field,
                    showPassword,
                    showConfirmPassword,
                    togglePasswordVisibility,
                    toggleConfirmPasswordVisibility,
                    password,
                    errors,
                    register
                  )
                : renderRegularInput(field, errors, register)
            )}

            <motion.button
              variants={inputAnimation}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full cursor-pointer py-3 px-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-md shadow-lg 
                ${
                  loading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:from-sky-600 hover:to-blue-700"
                } 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-300`}>
              {loading ? (
                <div className="flex items-center justify-center">
                  <ClipLoader className="animate-spin h-5 w-5 mr-3 text-white" />
                  Registering...
                </div>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <motion.p
            variants={inputAnimation}
            className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-sky-600 hover:underline transition-all duration-300 font-medium">
              Login here
            </Link>
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:block w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1594028879160-a5702f8c0b5b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-sky-800/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl font-bold mb-4 text-shadow">
            Join Eyego Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl mb-6 text-center text-shadow max-w-lg">
            Create an account to enjoy exclusive member benefits and
            personalized shopping experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-xl mb-1">Member Discounts</div>
              <div className="text-sm">Exclusive deals just for you</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-xl mb-1">Fast Checkout</div>
              <div className="text-sm">Save your details for next time</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-xl mb-1">Order History</div>
              <div className="text-sm">Track all your purchases</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-xl mb-1">Wishlist</div>
              <div className="text-sm">Save items for later</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
