interface AuthHeaderProps {
  title: string;
  description: string;
  showMobileLogo?: boolean;
}

export default function AuthHeader({ 
  title, 
  description,
}: AuthHeaderProps) {
  return (
    <>
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-4xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-600">{description}</p>
      </div>
    </>
  );
}