import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const InternalServerError = (err: any) => {
  return NextResponse.json(
    {
      message: "Something went wrong",
      error: err,
    },
    { status: 500, statusText: "Internal Server Error" }
  );
};

export const SchemaError = (err: ZodError) => {
  return NextResponse.json(
    {
      message: err.message,
      error: err.errors.toString(),
    },
    { status: 400, statusText: "Bad request" }
  );
};
