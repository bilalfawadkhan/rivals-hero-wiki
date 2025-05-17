import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


interface ProtraitProps {
  src: string
  alt?: string
  className?: string
  heroName?: string
  herotype?: string
}

const Portrait :React.FC<ProtraitProps> = ({src,alt ="Protrait Image",className ="",heroName = "Hero Name" , herotype='Hero Type'}) => {
  return (
 <Link href={'/'} target='_blank' className='inline-block'>
     <div className='w-[200px] rounded-2xl shadow-2xl/50 flex flex-col items-center mt-12 bg-gray-700 border-gold-border border-4 overflow-hidden'>
        <Image
          src={src}
          alt={alt}
          className={` ${className}`}
          width={200}
          height={300}
  
    />
    <h5 className='bg-gray-500 w-full text-center text-white'>{heroName}</h5>
    <p className='bg-amber-600 w-full text-center'>{herotype}</p>
      </div>
 </Link>
  )
}

export default Portrait
