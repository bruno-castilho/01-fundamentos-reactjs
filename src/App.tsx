import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Post, PostType } from './components/Post'

import styles from './App.module.css'
import './global.css'




const posts:PostType[] = [
  {
    id:1,
    author:{
      avatarUrl: "https://github.com/bruno-castilho.png",
      name: 'Bruno Castilho',
      role: "Web Developer"
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: 'jane.design/doctorcare', link: '#'},
    ],
    publishedAt: new Date('2023-12-03 20:00:00'),
  },
  {
    id:2,
    author:{
      avatarUrl: "https://github.com/diego3g.png",
      name: 'Diego Fernandes',
      role: "CTO @ Rocketseat"
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: 'jane.design/doctorcare', link: '#'},
    ],
    publishedAt: new Date('2023-12-8 20:00:00'),
  }
]

export function App() {

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
        {posts.map(post => {
          return (
            <Post
              post={post}
            />
          )
        })}
        </main>
      </div>
    </div>
  )
}


