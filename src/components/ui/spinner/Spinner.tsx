type Props = {
  width: number;
  height: number;
};

const Spinner: React.FC<Props> = ({ width, height }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-${height} w-${width} border-b-2 border-orbita-purple`}
      ></div>
    </div>
  );
};

export default Spinner;
