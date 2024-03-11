import Image from "next/image";

type Props = {
  width?: number;
  height?: number;
  className?: string;
};

const OrbitaLogo: React.FC<Props> = ({ width, height, className }) => {
  const w = width || 600;
  const h = height || 200;
  const style = className;
  const href =
    "https://assets-global.website-files.com/64e518adba02483c9784ca4d/65ddd2b8f361400928348b18_Official%20Orbita%20Logo%20(Purple).webp";
  return <Image src={href} alt="Orbita" width={w} height={h} className={style} />;
};

export default OrbitaLogo;
