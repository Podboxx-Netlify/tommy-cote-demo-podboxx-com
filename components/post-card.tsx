import React from "react";
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarAlt, faClock} from '@fortawesome/free-regular-svg-icons'

interface Post {
    id: number
    title?: string
    description?: string
    blog_content?: string
    publication_date?: string
    img_url?: string
    duration?: string
}

const PostCard: React.FC<{ data: Post }> = ({data}) => {
    dayjs.extend(utc)
    return (
        <>
            <div
                className="flex flex-col sm:flex-row p-2 w-auto lg:w-full sm:p-4 h-auto sm:h-56 gap-5 select-none rounded-md bg-12dp">
                <Image className='rounded-md' alt={data.title + ' image'} src={data.img_url}
                       quality='80' width='300' height='192' unoptimized={true}/>
                <div className="flex sm:flex-1 flex-col gap-2 p-1">
                    <div className='grid grid-cols-2 md:grid-cols-6'>
                        <p className="text-sm">
                            <FontAwesomeIcon
                                icon={faCalendarAlt}/> {dayjs(data.publication_date).utc().format('MMMM D YYYY')}
                        </p>
                        {data.duration &&
                        <p className="text-sm">
                            <FontAwesomeIcon icon={faClock}/> {data.duration}
                        </p>
                        }
                    </div>
                    <h1 className="text-xl line-clamp-3 overflow-hidden overflow-ellipsis">
                        {data.title}
                    </h1>
                    <p className="line-clamp-3 overflow-hidden overflow-ellipsis">
                        {data.description.length > 500 ? data.description.substring(0, 500) + '...' : data.description}
                    </p>
                    <div className="flex gap-5 mt-auto">
                        <button className="btn btn-outline btn-primary ml-auto flex btn-sm">
                            <Link href={{pathname: '/post/[id]', query: {id: data.id}}}><a>View episode</a></Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PostCard

