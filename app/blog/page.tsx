import { allBlogs } from 'contentlayer/generated'
import Link from 'next/link'
import Image from 'next/image'

function getReadingTime(text: string) {
  const words = text.split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export default function BlogPage() {
  const blogs = allBlogs.sort((a, b) => +new Date(b.date) - +new Date(a.date))
  const featured = blogs.slice(0, 2)
  const rest = blogs.slice(2)
  return (
    <div className="max-w-5xl mx-auto py-20 px-4 md:px-0">
      <div className="mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-left">Blog</h1>
        <p className="text-base text-zinc-400 max-w-2xl text-left mb-10">Compiled notes from the team</p>
      </div>
      {/* Featured Section */}
      <h2 className="text-xl font-semibold mb-6 text-left">Featured</h2>
      <div className="mb-14 grid md:grid-cols-2 gap-8">
        {featured.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="rounded-xl border border-zinc-700 bg-zinc-900/80 dark:bg-zinc-900/80 shadow-sm transition hover:border-primary flex flex-col h-full min-h-[180px]">
              <div className="flex flex-col flex-1 p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors leading-tight">{post.title}</h2>
                <p className="text-zinc-400 dark:text-zinc-300 mb-4 text-base line-clamp-3">{post.description}</p>
                <div className="flex items-center gap-3 mt-auto pt-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white text-sm font-bold">{post.author ? post.author[0] : 'A'}</div>
                  <span className="text-sm text-zinc-400">By {post.author || 'Autor'} • {getReadingTime(post.body.raw)} min read</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
      {/* All Posts */}
      <h3 className="text-lg font-semibold mb-6 text-left">All posts</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {rest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="rounded-xl border border-zinc-700 bg-zinc-900/80 dark:bg-zinc-900/80 shadow-sm transition hover:border-primary flex flex-col h-full min-h-[140px]">
              <div className="flex flex-col flex-1 p-6">
                <h2 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors leading-tight">{post.title}</h2>
                <p className="text-zinc-400 dark:text-zinc-300 mb-3 text-sm line-clamp-2">{post.description}</p>
                <div className="flex items-center gap-3 mt-auto pt-2">
                  <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs font-bold">{post.author ? post.author[0] : 'A'}</div>
                  <span className="text-xs text-zinc-400">By {post.author || 'Autor'} • {getReadingTime(post.body.raw)} min read</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
} 