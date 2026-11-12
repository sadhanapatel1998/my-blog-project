
import connectDB from "../../../lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    return Response.json({
      success: true,
      message: "MongoDB Connected Successfully!",
    });
  } catch (error) {
    console.error("Database Error:", error);

    return Response.json(
      {
        success: false,
        message: "MongoDB Connection Failed",
      },
      { status: 500 }
    );
  }
}
