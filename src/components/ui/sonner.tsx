"use client";

import { useTheme } from "next-themes@0.4.6";
import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "bg-[#05052f] rounded-[var(--radius)] shadow-[var(--elevation-sm)] flex flex-col gap-[12px] p-[16px] pt-[12px] w-[280px]",
          title: "font-['Inter'] font-bold text-[12px] uppercase text-[#e6e6ea] leading-[20px]",
          description: "font-['Inter'] font-medium text-[12px] text-[#e6e6ea] leading-[20px]",
          icon: "shrink-0",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
