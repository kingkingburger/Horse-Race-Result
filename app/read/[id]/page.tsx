import {PropsWithChildren, PropsWithRef} from "react";

interface mongoDBresponse {
    _id: number;
    testId: number;
    title: string;
    content: string;
}

export default async function Read(props: PropsWithRef<any>) {
    console.log("props = ", props);

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_MONGO_API_URL}/api/test?testId=${props.params.id}`,
        {cache: "no-store"}
    );

    const topic = (await response.json()) as mongoDBresponse;
    console.log("topic = ", topic);

    return (
        <div className="h-screen flex justify-center mt-3">
            <div className="w-full sm:w-1/2">
                <div className="text-3xl font-bold">{topic.title}</div>
                <div>{topic.content}</div>
            </div>
        </div>
    );
}
