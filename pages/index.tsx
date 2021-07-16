import React, {useEffect, useState} from 'react'
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
    tags?: Array<{ name: string }>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let uri
    let baseUri = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_STATION_ID}`
    // context.query.tags !== undefined ?  :
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_STATION_ID}/blog?channel=${context.query.channel_id || null}&page=${context.query.page || 1}`)
    console.log(context.query.tags !== undefined, context.query.tags,)
    console.log('hey', uri)
    if (context.query.tags !== undefined) {
        uri = `${baseUri}/tags_blog?tags=${context.query.tags}`
    } else {
        uri = `${baseUri}/blog?channel=${context.query.channel_id || null}&page=${context.query.page || 1}`
    }


    const res = await fetch(uri)
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

const Blog: React.FC<{ data: Data }> = ({data}) => {
    const router = useRouter()
    const [tagFilter, setTagFilter] = useState<string[]>([])

    const handleTagFilter = (tag: string) => {
        // let tags = tagFilter
        let present = tagFilter.indexOf(tag) !== -1
        // console.log('present? '+ present)
        // console.log(tagFilter.filter(t => t !== tag))
        // present ? tags.filter(t => t !== tag) : tags.push(tag)
        // setTagFilter(tags)
        // tagFilter.indexOf(tag) !== -1 && tagFilter.filter((t) => t !== tag)
        // console.log('indexof tag ' + tagFilter.indexOf(tag))
        tagFilter.indexOf(tag) === -1 ? tagFilter.push(tag) : setTagFilter(f => f.filter((i) => i !== tag))
        // console.log('updated tags =>' + tags)
        // handleFilter()
    }
    // console.log(tagFilter)
    const handleFilter = (updatedTags?: string[]) => {
        console.log('handleFilter '+ tagFilter)
        // console.log('handle Filter ====')
        // let tags = encodeURIComponent(updatedTags.join(","))
        // console.log('new tags length', updatedTags.length === 0)
        // updatedTags.length === 0 ? router.replace('/') : router.push(`/?tags=${tags}`)
    }

    useEffect(()=>{
        if (tagFilter.length > 0) {
            let tags = encodeURIComponent(tagFilter.join(","))
            router.push(`/?tags=${tags}`)
        } else {
            router.push('/')
        }
    },[tagFilter])

    const handleAddTag = (tag: string) => {
        // tagFilter.push(tag)
        console.log('added')
        return setTagFilter([...tagFilter, tag])
    }
    const handleRemoveTag = (tag: string) => {
        console.log('removed')
        return setTagFilter(tagFilter.filter(i => i !== tag))
    }

    useEffect(() => {
        tagFilter.length === 0 && router.replace('/')
    }, [])

    const currentPage = parseInt(router.query.page as string)
    const handlePageClick = (data) => {
        router.push(`/?page=${data.selected + 1}`).then()
    }
    // console.log(tagFilter.length)
    return (
        <>
            {data.podcasts && Object.keys(data.podcasts).length > 0 ?
                <div className="grid grid-cols-1 gap-5 justify-items-center justify-center">
                    {Object.keys(data.podcasts).map((value, index) =>
                        <div key={index} className='w-full'>
                            <PostCard data={{
                                id: data.podcasts[index]['id'],
                                title: data.podcasts[index]['title'],
                                description: data.podcasts[index]['description'],
                                blog_content: data.podcasts[index]['blogContent'],
                                img_url: data.podcasts[index]['image_url'] || '/header_card.png',
                                publication_date: data.podcasts[index]['publication_date'],
                                duration: data.podcasts[index]['duration'],
                                tags: data.podcasts[index]['tags'],
                                currentFilter: tagFilter,
                                addFilter: handleAddTag,
                                removeFilter: handleRemoveTag,
                                handleTagFilter: handleTagFilter
                            }}/>
                        </div>
                    )}
                </div> :
                <h1 className='text-main-dark dark:text-white text-5xl text-center justify-self-center select-none'>No
                    episodes to display</h1>}
            {data.pages > 0 &&
            <div className="py-2">
                <ReactPaginate
                    pageCount={data.pages + 1}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={'flex mx-auto mt-10 justify-center'}
                    activePageClassName={'text-red-900'}
                    nextLabel='navigate_next'
                    previousLabel='navigate_before'
                    activeLinkClassName={'text-bold text-2xl text-red-500'}
                    previousClassName={'dark:text-white material-icons-outlined pt-0.5 hover:text-red-500'}
                    nextClassName={'dark:text-white cursor-pointer select-none material-icons-outlined pt-0.5 hover:text-red-500'}
                    pageClassName={'dark:text-white cursor-pointer select-none text-lg sm:px-3 mx-2 hover:text-red-500'}
                    breakLinkClassName={'dark:text-white text-lg sm:px-3 mx-2 hover:text-red-500'}
                    disabledClassName={'material-icons-outlined'}
                    forcePage={currentPage - 1 || 0}
                />
            </div>}
        </>
    )
}

export default Blog