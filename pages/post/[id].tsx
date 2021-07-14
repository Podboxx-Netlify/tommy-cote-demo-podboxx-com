import {GetServerSideProps} from 'next'
import React, {useEffect} from "react";
import {useRouter} from "next/router";

interface Data {
    title: string
    blog_content?: string
    description?: string
    image_url?: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context.query.preview) {
        const data = {title: context.query.title, blog_content: context.query.blog_content}
        return {
            props: {
                data,
            },
        }
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.station_id}/podcast/${context.query.id}`)
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/podcast/${context.query.id}`)
    if (res.status !== 200) {
        const data = {}
        return {
            props: {
                data,
            },
        }
    } else {
        const data: Data = await res.json()
        return {
            props: {
                data,
            },
        }
    }
}

const Post: React.FC<{ data: Data }> = ({data}) => {
    const router = useRouter()
    const playerId = router.query.id == 'preview' ? '38010' : router.query.id

    return (
        <>
            <div
                className="w-full md:rounded-md shadow-lg flex flex-col select-none gap-4 mt-12 bg-12dp">
                <button
                    className="text-left p-5 w-28 font-bold text-lg hover:text-red-500 focus:outline-none"
                    onClick={() => {
                        router.query.id !== 'preview' &&
                        router.back()
                    }}>Go Back
                </button>
                <article className="prose prose-sm lg:prose-lg mx-auto max-w-screen-lg px-5">
                    <h1 className='text-center capitalize'>{data.title || 'Error loading the episode'}</h1>
                    {data.blog_content !== null &&
                    <div className="max-w-none"
                        dangerouslySetInnerHTML={{__html: data.blog_content}}/>
                    }
                </article>
                <br/>
                {data.title && router.query.id &&
                    <div className="min-h-96 h-72">
                <iframe className='h-80 w-full'
                        // src={"http://localhost:8000/" + playerId + "?blog=true"}
                        src={"http://localhost:8000/39285?blog=true"}
                        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
                    </div>
                        }
            </div>
        </>
    )
}


export default Post
