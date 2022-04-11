import Link from 'next/link'

// vercel을 사용하면 깃이랑 사용해서 간단히 배포할 수 있다.

export default function Home( {posts} ) {

  return (
    <div>
      <h1>blog</h1>
      <ul>
        {posts.map(post => (
            <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

// 서버사이드렌더링
// local api 서버에서 데이터를 수정해서 다시 시작했을때 새로고침하면 데이터가 바로바뀐다.
// 빈번한 데이터가 변화가 일어나느 페이지를 만들때는 서버사이드 패치
// export const getServerSideProps = async() => {
//   // jsonplaceholder 사용주소
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts?_start=00&_end=10')
//   // 로컬 서버 연결시 주소
//   // const res = await fetch('http://localhost:8080/api/posts')

//   return {
//     props: {
//       posts
//       // 그냥 posts 랑 posts: posts가 같다.
//       // posts: posts
//     }
//   }
// }

// 스태틱사이트제네레이션
// 서버사이드랑 다르게 새로고침해도 갱신이안된다.
// .next 폴더 서버에 보면 빌드 할 대 생성된 index.html 이 있다.
export const getStaticProps = async() => {
  // jsonplaceholder 사용주소
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_start=00&_end=10')
  // 로컬 서버 연결시 주소
  // const res = await fetch('http://localhost:8080/api/posts')
  const posts = await res.json();

  return {
    props: {
      posts
      // 그냥 posts 랑 posts: posts가 같다.
      // posts: posts
    },
    // revalidate 를 하면 20초마다 새로 갱신된다.
    // 즉각적인 변화가 일어나지 않아도 되면 스태틱을 사용하면 빠른 렌더링이 가능하다.
    // 스태틱프롭스는 갱신할때마다 빌드를 해줘야한다.
    revalidate: 20
  }
}