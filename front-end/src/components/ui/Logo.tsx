import Image from "next/image";

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({ className, width, height }: Props) {
  return (
    <>
      <a href="/">
        <Image
          src="/bhook.png"
          alt="Logo"
          width={width}
          height={height}
          className={className}
        />
      </a>
    </>
  );
}
