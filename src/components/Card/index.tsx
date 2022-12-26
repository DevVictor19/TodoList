import React from "react";

interface Props {
  children: React.ReactNode;
  styleClasses?: string;
}

export function Card({ children, styleClasses }: Props) {
  return (
    <section
      className={`bg-white dark:bg-[#25273D] shadow-[0px_35px_50px_-15px_#c2c3d67f] 
      dark:shadow-[0px_35px_50px_-15px_#0000007f] rounded-[5px] p-5 font-base 
      text-[#494C6B] dark:text-[#C8CBE7] ${
        styleClasses && styleClasses.split(" ")
      }`}
    >
      {children}
    </section>
  );
}
