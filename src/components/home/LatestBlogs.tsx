"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiUser } from "react-icons/fi";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
  author: string;
  category: string;
  createdAt: string;
}

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("/api/blogs?limit=3")
      .then((r) => r.json())
      .then((d) => setBlogs(d.blogs || []))
      .catch(() => {});
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <span className="inline-block text-[#ff165d] text-sm font-semibold tracking-widest uppercase mb-3">Our Blog</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Latest Articles
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#ff165d] to-[#ff9a00] rounded-full mt-4" />
          </div>
          <Link href="/blog" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[#ff165d] font-semibold hover:gap-3 transition-all group">
            View All Posts
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              href={`/blog/${blog.slug}`}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#ff165d]/20 to-[#ff9a00]/20 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <FiCalendar size={12} />
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUser size={12} />
                    {blog.author}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#ff165d] transition-colors line-clamp-2 leading-snug">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                {blog.excerpt && (
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {blog.excerpt}
                  </p>
                )}

                <span className="text-[#ff165d] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <FiArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
