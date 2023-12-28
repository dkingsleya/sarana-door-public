import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ImageFallbackProps } from '@/types'

export const FallbackImage = ({ keyVal, detail, src, alt, styles }: ImageFallbackProps) => {
    const [imgSrc, setImgSrc] = useState(src)
    const [imgStyle, setImgStyle] = useState({})

    useEffect(() => {
        setImgSrc(src)
    }, [src])

    return (
        detail ? (
            <Image
                key={`detail-${keyVal}`}
                style={styles}
                width={350}
                height={350}
                alt={alt}
                src={imgSrc ? imgSrc : `/asset/no_image.png`}
                onError={() => {
                    setImgSrc(`/asset/no_image.png`)
                }}
            />
        ) : (
            <Image
                key={`main-${keyVal}`}
                style={imgStyle && Object.assign(styles, imgStyle)}
                width={350}
                height={350}
                alt={alt}
                src={imgSrc ? imgSrc : `/asset/no_image.png`}
                priority
                onError={() => {
                    setImgSrc(`/asset/no_image.png`)
                    setImgStyle({ 'objectFit': 'contain' });
                }}
            />
        )
    )
}
