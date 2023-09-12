import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';

import path from "path";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const filePath = 'C:\\Users\\wmh\\Desktop\\Horse-Race-Result\\crawling\\todayResult.json'; // 절대 경로 사용
        const fileData = await fs.readFile(filePath, 'utf-8');

        res.status(200).json({ data: fileData });

    } catch (error) {
        console.error('파일 읽기 오류:', error);
        res.status(500).json({ error: '파일을 읽어오는 중 오류가 발생했습니다.' });
    }
}

