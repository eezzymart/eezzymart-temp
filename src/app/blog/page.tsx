"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: string;
  createdAt: string;
  tags: string[];
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/blogs?page=${page}&limit=9`)
      .then((r) => r.json())
      .then((d) => {
        setBlogs(d.blogs || []);
        setTotalPages(d.pages || 1);
      })
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Blog</h1>
      <p className="text-gray-dark mb-8">Tips, news, and insights from EezzyMart</p>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <div key={i} className="bg-gray-light rounded-xl animate-pulse h-72" />)}
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-dark py-20">No blog posts yet. Stay tuned!</p>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link key={blog._id} href={`/blog/${blog.slug}`} className="group bg-white dark:bg-[#1a1d2e] border border-gray dark:border-[#2d3148] rounded-xl overflow-hidden hover:shadow-md transition">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-light">
                  {blog.image ? (
                    <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-dark mb-2">
                    <span>{blog.author}</span>
                    <span>•</span>
                    <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                  </div>
                  <h2 className="font-semibold text-lg mb-2 group-hover:text-primary transition line-clamp-2">{blog.title}</h2>
                  <p className="text-sm text-gray-dark line-clamp-3">{blog.excerpt}</p>
                  {blog.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {blog.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] bg-gray-light px-2 py-0.5 rounded-full text-gray-dark">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-lg font-semibold text-sm ${p === page ? "bg-primary text-white" : "bg-gray-light hover:bg-gray"}`}>{p}</button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
