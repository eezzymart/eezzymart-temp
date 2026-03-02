"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiUser } from "react-icons/fi";

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  tags: string[];
  createdAt: string;
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blogs/${slug}`)
      .then((r) => r.json())
      .then((d) => setBlog(d.error ? null : d))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-light rounded w-3/4" />
          <div className="h-64 bg-gray-light rounded-xl" />
          <div className="h-4 bg-gray-light rounded" />
          <div className="h-4 bg-gray-light rounded w-5/6" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <Link href="/blog" className="text-primary font-semibold hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-dark hover:text-primary mb-6 transition">
        <FiArrowLeft /> Back to Blog
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-dark mb-6">
        <span className="flex items-center gap-1"><FiUser size={14} /> {blog.author}</span>
        <span className="flex items-center gap-1"><FiCalendar size={14} /> {new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
      </div>

      {blog.image && (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
          <Image src={blog.image} alt={blog.title} fill className="object-cover" priority />
        </div>
      )}

      <div className="prose prose-lg max-w-none text-gray-dark leading-relaxed whitespace-pre-line">
        {blog.content}
      </div>

      {blog.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray">
          {blog.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-gray-light px-3 py-1.5 rounded-full text-gray-dark">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}
