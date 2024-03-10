import Image from "next/image";

const OrbitaLogo = () => {
  const href =
    "https://assets-global.website-files.com/64e518adba02483c9784ca4d/65ddd2b8f361400928348b18_Official%20Orbita%20Logo%20(Purple).webp";
  return (
    <Image src={href} alt="Orbita" width={600} height={200} className="mt-5" />
  );
};

export default OrbitaLogo;
