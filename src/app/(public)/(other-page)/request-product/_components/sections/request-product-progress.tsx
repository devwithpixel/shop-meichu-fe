import { Progress } from "@/components/ui/progress";
import { FaCheck } from "react-icons/fa";
import type { ProgressStep } from "@/hooks/use-step-progress";

interface RequestProductProgressProps {
  progressSteps: ProgressStep[];
}

export default function RequestProductProgress({
  progressSteps,
}: RequestProductProgressProps) {
  const calculateProgress = () => {
    const completedSteps = progressSteps.filter(
      (step) => step.status === "completed"
    ).length;
    return (completedSteps / progressSteps.length) * 100;
  };

  const progressValue = calculateProgress();

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#E91E63]";
      case "active":
        return "bg-[#E91E63]";
      default:
        return "bg-gray-300";
    }
  };

  const getLineColor = (status: string) => {
    switch (status) {
      case "completed":
      case "active":
        return "bg-[#E91E63]";
      default:
        return "bg-gray-300";
    }
  };

  const findActiveStepIndex = () => {
    const activeIndex = progressSteps.findIndex((s) => s.status === "active");
    if (activeIndex >= 0) return activeIndex;

    const allCompleted = progressSteps.every((s) => s.status === "completed");
    if (allCompleted) return progressSteps.length - 1; 

    const notCompletedIndex = progressSteps.findIndex(
      (s) => s.status !== "completed"
    );
    return notCompletedIndex >= 0 ? notCompletedIndex : 0;
  };

  const currentStepIndex = findActiveStepIndex();

  return (
    <>
      {/* Desktop */}
      <div className="bg-linear-to-b from-[#FCE4EC] to-white px-8 py-14 rounded-l-2xl h-full shadow-lg hidden md:block">
        <div className="flex flex-col h-full">
          <div className="mb-16">
            <img
              src="./assets/logo/meichu.png"
              alt="meichu"
              className="w-auto h-12"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="mb-6">
              <h1 className="text-2xl font-bold font-albert-sans text-[#880E4F]">
                Request Product
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Complete the following steps
              </p>
            </div>

            <div className="relative">
              <div className="flex flex-col">
                {progressSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex items-start gap-5 relative"
                  >
                    <div className="flex flex-col items-center">
                      <div className="shrink-0 relative">
                        <div
                          className={`relative flex items-center justify-center w-11 h-11 rounded-full ${
                            step.status === "active" ||
                            step.status === "completed"
                              ? "bg-[#FCE4EC]"
                              : "bg-gray-100"
                          } transition-all duration-300`}
                        >
                          {step.status === "completed" ? (
                            <div className="rounded-full bg-[#E91E63] w-7 h-7 flex items-center justify-center transition-all duration-300">
                              <FaCheck className="text-white w-4 h-4" />
                            </div>
                          ) : (
                            <div
                              className={`rounded-full ${getStepColor(
                                step.status
                              )} w-7 h-7 flex items-center justify-center transition-all duration-300`}
                            >
                              <span className="text-white text-sm font-bold font-albert-sans">
                                {step.id}
                              </span>
                            </div>
                          )}

                          {step.status === "active" && (
                            <div className="absolute inset-0 rounded-full border-2 border-[#E91E63] animate-ping opacity-40"></div>
                          )}
                        </div>
                      </div>

                      {index < progressSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-16 ${getLineColor(step.status)} my-1 rounded-full transition-all duration-300`}
                        ></div>
                      )}
                    </div>

                    <div className="pt-1.5 pb-8">
                      <h2
                        className={`text-base font-medium font-albert-sans ${
                          step.status === "active" ||
                          step.status === "completed"
                            ? "text-[#E91E63] font-semibold"
                            : "text-gray-500"
                        } transition-all duration-300`}
                      >
                        {step.title}
                      </h2>
                      {step.status === "active" && (
                        <p className="text-gray-500 text-xs mt-0.5">
                          Currently filling this section
                        </p>
                      )}
                      {step.status === "completed" && (
                        <p className="text-green-600 text-xs mt-0.5">
                          ✓ Completed
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E91E63]"></div>
                <span className="text-sm">
                  Step {currentStepIndex + 1} of {progressSteps.length}
                </span>
              </div>
              <span className="text-sm font-medium text-[#E91E63]">
                {Math.round(progressValue)}%
              </span>
            </div>
            <Progress
              value={progressValue}
              className="h-1.5 bg-gray-200 [&>div]:bg-[#E91E63]"
            />
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden bg-linear-to-b from-[#FCE4EC] to-white p-4 rounded-t-2xl shadow-lg">
        <div className="flex flex-col">
          <div className="mb-6 flex justify-center">
            <img
              src="./assets/logo/meichu.png"
              alt="meichu"
              className="w-auto h-8"
            />
          </div>

          <div className="relative">
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-gray-300 z-0" />

            <div className="relative z-10 flex justify-between px-2">
              {progressSteps.map((step) => (
                <div key={step.id} className="flex flex-col items-center w-16">
                  <div
                    className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                      step.status === "active" || step.status === "completed"
                        ? "bg-[#FCE4EC]"
                        : "bg-gray-100"
                    } transition-all duration-300`}
                  >
                    {step.status === "completed" ? (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#E91E63]">
                        <FaCheck className="text-white w-3 h-3" />
                      </div>
                    ) : (
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${getStepColor(
                          step.status
                        )}`}
                      >
                        <span className="text-white text-xs font-bold">
                          {step.id}
                        </span>
                      </div>
                    )}

                    {step.status === "active" && (
                      <div className="absolute inset-0 rounded-full border-2 border-[#E91E63] animate-ping opacity-40" />
                    )}
                  </div>

                  <span
                    className={`mt-2 text-[11px] text-center leading-tight ${
                      step.status === "active"
                        ? "text-[#E91E63] font-medium"
                        : step.status === "completed"
                          ? "text-green-600 font-medium"
                          : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <span className="text-sm font-medium text-[#E91E63]">
                Step {currentStepIndex + 1} of {progressSteps.length}
              </span>

              <div className="mt-1">
                <Progress
                  value={progressValue}
                  className="h-1.5 bg-gray-200 [&>div]:bg-[#E91E63]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
