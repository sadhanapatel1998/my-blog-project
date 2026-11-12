
import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Blog from "../../../models/Blog";

// GET: Fetch all blogs
export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });

  } catch (error) {
    console.error("GET Blogs Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
      },
      { status: 500 }
    );
  }
}

// POST: Create new blog
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      title,
      slug,
      description,
      content,
      coverImage,
      category,
      author,
      isPublished,
    } = body;

    if (!title || !slug || !description || !content || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields",
        },
        { status: 400 }
      );
    }

    const existingBlog = await Blog.findOne({ slug });

    if (existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "This slug already exists",
        },
        { status: 409 }
      );
    }

    const newBlog = await Blog.create({
      title,
      slug,
      description,
      content,
      coverImage,
      category,
      author,
      isPublished,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully!",
        data: newBlog,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("POST Blog Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create blog",
      },
      { status: 500 }
    );
  }
}
