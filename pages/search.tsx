import React from 'react'
import {GetServerSideProps} from 'next'
import PostCard from "../components/post-card";
import ReactPaginate from 'react-paginate';
import {useRouter} from "next/router";

interface Data {
    website?: [title: string]
    podcasts?: Episodes[]
    name: string
    pages: number
}

interface Episodes {
    id: number,
    title: string,
    description: string,
    image_url: string,
    publication_date: string,
    blog_content?: string,
    duration?: string,
    tags?: Array<{name: string}>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_STATION_ID}/tags_blog?channel=null&tags=${context.query.tags}`)
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

const Tags: React.FC<{ data: Data }> = ({data}) => {
    return (
        <>
            {Object.keys(data).length > 0 ?
                <div className="grid grid-cols-1 gap-5 justify-items-center justify-center">
                    {Object.keys(data).map((value, index) =>
                        <div key={index} className='w-full'>
                            <PostCard data={{
                                id: data[index]['id'],
                                title: data[index]['title'],
                                description: data[index]['description'],
                                blog_content: data[index]['blogContent'],
                                img_url: data[index]['image_url'] || '/header_card.png',
                                publication_date: data[index]['publication_date'],
                                duration: data[index]['duration'],
                                tags: data[index]['tags']
                            }}/>
                        </div>
                    )}
                </div> :
                <h1 className='text-main-dark dark:text-white text-5xl text-center justify-self-center select-none'>No
                    episodes to display</h1>}
        </>
    )
}

export default Tags