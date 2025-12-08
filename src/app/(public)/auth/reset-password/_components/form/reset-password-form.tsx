"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import AuthHeader from "@/components/header/auth-header";
import Link from "next/link";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendResetLink = () => {
    console.log("Sending reset link to:", email);
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      // Handle success
    }, 2000);
  };

  return (
    <>
      <Link
        href="/auth/login"
        className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to login
      </Link>

      <AuthHeader
        title="Reset Password?"
        description="Enter your email and we'll send you a reset link"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 h-12 border-2 border-slate-200 focus:border-blue-600 rounded-xl transition-all focus-visible:ring-0 text-slate-400"
            />
          </div>
        </div>

        <Button
          onClick={handleSendResetLink}
          disabled={!email || isSending}
          className="w-full h-12 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all group disabled:opacity-50 cursor-pointer"
        >
          {isSending ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Sending Reset Link...
            </>
          ) : (
            <>
              Send Reset Link
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
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
