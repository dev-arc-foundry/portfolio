import Image from "next/image";

type BrandMarkProps = {
  /** Intrinsic size requested from the optimizer; CSS still controls the rendered box. */
  size?: number;
  className?: string;
  eager?: boolean;
};

/** The foundry mark: a DF monogram struck over an anvil. */
export function BrandMark({ size = 96, className = "", eager = false }: BrandMarkProps) {
  return (
    <Image
      src="/logo.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      loading={eager ? "eager" : "lazy"}
      className={className}
    />
  );
}
