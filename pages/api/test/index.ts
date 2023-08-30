import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/app/lib/db/dbConnect";
import Test from "@/app/lib/test/test.model";
import { getNextSequenceValue } from "@/app/lib/counter/counter.module";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req = ", req.query, req.query?.testId);
  if (req.method === "GET" && req.query?.testId) {
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
      console.log('GET 메서드 동작')
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
      const { title, content, now } = req.body;
      const testId = await getNextSequenceValue("testId");
      const createdAt = new Date();
      const test = new tests({ testId, title, content, createdAt });
      const result = await test.save();
      res.status(200).json({ message: "Test created successfully", data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
