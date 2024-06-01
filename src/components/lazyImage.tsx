interface Props {
  src: string | undefined;
  alt?: string;
  className?: string;
}

const LazyImage: React.FC<Props> = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      className={`${className}`}
      alt={alt}
      onError={(e) => {
        e.currentTarget.src = '/logo.png';
      }}
    />
  );
};

export default LazyImage;
