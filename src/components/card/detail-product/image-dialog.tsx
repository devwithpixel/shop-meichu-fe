import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  IoMdArrowBack,
  IoMdArrowDown,
  IoMdArrowForward,
  IoMdArrowUp,
} from "react-icons/io";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

interface ImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  imageIndex: number;
  totalImages: number;
  slideDirection: "left" | "right" | null;
  zoom: number;
  position: { x: number; y: number };
  menuOpen: boolean;
  onPrevImage: () => void;
  onNextImage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onMove: (direction: "up" | "down" | "left" | "right") => void;
  onMenuToggle: () => void;
}

export default function ImageDialog({
  open,
  onOpenChange,
  imageSrc,
  slideDirection,
  zoom,
  position,
  menuOpen,
  onPrevImage,
  onNextImage,
  onZoomIn,
  onZoomOut,
  onMove,
  onMenuToggle,
}: ImageDialogProps) {
  const isZoomed = zoom > 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 h-screen rounded-none max-w-screen! w-screen! border-0 overflow-hidden">
        <div className="relative w-full h-full bg-white overflow-hidden">
          <button
            onClick={onPrevImage}
            disabled={slideDirection !== null}
            className={`absolute left-7 top-1/2 -translate-y-1/2 p-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all z-20 disabled:opacity-50 ${
              menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <IoIosArrowBack size={18} />
          </button>

          <button
            onClick={onNextImage}
            disabled={slideDirection !== null}
            className={`absolute right-7 top-1/2 -translate-y-1/2 p-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all z-20 disabled:opacity-50 ${
              menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <IoIosArrowForward size={18} />
          </button>

          <div
            className={`absolute left-7 bottom-7 text-white transition-all duration-300 z-20 overflow-hidden ${
              menuOpen
                ? "bg-gray-300 rounded-full p-2 flex flex-col gap-2"
                : "rounded-full bg-black"
            }`}
          >
            <div
              className={`transition-all duration-300 flex flex-col gap-2 ${
                menuOpen
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0 pointer-events-none"
              }`}
            >
              <button
                onClick={() => onMove("right")}
                disabled={!isZoomed}
                className={`p-4 rounded-full transition-colors ${
                  isZoomed
                    ? "bg-black hover:bg-gray-800"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                <IoMdArrowForward size={18} />
              </button>
              <button
                onClick={() => onMove("left")}
                disabled={!isZoomed}
                className={`p-4 rounded-full transition-colors ${
                  isZoomed
                    ? "bg-black hover:bg-gray-800"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                <IoMdArrowBack size={18} />
              </button>
              <button
                onClick={() => onMove("down")}
                disabled={!isZoomed}
                className={`p-4 rounded-full transition-colors ${
                  isZoomed
                    ? "bg-black hover:bg-gray-800"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                <IoMdArrowDown size={18} />
              </button>
              <button
                onClick={() => onMove("up")}
                disabled={!isZoomed}
                className={`p-4 rounded-full transition-colors ${
                  isZoomed
                    ? "bg-black hover:bg-gray-800"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                <IoMdArrowUp size={18} />
              </button>
              <button
                onClick={onZoomOut}
                disabled={zoom <= 1}
                className={`p-4 rounded-full transition-colors ${
                  zoom > 1
                    ? "bg-black hover:bg-gray-800"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                <FaSearchMinus size={18} />
              </button>
              <button
                onClick={onZoomIn}
                disabled={zoom >= 3}
                className={`p-4 rounded-full transition-colors ${
                  zoom < 3
                    ? "bg-black hover:bg-gray-800"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                <FaSearchPlus size={18} />
              </button>
            </div>

            <button
              onClick={onMenuToggle}
              className="p-4 rounded-full bg-black hover:bg-gray-800 transition-colors"
            >
              {menuOpen ? <IoClose size={18} /> : <RxHamburgerMenu size={18} />}
            </button>
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out"
            style={{
              transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
            }}
          >
            <div className="w-full h-3/5 md:w-screen md:h-screen lg:w-[38%] lg:h-full relative">
              <img
                src={imageSrc}
                className={`absolute inset-0 w-full h-full object-cover bg-gray-300 transition-transform duration-500 ease-in-out ${
                  slideDirection === "left"
                    ? "-translate-x-[calc(100%+50vw)]"
                    : slideDirection === "right"
                      ? "translate-x-[calc(100%+50vw)]"
                      : "translate-x-0"
                }`}
                alt="Full size preview"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
