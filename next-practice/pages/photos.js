import HeadInfo from "../components/HeadInfo"
import Image from 'next/image'
import photosStyles from "../styles/Photos.module.css"
import Link from 'next/link'

const photos = ( {photos} ) => {
    return (
        <div>
            <HeadInfo title="My blog Photos" />
            <h1>photos</h1>
            <ul className={photosStyles.photos}>
                {photos.map((photo) => (
                    <li key={photo.id}>
                        <Link href={`photos/${photo.id}`}>
                            <a>
                                <Image
                                    src={photo.thumbnailUrl}
                                    width={100}
                                    height={100}
                                    alt={photo.title}
                                />
                            </a>
                        </Link>
                        <span>{photo.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const getStaticProps = async() => {
    // 맨처음에 외부이미지를 바로 Image 태그로 띄울라고하면 에러가뜬다.
    // next.config 를 수정해야한다.
    const res = await fetch('https://jsonplaceholder.typicode.com/photos?_start=00&_end=10')
    const photos = await res.json();
  
    return {
      props: {
        photos

      },

      revalidate: 5
    }
}

export default photos
