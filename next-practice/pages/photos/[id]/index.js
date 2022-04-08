import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const index = ( {photo} ) => {

    // 라우터로 쿼리 정보를 넘겨받을 수 있다.
    // 이번엔 라우터를 사용하지 않고 getstaticpaths 를 이용해 넘겨받는다.
    // const router = useRouter();
    // console.log(router)
    // console.log(router.query.id)

    const {title, url} = photo

    return (
        <div>
            <h2>{title}</h2>
            <Link href="/photos">
                <a>
                    <Image 
                        src={url}
                        width={500}
                        height={500}
                    />
                </a>
            </Link>
        </div>
    )
}

export const getStaticProps = async(context) => {

    const {id} = context.params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    const photo = await res.json();
  
    return {
        props: {
            photo
        }
    }
}

export const getStaticPaths = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/photos?_start=00&_end=10')
    const photos = await res.json();
    const ids = photos.map((photo) => photo.id);
    const paths = ids.map((id) => {
        return {
            params: {id: id.toString()}
        }
    })

    return {
        paths,
        fallback: false,
    }
}

export default index
