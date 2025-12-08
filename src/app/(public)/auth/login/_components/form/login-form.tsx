"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import AuthHeader from "@/components/header/auth-header";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required!");
      return;
    }

    toast.loading("Signing in...");

    setTimeout(() => {
      toast.dismiss();
      toast.success("Successfully signed in!");
      console.log("Login submitted:", formData);
    }, 1500);
  };

  return (
    <>
      <AuthHeader
        title="Sign in"
        description="Enter your credentials to access your account"
      />

      <div className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-semibold text-slate-700"
          >
            Email Address
          </Label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="pl-12 h-12 border-2 border-slate-200 focus:border-blue-600 focus-visible:ring-0 rounded-xl transition-all text-slate-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-semibold text-slate-700"
          >
            Password
          </Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="pl-12 pr-12 h-12 border-2 border-slate-200 focus:border-blue-600 focus-visible:ring-0 rounded-xl transition-all text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
            >
              {showPassword ? (
                <Eye className="w-5 h-5 text-red-500" />
              ) : (
                <EyeOff className="w-5 h-5 text-green-500" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={formData.remember}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, remember: checked as boolean })
              }
              className="rounded-md border-2 cursor-pointer"
            />
            <Label
              htmlFor="remember"
              className="text-sm text-slate-600 font-medium cursor-pointer"
            >
              Remember me
            </Label>
          </div>
          <Link
            href="/auth/reset-password"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full h-12 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all group cursor-pointer"
        >
          Sign in
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </>
  );
}
