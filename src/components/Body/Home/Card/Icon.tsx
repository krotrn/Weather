function Icon({src,alt,className}: {src?: string, alt?: string, className?: string}) {
  return (
    <img src={src} alt={alt} className={className} />
  )
}

export default Icon