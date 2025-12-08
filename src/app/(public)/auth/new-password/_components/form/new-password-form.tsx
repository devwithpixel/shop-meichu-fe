"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, ArrowRight } from "lucide-react";
import AuthHeader from "@/components/header/auth-header";
import Link from "next/link";

export default function NewPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleResetPassword = () => {
    console.log("Resetting password for:", formData.email);
    // handleResetPassword
  };

  const isFormValid =
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    formData.password.length >= 8;

  return (
    <>
      <AuthHeader
        title="Set New Password"
        description="Enter your email and create a new secure password"
      />

      <div className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-semibold text-slate-700"
          >
            New Password
          </Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="pl-12 pr-12 h-12 border-2 border-slate-200 focus:border-blue-600 rounded-xl transition-all focus-visible:ring-0 text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showPassword ? (
                <Eye className="w-5 h-5 text-red-500" />
              ) : (
                <EyeOff className="w-5 h-5 text-green-500" />
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-semibold text-slate-700"
          >
            Confirm New Password
          </Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="pl-12 pr-12 h-12 border-2 border-slate-200 focus:border-blue-600 rounded-xl transition-all focus-visible:ring-0 text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showConfirmPassword ? (
                <Eye className="w-5 h-5 text-red-500" />
              ) : (
                <EyeOff className="w-5 h-5 text-green-500" />
              )}
            </button>
          </div>
          {formData.confirmPassword &&
            formData.password !== formData.confirmPassword && (
              <p className="text-xs text-red-600">Passwords do not match</p>
            )}
        </div>

        <Button
          onClick={handleResetPassword}
          disabled={!isFormValid}
          className="w-full h-12 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all group disabled:opacity-50 cursor-pointer"
        >
          Update Password
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="text-center text-sm text-slate-600">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
