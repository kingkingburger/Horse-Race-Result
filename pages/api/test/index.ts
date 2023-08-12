import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/lib/db/dbConnect";
import Test from "@/app/lib/test/test.model";
import { getNextSequenceValue } from "@/app/lib/counter/counter.module";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req = ", req.query);
  if (req.method === "GET" && req.query.testId) {
    try {
      dbConnect();
      const tests = Test;

      const specificTestId = req.query.testId;
      const specificTest = await tests.findOne({ testId: specificTestId });

      if (!specificTest) {
        res.status(404).json({ message: "Test not found" });
        return;
      }

      res.status(200).json(specificTest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "GET") {
    try {
      dbConnect();
      const tests = Test;

      const allTests = await tests.find();

      res.status(200).json(allTests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      dbConnect();
      const tests = Test;
      const { title, content } = req.body;
      const testId = await getNextSequenceValue("testId");
      const test = new tests({ testId, title, content });
      await test.save();
      res.status(200).json({ message: "Test created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
